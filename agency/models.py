import uuid
import re
import logging
import requests
from enum import Enum
from typing import List, Dict

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models
from django.db.models import Sum, Q, F, UniqueConstraint
from django.utils import timezone
from django.urls import reverse
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.utils.translation import gettext_lazy as _
from django.core.validators import MinValueValidator, MaxValueValidator

logger = logging.getLogger(__name__)


class UserRole(Enum):
    ADMIN = 'admin'
    CUSTOMER = 'customer'
    AUTHOR = 'author'


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile_image = models.ImageField(
        upload_to='users/avatars/',
        null=True,
        blank=True,
        help_text=_("User profile picture")
    )
    role = models.CharField(
        max_length=10,
        choices=[(role.value, role.name.capitalize()) for role in UserRole],
        default=UserRole.CUSTOMER.value
    )
    is_verified = models.BooleanField(
        default=False,
        help_text=_("Designates whether the user has verified their email address.")
    )
    last_login = models.DateTimeField(null=True, blank=True)

    # Add custom related_name for groups and user_permissions
    groups = models.ManyToManyField(
        Group,
        verbose_name=_('groups'),
        blank=True,
        help_text=_('The groups this user belongs to.'),
        related_name="agency_user_groups",
        related_query_name="agency_user",
    )
    user_permissions = models.ManyToManyField(
        Permission,
        verbose_name=_('user permissions'),
        blank=True,
        help_text=_('Specific permissions for this user.'),
        related_name="agency_user_permissions",
        related_query_name="agency_user",
    )

    class Meta:
        verbose_name = _('User')
        verbose_name_plural = _('Users')
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['username']),
            models.Index(fields=['role']),
        ]
        constraints = [
            UniqueConstraint(
                fields=['email'],
                name='unique_user_email'
            ),
            UniqueConstraint(
                fields=['username'],
                name='unique_user_username'
            )
        ]

    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"

    @property
    def is_author(self) -> bool:
        return self.role == UserRole.AUTHOR.value


class Author(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='author_profile'
    )
    profession = models.CharField(max_length=100)
    bio = models.TextField()
    experience_years = models.PositiveIntegerField()
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    review_count = models.PositiveIntegerField(default=0)
    languages = models.JSONField(default=list)
    specialties = models.JSONField(default=list)
    social_media = models.JSONField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Author')
        verbose_name_plural = _('Authors')
        ordering = ['-rating']

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.profession})"

    @property
    def full_name(self) -> str:
        return self.user.get_full_name()


class Country(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=3, unique=True)
    description = models.TextField()
    capital = models.CharField(max_length=100)
    language = models.CharField(max_length=100)
    currency = models.CharField(max_length=100)
    best_time_to_visit = models.CharField(max_length=100)
    image = models.ImageField(upload_to='countries/')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Country')
        verbose_name_plural = _('Countries')
        ordering = ['name']
        indexes = [
            models.Index(fields=['name']),
            models.Index(fields=['code']),
        ]

    def __str__(self):
        return self.name


