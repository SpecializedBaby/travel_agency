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
    list_display = ("title", "destination", "price", "max_members", "current_members")
    search_fields = ("title", "destination")
    list_filter = ("category",)
    # additional configurations as necessary


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
