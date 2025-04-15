from django.db.models import Prefetch, Count
from django.db.models import OuterRef, Subquery

from rest_framework import mixins, viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .models import Trip, TripPhoto, TripRequest, TripDate, ProgramByDay, FAQ, IncludedFeature, Review, Sociallink
from .serializers import TripRetrieveSerializer, TripListSerializer, TripPhotoSerializer, TripRequestSerializer, \
    CountrySerializer, ReviewSerializer, SocialLinkSerializer


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripListSerializer

    def get_serializer_class(self):
        # Use TripRetrieveSerializer for the retrieve action
        if self.action in ['retrieve', 'create', 'partial_update', 'update']:
            return TripRetrieveSerializer
        return TripListSerializer

    def get_queryset(self):
        queryset = self.queryset
        prefetch_fields = [
            Prefetch(
                "photos",
                queryset=TripPhoto.objects.filter(type="slide"),
                to_attr="slide_photos",
            ),
            Prefetch(
                "trip_dates",
                queryset=TripDate.objects.all(),
                to_attr="trip_dates_list",
            ),

        ]


        # Add additional prefetch fields for the retrieve action
        if self.action == "retrieve":
            prefetch_fields.extend([
                Prefetch("program_by_days", ProgramByDay.objects.all(),),
                Prefetch("included_features", IncludedFeature.objects.all(),),
                Prefetch("faqs", FAQ.objects.all(),),
            ])

        return queryset.prefetch_related(*prefetch_fields)

    @action(detail=False, methods=['GET'], url_path=r"countries/(?P<country_code>\w+)")
    def country_trips(self, request, country_code):
        """
        Custom action to fetch trips for a specific country.
        """
        queryset = self.get_queryset()

        trips = queryset.filter(country=country_code)

        # Handle case where no trips are found
        if not trips.exists():
            return Response({"error": "No trips found for this country"}, status=404)

        # Serialize and return trips
        serializer = TripListSerializer(trips, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], url_path='countries')
    def list_countries(self, request):
        """
        Returns a list of all unique countries with a random gallery photo.
        """
        # Subquery to fetch a random gallery photo for each country
        random_photo_subquery = TripPhoto.objects.filter(
            trip__country=OuterRef('country'),
            type='gallery'
        ).order_by('?').values('photo')[:1]

        # Get all unique country codes with a random photo
        countries = Trip.objects.values('country').annotate(
            photo=Subquery(random_photo_subquery)
        ).distinct()

        # Serialize the data
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)


class TripRequestListCreateViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = TripRequest.objects.all().select_related() # Join with trip model slug field
    serializer_class = TripRequestSerializer

    def perform_create(self, serializer):
        trip_slug = self.request.data.get("trip")
        trip = Trip.objects.get(slug=trip_slug)
        serializer.save(trip=trip)

    def create(self, request, *args, **kwargs):
        trip_slug = self.request.data.get("trip")
        if not trip_slug:
            return Response({"error": "Trip slug is required"}, status=status.HTTP_400_BAD_REQUEST)

        return super().create(request, *args, **kwargs)


class TripPhotoViewSet(viewsets.ModelViewSet):
    queryset = TripPhoto.objects.all()
    serializer_class = TripPhotoSerializer

    @action(detail=False, methods=['GET'], url_path="main-photos")
    def main_photos(self, request):
        main_photos = TripPhoto.objects.all().filter(type="main") # Grouping by trip_id
        serializer = self.get_serializer(main_photos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], url_path="gallery-photos")
    def gallery_photos(self, request):
        gallery_photos = TripPhoto.objects.all().filter(type="gallery")
        serializer = self.get_serializer(gallery_photos, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['GET'], url_path="slide-photos")
    def slide_photos(self, request):
        slide_photos = TripPhoto.objects.all().filter(type="slide")
        serializer = self.get_serializer(slide_photos, many=True)
        return Response(serializer.data)


class ReviewViewSet(viewsets.GenericViewSet, mixins.ListModelMixin, mixins.CreateModelMixin):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class SocialLinkViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    queryset = Sociallink.objects.all()
    serializer_class = SocialLinkSerializer
