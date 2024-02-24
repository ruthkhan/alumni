from rest_framework import serializers
from .models import GradData, MentorData, CurrentUser, RemovedMatch

class GradDataSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CurrentUser.objects.all(), required=False)
    class Meta:
        model = GradData
        fields = '__all__'

class MentorDataSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CurrentUser.objects.all(), required=False)
    class Meta:
        model = MentorData
        fields = '__all__'

class CurrentUserSerializer(serializers.ModelSerializer): 
    grad_data = GradDataSerializer(required=False)
    mentor_data = MentorDataSerializer(required=False)
    
    class Meta: 
        model = CurrentUser
        fields = ['id', 'email', 'password', 'userType', 'grad_data', 'mentor_data']
    
    def create(self, validated_data):
        userType = validated_data['userType']
        grad_data = validated_data.pop('grad_data', None)
        mentor_data = validated_data.pop('mentor_data', None)
        user = CurrentUser.objects.create(**validated_data)
        if userType == 'grad' and grad_data:
            GradData.objects.create(user=user, **grad_data)
        elif userType == 'mentor' and mentor_data:
            MentorData.objects.create(user=user, **mentor_data)
        return user

class RemovedMatchSerializer(serializers.ModelSerializer):
    class Meta:
        model = RemovedMatch
        fields = ['id', 'user', 'match_id', 'match_type']