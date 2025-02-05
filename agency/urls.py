from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from agency.views import index


urlpatterns = [
    path("", index, name="index"),
]


app_name = "agency"

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
