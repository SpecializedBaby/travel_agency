from enum import Enum

from django.db import models
from django.db.models import UniqueConstraint
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class UserRole(Enum):
    ADMIN = "admin"
    CUSTOMER = "customer"
    AUTHOR = "author"


class User(AbstractUser):
    profile_image = models.ImageField(
        upload_to="users/avatars/",
        null=True,
        blank=True,
        help_text=_("User profile picture")
    )
    role = models.CharField(
        max_length=12,
        choices=[(role.value, role.name.capitalize()) for role in UserRole],
        default=UserRole.CUSTOMER.value,
    )
    is_verified = models.BooleanField(
        default=False,
        help_text=_("Designates whether the user has verified their email address.")
    )

    # Add custom related_name for groups and user_permissions
    groups = models.ManyToManyField(
        "auth.Group",
        verbose_name=_("groups"),
        blank=True,
        help_text=_("The groups this user belongs to."),
        related_name="agency_user_groups",
        related_query_name="agency_user",
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        verbose_name=_("user permissions"),
        blank=True,
        help_text=_("Specific permissions for this user."),
        related_name="agency_user_permissions",
        related_query_name="agency_user",
    )

    class Meta:
        verbose_name = _("User")
        verbose_name_plural = _("Users")
        indexes = [
            models.Index(fields=["email"]),
            models.Index(fields=["username"]),
            models.Index(fields=["role"]),
        ]
        constraints = [
            UniqueConstraint(fields=["email"], name="unique_user_email"),
            UniqueConstraint(fields=["username"], name="unique_user_username"),
        ]

    def __str__(self):
        return f"{self.get_full_name()} ({self.email})"

    @property
    def is_author(self) -> bool:
        return self.role == UserRole.AUTHOR.value
