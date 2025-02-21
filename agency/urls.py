from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from .views import (
    TripViewSet,
    TripPhotoViewSet,
    TripRequestListCreateViewSet, ReviewViewSet, SocialLinkViewSet,
)

router = routers.DefaultRouter()
router.register("trips", TripViewSet)
router.register("photos", TripPhotoViewSet)
router.register("request", TripRequestListCreateViewSet)
router.register("reviews", ReviewViewSet)
router.register("social-links", SocialLinkViewSet)

urlpatterns = [
    path("", include(router.urls)),
]

app_name = "agency"

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