class PopularDestination(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    country = models.ForeignKey(
        Country,
        on_delete=models.CASCADE,
        related_name='popular_destinations'
    )
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    image = models.ImageField(
        upload_to='destinations/',
        blank=True,
        null=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Popular Destination')
        verbose_name_plural = _('Popular Destinations')
        ordering = ['name']
        constraints = [
            UniqueConstraint(
                fields=['country', 'name'],
                name='unique_destination_per_country'
            )
        ]

    def __str__(self):
        return f"{self.name}, {self.country.name}"


class TripDifficulty(Enum):
    EASY = 'easy'
    MODERATE = 'moderate'
    CHALLENGING = 'challenging'
    DIFFICULT = 'difficult'


class Trip(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    author = models.ForeignKey(
        Author,
        on_delete=models.CASCADE,
        related_name='trips'
    )
    title = models.CharField(max_length=100)
    slug = models.SlugField(max_length=150, unique=True)
    description = models.TextField()
    long_description = models.TextField()
    destination = models.CharField(max_length=100)
    duration = models.PositiveIntegerField(
        help_text=_("Duration in days")
    )
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text=_("Base price per person")
    )
    group_size_min = models.PositiveIntegerField()
    group_size_max = models.PositiveIntegerField()
    difficulty = models.CharField(
        max_length=12,
        choices=[(difficulty.value, difficulty.name.capitalize()) for difficulty in TripDifficulty]
    )
    featured = models.BooleanField(default=False)
    rating = models.DecimalField(
        max_digits=3,
        decimal_places=2,
        default=0,
        validators=[MinValueValidator(0), MaxValueValidator(5)]
    )
    review_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    countries = models.ManyToManyField(
        Country,
        through='TripCountry',
        related_name='trips'
    )

    class Meta:
        verbose_name = _('Trip')
        verbose_name_plural = _('Trips')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['title']),
            models.Index(fields=['slug']),
            models.Index(fields=['price']),
            models.Index(fields=['difficulty']),
            models.Index(fields=['rating']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('trip_detail', kwargs={'slug': self.slug})

    @property
    def available_dates(self):
        return self.trip_dates.filter(
            is_active=True,
            start_date__gte=timezone.now().date()
        ).order_by('start_date')

    @property
    def primary_image(self):
        return self.images.filter(is_primary=True).first()

    def update_rating(self):
        """Update trip rating based on reviews"""
        result = self.reviews.aggregate(
            avg_rating=models.Avg('rating'),
            count=models.Count('id')
        )
        self.rating = result['avg_rating'] or 0
        self.review_count = result['count']
        self.save()


class TripImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name='images'
    )
    image = models.ImageField(upload_to='trips/images/')
    alt_text = models.CharField(max_length=100)
    is_primary = models.BooleanField(default=False)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Trip Image')
        verbose_name_plural = _('Trip Images')
        ordering = ['display_order']
        constraints = [
            UniqueConstraint(
                fields=['trip'],
                condition=Q(is_primary=True),
                name='unique_primary_image_per_trip'
            )
        ]

    def __str__(self):
        return f"Image for {self.trip.title}"

    def save(self, *args, **kwargs):
        # Ensure only one primary image per trip
        if self.is_primary:
            TripImage.objects.filter(trip=self.trip, is_primary=True).update(is_primary=False)
        super().save(*args, **kwargs)


class TripCountry(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip = models.ForeignKey(Trip, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Trip Country')
        verbose_name_plural = _('Trip Countries')
        constraints = [
            UniqueConstraint(
                fields=['trip', 'country'],
                name='unique_trip_country'
            )
        ]

    def __str__(self):
        return f"{self.trip.title} - {self.country.name}"


class TripDate(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name='trip_dates'
    )
    start_date = models.DateField()
    end_date = models.DateField()
    price = models.DecimalField(
        max_digits=10,
        decimal_places=2,
        null=True,
        blank=True
    )
    spots_total = models.PositiveIntegerField()
    spots_booked = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Trip Date')
        verbose_name_plural = _('Trip Dates')
        ordering = ['start_date']
        indexes = [
            models.Index(fields=['start_date']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return f"{self.trip.title} - {self.start_date} to {self.end_date}"

    def clean(self):
        if self.start_date >= self.end_date:
            raise ValidationError(_("End date must be after start date"))

        if self.start_date < timezone.now().date():
            raise ValidationError(_("Start date cannot be in the past"))

    @property
    def available_spots(self) -> int:
        return self.spots_total - self.spots_booked

    @property
    def is_available(self) -> bool:
        return self.is_active and self.available_spots > 0 and self.start_date > timezone.now().date()

    def book_spots(self, count: int) -> bool:
        """Book spots if available"""
        if count <= 0:
            raise ValueError(_("Count must be positive"))

        if self.available_spots < count:
            return False

        self.spots_booked = F('spots_booked') + count
        self.save()
        self.refresh_from_db()
        return True


class ItineraryDay(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name='itinerary_days'
    )
    day_number = models.PositiveIntegerField()
    title = models.CharField(max_length=100)
    description = models.TextField()
    accommodation = models.CharField(max_length=255, blank=True, null=True)
    meals = models.JSONField(default=list)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Itinerary Day')
        verbose_name_plural = _('Itinerary Days')
        ordering = ['day_number']
        constraints = [
            UniqueConstraint(
                fields=['trip', 'day_number'],
                name='unique_day_per_trip'
            )
        ]

    def __str__(self):
        return f"Day {self.day_number}: {self.title}"


class InclusionType(Enum):
    INCLUDED = 'included'
    NOT_INCLUDED = 'not_included'


class TripInclusion(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name='inclusions'
    )
    description = models.CharField(max_length=255)
    inclusion_type = models.CharField(
        max_length=12,
        choices=[(type.value, type.name.replace('_', ' ').title()) for type in InclusionType]
    )
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = _('Trip Inclusion')
        verbose_name_plural = _('Trip Inclusions')
        ordering = ['display_order']

    def __str__(self):
        return f"{self.get_inclusion_type_display()}: {self.description}"


class Review(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='reviews'
    )
    rating = models.PositiveIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    title = models.CharField(max_length=100)
    content = models.TextField()
    trip_date = models.DateField()
    is_verified = models.BooleanField(default=False)
    is_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Review')
        verbose_name_plural = _('Reviews')
        ordering = ['-created_at']
        constraints = [
            UniqueConstraint(
                fields=['trip', 'user'],
                name='unique_review_per_user_per_trip'
            )
        ]

    def __str__(self):
        return f"Review by {self.user.get_full_name()} for {self.trip.title}"

    def clean(self):
        if self.rating < 1 or self.rating > 5:
            raise ValidationError(_("Rating must be between 1 and 5"))

        if self.trip_date > timezone.now().date():
            raise ValidationError(_("Trip date cannot be in the future"))

    def save(self, *args, **kwargs):
        is_new = self._state.adding
        super().save(*args, **kwargs)
        if is_new and self.is_published:
            self.trip.update_rating()


class BookingStatus(Enum):
    PENDING = 'pending'
    CONFIRMED = 'confirmed'
    CANCELLED = 'cancelled'
    COMPLETED = 'completed'


class Booking(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='bookings'
    )
    trip = models.ForeignKey(
        Trip,
        on_delete=models.CASCADE,
        related_name='bookings'
    )
    trip_date = models.ForeignKey(
        TripDate,
        on_delete=models.CASCADE,
        related_name='bookings'
    )
    booking_number = models.CharField(
        max_length=20,
        unique=True,
        editable=False
    )
    status = models.CharField(
        max_length=10,
        choices=[(status.value, status.name.capitalize()) for status in BookingStatus],
        default=BookingStatus.PENDING.value
    )
    number_of_travelers = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    special_requests = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Booking')
        verbose_name_plural = _('Bookings')
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['booking_number']),
            models.Index(fields=['status']),
        ]

    def __str__(self):
        return f"Booking #{self.booking_number} for {self.trip.title}"

    def clean(self):
        if self.number_of_travelers < 1:
            raise ValidationError(_("Number of travelers must be at least 1"))

        if not self.trip_date.is_available:
            raise ValidationError(_("Selected trip date is not available"))

        if self.number_of_travelers > self.trip_date.available_spots:
            raise ValidationError(_("Not enough available spots for this date"))

    def save(self, *args, **kwargs):
        if not self.booking_number:
            self.booking_number = self.generate_booking_number()

        if not self.total_price:
            self.total_price = self.calculate_total_price()

        super().save(*args, **kwargs)

    def generate_booking_number(self) -> str:
        """Generate unique booking number"""
        timestamp = timezone.now().strftime('%Y%m%d')
        random_part = uuid.uuid4().hex[:6].upper()
        return f"FT-{timestamp}-{random_part}"

    def calculate_total_price(self) -> float:
        """Calculate total booking price"""
        price = self.trip_date.price if self.trip_date.price else self.trip.price
        return float(price) * self.number_of_travelers

    def confirm(self):
        """Confirm booking"""
        if self.status != BookingStatus.PENDING.value:
            raise ValidationError(_("Only pending bookings can be confirmed"))

        if not self.trip_date.book_spots(self.number_of_travelers):
            raise ValidationError(_("Not enough available spots"))

        self.status = BookingStatus.CONFIRMED.value
        self.save()


class Traveler(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking = models.ForeignKey(
        Booking,
        on_delete=models.CASCADE,
        related_name='travelers'
    )
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    date_of_birth = models.DateField()
    passport_number = models.CharField(max_length=50, blank=True, null=True)
    passport_expiry = models.DateField(blank=True, null=True)
    nationality = models.CharField(max_length=50)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Traveler')
        verbose_name_plural = _('Travelers')

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

    def clean(self):
        if self.passport_expiry and self.passport_expiry < timezone.now().date():
            raise ValidationError(_("Passport must not be expired"))

        if self.date_of_birth > timezone.now().date():
            raise ValidationError(_("Date of birth cannot be in the future"))


class PaymentStatus(Enum):
    PENDING = 'pending'
    COMPLETED = 'completed'
    FAILED = 'failed'
    REFUNDED = 'refunded'


class Payment(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    booking = models.ForeignKey(
        Booking,
        on_delete=models.CASCADE,
        related_name='payments'
    )
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='EUR')
    payment_method = models.CharField(max_length=50)
    transaction_id = models.CharField(max_length=100, unique=True)
    status = models.CharField(
        max_length=10,
        choices=[(status.value, status.name.capitalize()) for status in PaymentStatus],
        default=PaymentStatus.PENDING.value
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Payment')
        verbose_name_plural = _('Payments')
        ordering = ['-created_at']

    def __str__(self):
        return f"Payment {self.transaction_id} for booking #{self.booking.booking_number}"

    def clean(self):
        if self.amount <= 0:
            raise ValidationError(_("Amount must be positive"))

        if self.amount > self.booking.total_price:
            raise ValidationError(_("Payment amount cannot exceed booking total"))


class Subscription(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=50, blank=True, null=True)
    last_name = models.CharField(max_length=50, blank=True, null=True)
    preferences = models.JSONField(default=dict)
    is_active = models.BooleanField(default=True)
    confirmation_token = models.CharField(max_length=100, blank=True, null=True)
    is_confirmed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    last_email_sent = models.DateTimeField(blank=True, null=True)

    class Meta:
        verbose_name = _('Subscription')
        verbose_name_plural = _('Subscriptions')
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['is_active']),
        ]

    def __str__(self):
        return self.email

    def generate_confirmation_token(self) -> str:
        """Generate unique confirmation token"""
        token = uuid.uuid4().hex
        self.confirmation_token = token
        self.save()
        return token

    def confirm(self, token: str) -> bool:
        """Confirm subscription with token"""
        if self.confirmation_token == token:
            self.is_confirmed = True
            self.confirmation_token = None
            self.save()
            return True
        return False


class ContactMessageStatus(Enum):
    UNREAD = 'unread'
    READ = 'read'
    REPLIED = 'replied'
    ARCHIVED = 'archived'


class ContactMessage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    trip = models.ForeignKey(
        Trip,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='contact_messages'
    )
    author = models.ForeignKey(
        Author,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='contact_messages'
    )
    status = models.CharField(
        max_length=10,
        choices=[(status.value, status.name.capitalize()) for status in ContactMessageStatus],
        default=ContactMessageStatus.UNREAD.value
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = _('Contact Message')
        verbose_name_plural = _('Contact Messages')
        ordering = ['-created_at']

    def __str__(self):
        return f"Message from {self.name} about {self.subject}"

    def mark_as_read(self):
        """Mark message as read"""
        if self.status == ContactMessageStatus.UNREAD.value:
            self.status = ContactMessageStatus.READ.value
            self.save()

    def send_email_notification(self):
        """Send email notification to admin"""
        subject = f"New contact message: {self.subject}"
        message = f"""
        Name: {self.name}
        Email: {self.email}
        Subject: {self.subject}
        Message: {self.message}

        Trip: {self.trip.title if self.trip else 'N/A'}
        Author: {self.author.user.get_full_name() if self.author else 'N/A'}
        """

        # In production, you would use Django's email sending functionality
        # from django.core.mail import send_mail
        # send_mail(subject, message, settings.DEFAULT_FROM_EMAIL, [settings.CONTACT_EMAIL])

        logger.info(f"New contact message received: {subject}")
