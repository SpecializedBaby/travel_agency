from django.contrib import admin
from django.utils.safestring import mark_safe

from .models import (
    Trip, TripPhoto, ProgramByDay, IncludedFeature,
    TripDate, TripRequest, FAQ
)


class TripPhotoInline(admin.TabularInline):
    model = TripPhoto
    extra = 1
    fields = ('photo', 'type', 'caption')
    readonly_fields = ('photo_preview',)

    def photo_preview(self, obj):
        if obj.photo:
            return mark_safe(f'<img src="{obj.photo.url}" style="max-height: 100px;" />')
        return "Нет фото"
    photo_preview.allow_tags = True
    photo_preview.short_description = "Предпросмотр"


class ProgramByDayInline(admin.TabularInline):
    model = ProgramByDay
    extra = 1
    fields = ('day_number', 'title', 'description', 'accommodation', 'meal_plan')


class IncludedFeatureInline(admin.TabularInline):
    model = IncludedFeature
    extra = 1
    fields = ('title', 'description', 'icon')


class TripDateInline(admin.TabularInline):
    model = TripDate
    extra = 1
    fields = ('start_date', 'end_date', 'price', 'current_members', 'is_special_offer', 'icon')


class FAQInline(admin.TabularInline):
    model = FAQ
    extra = 1
    fields = ('question', 'answer', 'order')


@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    list_display = ('title', 'country', 'duration_days', 'group_size', 'created_at')
    readonly_fields = ('created_at', )
    list_filter = ('country', 'duration_days', 'group_size')
    search_fields = ('title', 'description', 'destination')
    prepopulated_fields = {'slug': ('title', )}
    inlines = [
        TripPhotoInline,
        ProgramByDayInline,
        IncludedFeatureInline,
        TripDateInline,
        FAQInline,
    ]
    fieldsets = (
        ('Основная информация', {
            'fields': ('title', 'slug', 'country', 'welcome_message', 'duration_days')
        }),
        ('Детали тура', {
            'fields': ('ask_title', 'description', 'accommodation', 'group_size', 'leaders', 'bonus')
        }),
        ('SEO', {
            'fields': ('seo_title', 'seo_description'),
            'classes': ('collapse', )
        }),
    )


@admin.register(TripPhoto)
class TripPhotoAdmin(admin.ModelAdmin):
    list_display = ('trip', 'type', 'photo_preview', 'caption')
    list_filter = ('type', )
    search_fields = ('trip__title', 'caption')
    readonly_fields = ('photo_preview', )

    def photo_preview(self, obj):
        if obj.photo:
            return mark_safe(f'<img src="{obj.photo.url}" style="max-height: 100px;" />')
        return "Нет фото"

    photo_preview.allow_tags = True
    photo_preview.short_description = "Предпросмотр"


@admin.register(ProgramByDay)
class ProgramByDayAdmin(admin.ModelAdmin):
    list_display = ('trip', 'day_number', 'title', 'accommodation')
    list_filter = ('trip', 'day_number')
    search_fields = ('trip__title', 'title', 'description')


@admin.register(IncludedFeature)
class IncludedFeatureAdmin(admin.ModelAdmin):
    list_display = ('trip', 'title', 'icon')
    list_filter = ('trip', )
    search_fields = ('trip__title', 'title', 'description')


@admin.register(TripDate)
class TripDateAdmin(admin.ModelAdmin):
    list_display = ('trip', 'start_date', 'end_date', 'price', 'available_spots', 'is_special_offer')
    list_filter = ('trip', 'start_date', 'is_special_offer')
    search_fields = ('trip__title', )

    def available_spots(self, obj):
        return obj.trip.group_size - obj.current_members
    available_spots.short_description = "Доступные места"


@admin.register(TripRequest)
class TripRequestAdmin(admin.ModelAdmin):
    list_display = ('trip', 'name', 'phone', 'preferred_contact', 'created_at', 'is_spam')
    list_filter = ('trip', 'preferred_contact', 'is_spam')
    search_fields = ('trip__title', 'name', 'phone', 'email')
    readonly_fields = ('created_at', )
    actions = ['mark_as_spam', 'mark_as_not_spam']

    def mark_as_spam(self, request, queryset):
        queryset.update(is_spam=True)
    mark_as_spam.short_description = "Пометить как спам"

    def mark_as_not_spam(self, request, queryset):
        queryset.update(is_spam=False)
    mark_as_not_spam.short_description = "Снять пометку спама"


@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = ('trip', 'question', 'order')
    list_filter = ('trip', )
    search_fields = ('trip__title', 'question', 'answer')
