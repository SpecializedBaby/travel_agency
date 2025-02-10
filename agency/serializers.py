from rest_framework import serializers
from .models import Review, Sociallink, FAQ, TripRequest, TripDate, IncludedFeature, ProgramByDay, TripPhoto, Trip


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'avatar', 'text', 'created_at']
        read_only_fields = ['created_at']


class SocialLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sociallink
        fields = ['id', 'name', 'icon', 'url', ]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['id', 'question', 'answer', ]


class TripDateSerializer(serializers.ModelSerializer):
    available_spots = serializers.SerializerMethodField()
    formatted_start_date = serializers.SerializerMethodField()
    formatted_end_date = serializers.SerializerMethodField()

    class Meta:
        model = TripDate
        fields = ['id', 'formatted_start_date', 'formatted_end_date', 'available_spots', 'price', 'current_members', ]

    @staticmethod
    def get_available_spots(obj):
        return obj.trip.group_size - obj.current_members

    @staticmethod
    def get_formatted_start_date(obj):
        return obj.start_date.strftime('%d %b, %Y')

    @staticmethod
    def get_formatted_end_date(obj):
        return obj.end_date.strftime('%d %b, %Y')


class IncludedFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncludedFeature
        fields = ['id', 'title', 'description', 'icon']


class ProgramByDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramByDay
        fields = ['id', 'day_number', 'title', 'description', 'accommodation', 'meal_plan', ]


class TripPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripPhoto
        fields = ['photo', ]


class TripRetrieveSerializer(serializers.ModelSerializer):
    photos = TripPhotoSerializer(many=True, read_only=True)
    program_by_days = ProgramByDaySerializer(many=True, read_only=True)
    included_features = IncludedFeatureSerializer(many=True, read_only=True)
    trip_dates = TripDateSerializer(many=True, read_only=True)
    faqs = FAQSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = [
            'id', 'status', 'title', 'country', 'welcome_message', 'duration_days', 'accommodation',
            'bonus', 'ask_title', 'description', 'created_at', 'photos', 'program_by_days',
            'included_features', 'trip_dates', 'group_size', 'leaders', 'faqs',
        ]

class TripListSerializer(serializers.ModelSerializer):
    photo = serializers.SerializerMethodField()
    start_date = serializers.SerializerMethodField()
    price = serializers.SerializerMethodField(read_only=True)
    country = serializers.SerializerMethodField()
    available_spots = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id', 'start_date', 'price', 'available_spots', 'photo', 'status', 'title', 'country', 'duration_days', 'group_size', ]

    @staticmethod
    def get_photo(obj):
        slide_photos = getattr(obj, 'slide_photos', [])
        slide_photo = slide_photos[0] if slide_photos else None
        return slide_photo.photo.url if slide_photo else None

    @staticmethod
    def get_price(obj):
        trip_dates = getattr(obj, 'trip_dates_list', [])
        price = trip_dates[0].price
        return price if price else 0.00

    @staticmethod
    def get_start_date(obj):
        trip_dates = getattr(obj, 'trip_dates_list', [])
        return trip_dates[0].start_date.strftime('%d %b, %Y') if trip_dates else None

    @staticmethod
    def get_country(obj):
        return obj.get_country_display()

    @staticmethod
    def get_available_spots(obj):
        trip_dates = getattr(obj, 'trip_dates_list', [])
        return trip_dates[0].available_spots if trip_dates else None


class TripRequestSerializer(serializers.ModelSerializer):
    trip = serializers.SlugRelatedField(queryset=Trip.objects.all(), slug_field='slug', )

    class Meta:
        model = TripRequest
        fields = ['trip', 'name', 'phone', 'email', 'preferred_contact', 'notes', 'created_at', ]
        read_only_fields = ['created_at', ]


class CountrySerializer(serializers.Serializer):
    country = serializers.CharField()
    country_name = serializers.SerializerMethodField()
    photo = serializers.CharField()

    @staticmethod
    def get_country_name(obj):
        return dict(Trip.COUNTRY_CHOICES).get(obj["country"], obj["country"])
