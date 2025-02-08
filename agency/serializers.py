from django.conf.urls.static import static
from rest_framework import serializers
from .models import Review, Sociallink, FAQ, TripRequest, TripDate, IncludedFeature, ProgramByDay, TripPhoto, Trip


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'avatar', 'text', 'created_at']
        read_only_fields = ['created_at']


class SociallinkSerializer(serializers.ModelSerializer):
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

    def get_available_spots(self, obj):
        return obj.trip.group_size - obj.current_members

    def get_formatted_start_date(self, obj):
        return obj.start_date.strftime('%d %b, %Y')

    def get_formatted_end_date(self, obj):
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
        fields = ['id', 'photo', 'type', 'caption', ]


class TripReviewSerializer(serializers.ModelSerializer):
    photos = TripPhotoSerializer(many=True, read_only=True)
    program_by_days = ProgramByDaySerializer(many=True, read_only=True)
    included_features = IncludedFeatureSerializer(many=True, read_only=True)
    trip_dates = TripDateSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = [
            'id', 'status', 'title', 'country', 'welcome_message', 'duration_days', 'accommodation',
            'bonus', 'ask_title', 'description', 'created_at', 'photos', 'program_by_days',
            'included_features', 'trip_dates', 'group_size', 'leaders',
        ]

class TripListSerializer(TripReviewSerializer):
    photo = serializers.SerializerMethodField()

    class Meta:
        model = Trip
        fields = ['id', 'photo', 'status', 'title', 'country', 'duration_days', 'group_size', 'trip_dates']

    @staticmethod
    def get_photo(obj):
        slide_photos = obj.photos.filter(type='slide')
        random_photo = slide_photos.order_by('?').first()
        return TripPhotoSerializer(random_photo).data if random_photo else None


class TripRequestSerializer(serializers.ModelSerializer):
    trip = TripListSerializer(read_only=True)
    class Meta:
        model = TripRequest
        fields = ['id', 'trip', 'name', 'phone', 'email', 'preferred_contact', 'notes', 'created_at', ]
        read_only_fields = ['created_at', ]



