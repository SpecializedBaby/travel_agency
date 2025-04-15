from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .models import (
    User, Author, Country, PopularDestination, Trip, TripImage,
    TripCountry, TripDate, ItineraryDay, TripInclusion, Review,
    Booking, Traveler, Payment, Subscription, ContactMessage
)


# Common admin classes for reusability
class ImagePreviewMixin:
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" style="max-height: 100px;" />')
        return _("No image")

    image_preview.short_description = _("Preview")


class BaseAdmin(admin.ModelAdmin):
    readonly_fields = ('get_created_at', 'get_updated_at')
    list_per_page = 50

    def get_created_at(self, obj):
        return obj.created_at

    get_created_at.short_description = _("Created at")

    def get_updated_at(self, obj):
        return obj.updated_at

    get_updated_at.short_description = _("Updated at")


# Inline Admin Classes
class TripImageInline(ImagePreviewMixin, admin.TabularInline):
    model = TripImage
    extra = 1
    fields = ('image', 'alt_text', 'is_primary', 'display_order', 'image_preview')


class TripCountryInline(admin.TabularInline):
    model = TripCountry
    extra = 1
    fields = ('country',)
    autocomplete_fields = ['country']


class ItineraryDayInline(admin.TabularInline):
    model = ItineraryDay
    extra = 1
    fields = ('day_number', 'title', 'description', 'accommodation', 'meals')


class TripInclusionInline(admin.TabularInline):
    model = TripInclusion
    extra = 1
    fields = ('description', 'inclusion_type', 'display_order')


class TripDateInline(admin.TabularInline):
    model = TripDate
    extra = 1
    fields = ('start_date', 'end_date', 'price', 'spots_total', 'spots_booked', 'is_active')


class TravelerInline(admin.TabularInline):
    model = Traveler
    extra = 1
    fields = ('first_name', 'last_name', 'email', 'date_of_birth', 'nationality')


class PaymentInline(admin.TabularInline):
    model = Payment
    extra = 1
    readonly_fields = ('get_created_at', 'get_updated_at')
    fields = ('amount', 'currency', 'payment_method', 'transaction_id', 'status')

    def get_created_at(self, obj):
        return obj.created_at

    get_created_at.short_description = _("Created at")

    def get_updated_at(self, obj):
        return obj.updated_at

    get_updated_at.short_description = _("Updated at")


