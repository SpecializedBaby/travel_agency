from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import routers


router = routers.DefaultRouter()

urlpatterns = [
    path("", include(router.urls)),
]

app_name = "accounts"

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
