from rest_framework import serializers
from .models import GradData

class GradDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = GradData
        fields = '__all__'