# Main Admin Classes
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('email', 'first_name', 'last_name', 'role', 'is_verified', 'is_active')
    list_filter = ('role', 'is_verified', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal info'), {'fields': ('first_name', 'last_name', 'profile_image')}),
        (_('Permissions'), {
            'fields': ('role', 'is_active', 'is_verified', 'is_staff', 'is_superuser',
                       'groups', 'user_permissions'),
        }),
        (_('Important dates'), {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    filter_horizontal = ('groups', 'user_permissions',)

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ('last_login', 'date_joined')
        return ()


@admin.register(Author)
class AuthorAdmin(BaseAdmin):
    list_display = ('user', 'profession', 'experience_years', 'rating')
    list_filter = ('profession',)
    search_fields = ('user__email', 'user__first_name', 'user__last_name', 'profession')
    autocomplete_fields = ['user']
    fieldsets = (
        (None, {'fields': ('user',)}),
        (_('Professional Info'), {'fields': ('profession', 'experience_years', 'rating', 'review_count')}),
        (_('Details'), {'fields': ('bio', 'languages', 'specialties', 'social_media')}),
    )


@admin.register(Country)
class CountryAdmin(BaseAdmin):
    list_display = ('name', 'code', 'capital', 'currency')
    list_filter = ('currency',)
    search_fields = ('name', 'code', 'capital')
    fieldsets = (
        (None, {'fields': ('name', 'code')}),
        (_('Details'), {'fields': ('description', 'capital', 'language', 'currency', 'best_time_to_visit')}),
        (_('Media'), {'fields': ('image',)}),
    )


@admin.register(PopularDestination)
class PopularDestinationAdmin(ImagePreviewMixin, BaseAdmin):
    list_display = ('name', 'country', 'image_preview')
    list_filter = ('country',)
    search_fields = ('name', 'country__name')
    autocomplete_fields = ['country']
    fieldsets = (
        (None, {'fields': ('country', 'name')}),
        (_('Details'), {'fields': ('description',)}),
        (_('Media'), {'fields': ('image', 'image_preview')}),
    )


@admin.register(Trip)
class TripAdmin(BaseAdmin):
    list_display = ('title', 'author', 'duration', 'price', 'difficulty', 'rating', 'is_active')
    list_filter = ('is_active', 'featured', 'difficulty')
    search_fields = ('title', 'description', 'destination')
    prepopulated_fields = {'slug': ('title',)}
    autocomplete_fields = ['author']
    inlines = [
        TripImageInline,
        TripCountryInline,
        ItineraryDayInline,
        TripInclusionInline,
        TripDateInline,
    ]
    fieldsets = (
        (None, {'fields': ('author', 'title', 'slug', 'destination')}),
        (_('Details'), {'fields': ('description', 'long_description', 'duration', 'difficulty')}),
        (_('Pricing'), {'fields': ('price', 'group_size_min', 'group_size_max')}),
        (_('Metadata'), {'fields': ('rating', 'review_count', 'featured', 'is_active')}),
    )


@admin.register(TripImage)
class TripImageAdmin(ImagePreviewMixin, BaseAdmin):
    list_display = ('trip', 'alt_text', 'is_primary', 'display_order', 'image_preview')
    list_filter = ('is_primary',)
    search_fields = ('trip__title', 'alt_text')
    autocomplete_fields = ['trip']
    fieldsets = (
        (None, {'fields': ('trip',)}),
        (_('Image'), {'fields': ('image', 'alt_text', 'image_preview')}),
        (_('Settings'), {'fields': ('is_primary', 'display_order')}),
    )


@admin.register(ItineraryDay)
class ItineraryDayAdmin(BaseAdmin):
    list_display = ('trip', 'day_number', 'title', 'accommodation')
    list_filter = ('trip',)
    search_fields = ('trip__title', 'title', 'description')
    autocomplete_fields = ['trip']
    fieldsets = (
        (None, {'fields': ('trip', 'day_number')}),
        (_('Details'), {'fields': ('title', 'description', 'accommodation', 'meals')}),
    )


@admin.register(TripInclusion)
class TripInclusionAdmin(BaseAdmin):
    list_display = ('trip', 'description', 'inclusion_type', 'display_order')
    list_filter = ('inclusion_type',)
    search_fields = ('trip__title', 'description')
    autocomplete_fields = ['trip']
    readonly_fields = ('get_created_at',)
    fieldsets = (
        (None, {'fields': ('trip',)}),
        (_('Details'), {'fields': ('description', 'inclusion_type', 'display_order')}),
    )


@admin.register(TripDate)
class TripDateAdmin(BaseAdmin):
    list_display = ('trip', 'start_date', 'end_date', 'price', 'available_spots', 'is_active')
    list_filter = ('is_active', 'start_date')
    search_fields = ('trip__title',)
    autocomplete_fields = ['trip']
    readonly_fields = ('available_spots',)
    fieldsets = (
        (None, {'fields': ('trip',)}),
        (_('Dates'), {'fields': ('start_date', 'end_date')}),
        (_('Pricing'), {'fields': ('price',)}),
        (_('Availability'), {'fields': ('spots_total', 'spots_booked', 'available_spots', 'is_active')}),
    )

    def available_spots(self, obj):
        return obj.spots_total - obj.spots_booked

    available_spots.short_description = _("Available spots")


@admin.register(Review)
class ReviewAdmin(BaseAdmin):
    list_display = ('trip', 'user', 'rating', 'title', 'is_published', 'created_at')
    list_filter = ('rating', 'is_published', 'is_verified')
    search_fields = ('trip__title', 'user__email', 'title', 'content')
    autocomplete_fields = ['trip', 'user']
    fieldsets = (
        (None, {'fields': ('trip', 'user')}),
        (_('Review'), {'fields': ('rating', 'title', 'content', 'trip_date')}),
        (_('Status'), {'fields': ('is_verified', 'is_published')}),
    )


@admin.register(Booking)
class BookingAdmin(BaseAdmin):
    list_display = ('booking_number', 'user', 'trip', 'status', 'number_of_travelers', 'total_price')
    list_filter = ('status',)
    search_fields = ('booking_number', 'user__email', 'trip__title')
    readonly_fields = ('booking_number', 'total_price')
    autocomplete_fields = ['user', 'trip', 'trip_date']
    inlines = [TravelerInline, PaymentInline]
    fieldsets = (
        (None, {'fields': ('booking_number', 'user', 'trip', 'trip_date')}),
        (_('Details'), {'fields': ('status', 'number_of_travelers', 'total_price', 'special_requests')}),
    )
    actions = ['mark_as_confirmed', 'mark_as_cancelled']

    def mark_as_confirmed(self, request, queryset):
        queryset.update(status='confirmed')

    mark_as_confirmed.short_description = _("Mark selected bookings as confirmed")

    def mark_as_cancelled(self, request, queryset):
        queryset.update(status='cancelled')

    mark_as_cancelled.short_description = _("Mark selected bookings as cancelled")


@admin.register(Traveler)
class TravelerAdmin(BaseAdmin):
    list_display = ('booking', 'first_name', 'last_name', 'email', 'nationality')
    search_fields = ('booking__booking_number', 'first_name', 'last_name', 'email')
    autocomplete_fields = ['booking']
    fieldsets = (
        (None, {'fields': ('booking',)}),
        (_('Personal Info'), {'fields': ('first_name', 'last_name', 'email', 'phone', 'date_of_birth', 'nationality')}),
        (_('Passport Info'), {'fields': ('passport_number', 'passport_expiry')}),
    )


@admin.register(Payment)
class PaymentAdmin(BaseAdmin):
    list_display = ('booking', 'amount', 'currency', 'payment_method', 'status', 'created_at')
    list_filter = ('status', 'currency', 'payment_method')
    search_fields = ('booking__booking_number', 'transaction_id')
    readonly_fields = ('transaction_id',)
    autocomplete_fields = ['booking']
    fieldsets = (
        (None, {'fields': ('booking', 'transaction_id')}),
        (_('Payment Details'), {'fields': ('amount', 'currency', 'payment_method', 'status')}),
    )


@admin.register(Subscription)
class SubscriptionAdmin(BaseAdmin):
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_confirmed')
    list_filter = ('is_active', 'is_confirmed')
    search_fields = ('email', 'first_name', 'last_name')
    fieldsets = (
        (None, {'fields': ('email',)}),
        (_('Personal Info'), {'fields': ('first_name', 'last_name')}),
        (_('Preferences'), {'fields': ('preferences',)}),
        (_('Status'), {'fields': ('is_active', 'is_confirmed', 'confirmation_token')}),
    )
    actions = ['mark_as_confirmed', 'mark_as_unconfirmed']

    def mark_as_confirmed(self, request, queryset):
        queryset.update(is_confirmed=True)

    mark_as_confirmed.short_description = _("Mark selected as confirmed")

    def mark_as_unconfirmed(self, request, queryset):
        queryset.update(is_confirmed=False)

    mark_as_unconfirmed.short_description = _("Mark selected as unconfirmed")


@admin.register(ContactMessage)
class ContactMessageAdmin(BaseAdmin):
    list_display = ('name', 'email', 'subject', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('get_created_at', 'get_updated_at')
    autocomplete_fields = ['trip', 'author']
    fieldsets = (
        (None, {'fields': ('name', 'email', 'subject', 'message')}),
        (_('Related To'), {'fields': ('trip', 'author')}),
        (_('Status'), {'fields': ('status',)}),
    )
    actions = ['mark_as_read', 'mark_as_replied']

    def mark_as_read(self, request, queryset):
        queryset.update(status='read')

    mark_as_read.short_description = _("Mark selected as read")

    def mark_as_replied(self, request, queryset):
        queryset.update(status='replied')

    mark_as_replied.short_description = _("Mark selected as replied")
