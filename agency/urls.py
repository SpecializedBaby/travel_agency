from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers

from agency.views import index

from .views import TripViewSet


router = routers.DefaultRouter()
router.register(r'trips', TripViewSet)


urlpatterns = [
    path("api/", include(router.urls)),
]


app_name = "agency"

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
