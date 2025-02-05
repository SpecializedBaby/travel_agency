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


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Date)
class DateAdmin(admin.ModelAdmin):
    list_display = ("trip", "from_date", "to_date")
    list_filter = ("trip",)


@admin.register(Day)
class DayAdmin(admin.ModelAdmin):
    list_display = ("trip", "place", "activity")
    list_filter = ("trip",)
