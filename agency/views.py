from rest_framework import viewsets, status
from django.shortcuts import render

from agency.models import Trip
from agency.serializers import TripSerializer


def index(request):
    return render(request, "agency/index.html")


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
