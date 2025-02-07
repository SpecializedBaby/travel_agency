from rest_framework import serializers
from .models import Review, Sociallink, FAQ, TripRequest, TripDate, IncludedFeature, ProgramByDay, TripPhoto, Trip


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['name', 'avatar', 'text', 'created_at']
        read_only_fields = ['created_at']


class SociallinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sociallink
        fields = ['name', 'icon', 'url', ]


class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = ['question', 'answer', ]


class TripDateSerializer(serializers.ModelSerializer):
    available_spots = serializers.SerializerMethodField()
    formatted_start_date = serializers.SerializerMethodField()
    formatted_end_date = serializers.SerializerMethodField()

    class Meta:
        model = TripDate
        fields = ['formatted_start_date', 'formatted_end_date', 'available_spots', 'price', 'current_members', ]

    def get_available_spots(self, obj):
        return obj.trip.group_size - obj.current_members

    def get_formatted_start_date(self, obj):
        return obj.start_date.strftime('%d %b, %Y')

    def get_formatted_end_date(self, obj):
        return obj.end_date.strftime('%d %b, %Y')

class IncludedFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncludedFeature
        fields = ['title', 'description', 'icon']


class ProgramByDaySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramByDay
        fields = ['day_number', 'title', 'description', 'accommodation', 'meal_plan', ]


class TripPhotoSerializer(serializers.ModelSerializer):
    class Meta:
        model = TripPhoto
        fields = ['photo', 'type', 'caption', ]


class TripSerializer(serializers.ModelSerializer):
    photos = TripPhotoSerializer(many=True, read_only=True)
    program_by_days = ProgramByDaySerializer()
    included_features = IncludedFeatureSerializer(many=True, read_only=True)
    trip_dates = TripDateSerializer(many=True, read_only=True)

    class Meta:
        model = Trip
        fields = [
            'id', 'status', 'title', 'country', 'welcome_message', 'duration_days', 'accommodation',
            'bonus', 'ask_title', 'description', 'created_at', 'photos', 'program_by_days',
            'included_features', 'trip_dates', 'group_size', 'leaders',
        ]


class TripRequestSerializer(serializers.ModelSerializer):
    trip = TripSerializer(read_only=True)
    class Meta:
        model = TripRequest
        fields = ['trip', 'name', 'phone', 'email', 'preferred_contact', 'notes', 'created_at', ]
        read_only_fields = ['created_at', ]



