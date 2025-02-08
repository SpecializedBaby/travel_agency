from rest_framework import generics, mixins, viewsets
from django.shortcuts import render

from .models import Trip
from .serializers import TripReviewSerializer, TripListSerializer


class TripViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Trip.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TripReviewSerializer
        return TripListSerializer
