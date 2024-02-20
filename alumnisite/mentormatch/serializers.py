from rest_framework import serializers
from .models import GradData
from .models import MentorData

class GradDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradData
        fields = '__all__'

class MentorDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorData
        fields = '__all__'