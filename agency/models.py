import re
import logging
import requests

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Sum
from django.utils import timezone
from django.urls import reverse


logger = logging.getLogger(__name__)


# Must be to connect to img models these functions!
def image_upload_path(instance, filename):

    # if isinstance(instance, TripPhoto):
    #     raise ValueError("this func works only with instance TripPhoto")

    if instance.type not in dict(instance.PHOTO_TYPE_CHOICES).keys():
        raise ValueError(f"Недопустимый тип фото: {instance.type}")

    timestamp = timezone.now().strftime('%Y-%m-%d_%H-%M-%S')
    return f"trip_{instance.trip.id}/{instance.type}/{timestamp}_{filename}"


class Trip(models.Model):
    COUNTRY_CHOICES = [
        ('cz', 'Чехия'),
        ('it', 'Италия'),
        ('is', 'Исландия'),
        ('eg', 'Египет'),
        ('pt', 'Португалия'),
        ('es', 'Испания'),
        ('jo', 'Иордания'),
        ('fr', 'Франция'),
        ('nl', 'Нидерланды'),
        ('no', 'Норвегия'),
    ]

    title = models.CharField("Название тура", max_length=255)
    country = models.CharField("Страна", max_length=2, choices=COUNTRY_CHOICES)
    welcome_message = models.CharField("Приветственное сообщение", max_length=255)
    duration_days = models.PositiveIntegerField("Длительность (дней)")
    accommodation = models.CharField("Проживание", max_length=255, default="По 2 в комнате")
    group_size = models.PositiveIntegerField("Макс. размер группы")
    leaders = models.CharField("Команда", max_length=255, default="Сопровождение тур-лидером Fiery Trips")
    bonus = models.CharField("Подарки", max_length=255, blank=True)
    ask_title = models.CharField("Вопрос", max_length=60)
    description = models.TextField("Описания тура")
    created_at = models.DateTimeField(auto_now_add=True)
    slug = models.SlugField(unique=True, blank=True)
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.TextField(blank=True)

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('trip_detail', kwargs={'pk': self.pk})

    @property
    def current_members(self):
        return self.trip_dates.aggregate(total=Sum('current_numbers'))['total'] or 0

    class Meta:
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['country']),
            models.Index(fields=['created_at'])
        ]


class TripPhoto(models.Model):
    PHOTO_TYPE_CHOICES = [
        ('main', 'Главное фото(1)'),
        ('gallery', 'Фото галереи(5)'),
        ('slide', 'Фото с тура(n)'),
    ]

    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='photos')
    photo = models.ImageField(upload_to=image_upload_path)
    type = models.CharField(max_length=7, choices=PHOTO_TYPE_CHOICES)
    caption = models.CharField("Подпись", max_length=100, blank=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['trip', 'type'],
                condition=models.Q(type='main'),
                name='unique_main_photo'
            )
        ]


class ProgramByDay(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='days')
    day_number = models.PositiveIntegerField("День", default=1)
    title = models.CharField("Место", max_length=60)
    description = models.TextField("Описание дня")
    accommodation = models.TextField("Проживание", blank=True)
    meal_plan = models.CharField("Питание", max_length=100, blank=True)

    class Meta:
        ordering = ['day_number']
        verbose_name = "День тура"
        verbose_name_plural = "Дни тура"


class IncludedFeature(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='included_features')
    title = models.CharField("Пункт", max_length=60)
    description = models.CharField("Описание", max_length=200)
    icon = models.CharField("Иконка (FontAwesome)", max_length=30, blank=True)

    def __str__(self):
        return f"{self.title} ({self.trip.title})"

    class Meta:
        ordering = ['id']


class TripDate(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='trip_dates')
    start_date = models.DateField("Дата начала")
    end_date = models.DateField("Дата окончания")
    price = models.DecimalField("Цена", max_digits=10, decimal_places=0)
    current_members = models.PositiveIntegerField("Количество брони")
    is_special_offer = models.BooleanField("Спецпредложение", default=False)
    icon = models.CharField("Иконка офера (FontAwesome)", max_length=30, blank=True)

    def clean(self):
        if self.start_date >= self.end_date:
            raise ValidationError("Дата окончания должна быть позже даты начала")

        if self.start_date < timezone.now().date():
            raise ValidationError("Дата начала не может быть в прошлом.")

    @property
    def available_spots(self):
        return self.trip.group_size - self.current_members

    def __str__(self):
        return f"{self.start_date} - {self.end_date} ({self.price}€)"


class TripRequest(models.Model):
    CONTACT_METHODS = [
        ('tg', 'Telegram'),
        ('wa', 'WhatsApp'),
        ('call', 'Звонок'),
    ]

    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='requests')
    name = models.CharField("Имя", max_length=100)
    phone = models.CharField("Телефон", max_length=20)
    email = models.EmailField("Email", blank=True)
    preferred_contact = models.CharField("Способ связи", max_length=4, choices=CONTACT_METHODS)
    notes = models.TextField("Комментарий", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_spam = models.BooleanField(default=False)

    def clean(self):
        # Проверка на частые запросы
        recent_requests = TripRequest.objects.filter(
            phone=self.phone,
            created_at__gte=timezone.now() - timezone.timedelta(hours=1)
        ).count()

        if recent_requests >= 3:
            raise ValidationError("Слишком много запросов. Попробуйте позже.")

        spam_keywords = ['http', 'www', 'куплю', 'продам']
        if any(keyword in self.notes.lower() for keyword in spam_keywords):
            self.is_spam = True

        if not re.match(r'^\+?[1-9]\d{7,14}$', self.phone):
            raise ValidationError("Некорректный номер телефона.")

    def send_telegram_notification(self):
        message = (
            f"🚀 Новая заявка!\n"
            f"Тур: {self.trip.title}\n"
            f"Имя: {self.name}\n"
            f"Телефон: {self.phone}\n"
            f"Способ связи: {self.get_preferred_contact_display()}"
        )

        url = f"https://api.telegram.org/bot{settings.TELEGRAM_BOT_TOKEN}/sendMessage"
        payload = {
            "chat_id": settings.TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "HTML"
        }

        try:
            response = requests.post(url, json=payload, timeout=5)
            response.raise_for_status()  # check HTTP status
        except Exception as e:
            logger.error(f"Telegram notification failed: {str(e)}")

    def save(self, *args, **kwargs):
        is_new = self._state.adding
        super().save(*args, **kwargs)
        if is_new and not self.is_spam:
            self.send_telegram_notification()

    class Meta:
        indexes = [
            models.Index(fields=['phone']),
            models.Index(fields=['created_at']),
        ]


class FAQ(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='faqs')
    question = models.CharField("Вопрос", max_length=255)
    answer = models.TextField("Ответ")
    order = models.PositiveIntegerField("Порядок", default=0)

    def __str__(self):
        return f"Вопрос: {self.question} (Тур: {self.trip.title})"

    class Meta:
        ordering = ['order']
