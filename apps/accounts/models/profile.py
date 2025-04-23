from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models

from django.utils.translation import gettext_lazy as _

from .user import User


class Author(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="author_profile",
    )
    profession = models.CharField(max_length=65)
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
        verbose_name = _("Author")
        verbose_name_plural = _("Authors")
        ordering = ["-rating"]

    def __str__(self):
        return f"{self.user.get_full_name()} ({self.profession})"

    @property
    def full_name(self) -> str:
        return self.user.get_full_name()
