from rest_framework import status 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from django.http import JsonResponse
from .models import CurrentUser, GradData, MentorData, RemovedMatch
from .serializers import CurrentUserSerializer

@api_view(['POST'])
def grad_form_data(request):
    serializer = CurrentUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        grad_data = GradData.objects.order_by('-id').first()
        mentor_matches = grad_data.get_mentor_matches()  
        return Response({
            'message': 'Successfully registered as grad', 
            'status': status.HTTP_201_CREATED, 
            'mentor_matches': mentor_matches, 
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def mentor_form_data(request):
    serializer = CurrentUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        mentor_data = MentorData.objects.order_by('-id').first()
        grad_matches = mentor_data.get_grad_matches()
        return Response({
            'message': 'Successfully registered as mentor', 
            'status': status.HTTP_201_CREATED, 
            'grad_matches': grad_matches, 
        })
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_data(request): 
    email = request.data.get('email', '')
    password = request.data.get('password', '')
    user = CurrentUser.objects.filter(email=email).first()
    if user and check_password(password, user.password):
        if user.userType == 'grad': 
            grad_data = GradData.objects.get(user=user)
            mentor_matches = grad_data.get_mentor_matches()  
            return Response({
                'userId': user.id, 
                'userType': 'grad',
                'mentor_matches': mentor_matches, 
                }, status=status.HTTP_200_OK)
        elif user.userType == 'mentor': 
            mentor_data = MentorData.objects.get(user=user)
            grad_matches = mentor_data.get_grad_matches()  
            return Response({
                'userId': user.id, 
                'userType': 'mentor', 
                'grad_matches': grad_matches, 
                }, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid email/password. Have you registered yet?'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
def remove_match_view(request):
    user_id = request.data.get('userId')
    match_id = request.data.get('matchId')
    user_type = request.data.get('userType')
    user = CurrentUser.objects.filter(id=user_id).values_list('id', flat=True)
    match_type = 'mentor'
    if user_type == 'mentor': 
        match_type = 'grad'
    # Check if the match has already been removed
    if not RemovedMatch.objects.filter(match_id=match_id).exists():
        # If not, add it to the RemovedMatch model
        RemovedMatch.objects.create(user_id=user, match_id=match_id, match_type=match_type)
    return JsonResponse({'message': 'Match removed successfully'})