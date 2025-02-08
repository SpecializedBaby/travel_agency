from collections import defaultdict
from pickle import FALSE

from django.core.serializers import serialize
from rest_framework import generics, mixins, viewsets
from django.shortcuts import render
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Trip, TripPhoto
from .serializers import TripReviewSerializer, TripListSerializer, TripPhotoSerializer


class TripPhotoViewSet(viewsets.ModelViewSet):
    queryset = TripPhoto.objects.all()
    serializer_class = TripPhotoSerializer

    @action(detail=False, methods=['GET'])
    def main_photos(self, request):
        main_photos = TripPhoto.objects.all().filter(type="main") # Grouping by trip_id
        serializer = self.get_serializer(main_photos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def gallery_photos(self, request):
        gallery_photos = TripPhoto.objects.all().filter(type="gallery")
        serializer = self.get_serializer(gallery_photos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'])
    def slide_photos(self, request):
        slide_photos = TripPhoto.objects.all().filter(type="slide")
        serializer = self.get_serializer(slide_photos, many=True)
        return Response(serializer.data)


class TripViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Trip.objects.all()

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return TripReviewSerializer
        return TripListSerializer
