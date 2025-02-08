from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from .views import TripViewSet, TripPhotoViewSet


router = routers.DefaultRouter()
router.register("trips", TripViewSet)
router.register("trip-photos", TripPhotoViewSet)

urlpatterns = [
    path("", include(router.urls)),
]


app_name = "agency"

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
