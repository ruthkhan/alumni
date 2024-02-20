from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GradData, MentorData
from .serializers import GradDataSerializer, MentorDataSerializer

@api_view(['POST'])
def grad_form_data(request):
    serializer = GradDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        grad_data = GradData.objects.order_by('-id').first()
        mentor_matches = get_mentor_matches(grad_data)
        return Response({'message': 'Form submitted successfully', 'mentor_matches': mentor_matches})
    return Response(serializer.errors, status=400)

@api_view(['POST'])
def mentor_form_data(request):
    serializer = MentorDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        mentor_data = MentorData.objects.order_by('-id').first()
        grad_matches = get_grad_matches(mentor_data)
        return Response({'message': 'Form submitted successfully', 'grad_matches': grad_matches})
    return Response(serializer.errors, status=400)

def get_mentor_matches(grad_data):
    mentor_data_list = MentorData.objects.all()
    mentor_matches = []
    
    for mentor_data in mentor_data_list:
        match_score = calculate_match_score(grad_data, mentor_data)
        mentor_matches.append({'mentor_id': mentor_data.id, 'name': mentor_data.name, 'match_score': match_score})
    
    # Sort mentor matches by match score in descending order
    mentor_matches = sorted(mentor_matches, key=lambda x: x['match_score'], reverse=True)[:3]

    return mentor_matches

def get_grad_matches(mentor_data):
    grad_data_list = GradData.objects.all()
    grad_matches = []
    
    for grad_data in grad_data_list:
        match_score = calculate_match_score(grad_data, mentor_data)
        grad_matches.append({'grad_id': grad_data.id, 'name': grad_data.name, 'match_score': match_score})
    
    # Sort grad matches by match score in descending order
    grad_matches = sorted(grad_matches, key=lambda x: x['match_score'], reverse=True)[:3]

    return grad_matches

def calculate_match_score(grad_data, mentor_data):
    # Define your matching logic based on "prevJob" and "mentorType" fields
    match_score = 0    
    if grad_data.prevJob == mentor_data.prevJob:
        match_score += 1
    if grad_data.mentorType == mentor_data.mentorType:
        match_score += 1
    
    return match_score