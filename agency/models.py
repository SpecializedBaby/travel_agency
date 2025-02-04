from django.db import models


# Must be to connect to img models these functions!
def trip_image_upload_path(instance, filename):
    # Generate file path for the trip's general image
    return f"media/trip_{instance.id}/general/{filename}"


def day_image_upload_path(instance, filename):
    # Generate file path for each day's image
    return f"media/trip_{instance.trip.id}/days/day_{instance.id}/{filename}"


class Trip(models.Model):
    COUNTRY_CHOICES = [
        ('cz', 'Чехия'),
        ('it', 'Италия'),
        # ... другие страны
    ]

    title = models.CharField("Название тура", max_length=255)
    country = models.CharField("Страна", max_length=2, choices=COUNTRY_CHOICES)
    main_photo = models.ImageField("Главное фото", upload_to=trip_image_upload_path)
    duration_days = models.PositiveIntegerField("Длительность (дней)")
    accommodation = models.TextField("Проживание")
    group_size = models.PositiveIntegerField("Макс. размер группы")
    leaders = models.CharField("Команда", max_length=255)
    seo_title = models.CharField(max_length=60, blank=True)
    seo_description = models.TextField(blank=True)

    # Метод для отображения мест в группе
    @property
    def available_spots(self):
        return self.max_members - self.current_members

    def __str__(self):
        return self.title


class IncludedFeature(models.Model):
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name='included_features')
    title = models.CharField("Пункт", max_length=100)
    description = models.CharField("Описание", max_length=200)
    icon = models.CharField("Иконка (FontAwesome)", max_length=30, blank=True)

    class Meta:
        ordering = ['id']


class Date(models.Model):
    from_date = models.DateField()
    to_date = models.DateField()
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="dates")

    def __str__(self):
        return f"{self.trip} from {self.from_date} to {self.to_date}."


class Day(models.Model):
    name = models.CharField(max_length=255)
    place = models.CharField(max_length=255)
    description = models.TextField()
    activity = models.CharField(max_length=600)
    image = models.ImageField(upload_to="day/")
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE, related_name="days")

    def __str__(self):
        return f"{self.name} of {self.trip}"
