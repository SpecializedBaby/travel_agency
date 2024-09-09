from django.contrib import admin
from agency.models import Trip, Category, Date, Day


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
