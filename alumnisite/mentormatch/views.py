from rest_framework import status 
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.decorators import login_required
from django.contrib.auth.hashers import make_password, check_password
from django.http import JsonResponse
from .models import CurrentUser, GradData, MentorData
from .serializers import CurrentUserSerializer, GradDataSerializer, MentorDataSerializer

@api_view(['POST'])
def grad_form_data(request):
    serializer = CurrentUserSerializer(data=request.data)
    if serializer.is_valid():
        # Hash the password before saving
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        serializer.save()
        grad_data = GradData.objects.order_by('-id').first()
        mentor_matches = grad_data.get_mentor_matches()  
        return Response({'message': 'Successfully registered as grad', 'status': status.HTTP_201_CREATED, 'mentor_matches': mentor_matches})
    print(serializer.errors)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def mentor_form_data(request):
    serializer = CurrentUserSerializer(data=request.data)
    if serializer.is_valid():
        # Hash the password before saving
        serializer.validated_data['password'] = make_password(serializer.validated_data['password'])
        user = serializer.save()
        mentor_data = MentorData.objects.order_by('-id').first()
        grad_matches = mentor_data.get_grad_matches()
        return Response({'message': 'Successfully registered as mentor', 'status': status.HTTP_201_CREATED, 'grad_matches': grad_matches})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login_data(request): 
    email = request.data.get('email', '')
    password = request.data.get('password', '')
    user = CurrentUser.objects.filter(email=email).first()
    if user and check_password(password, user.password):
        refresh = RefreshToken.for_user(user)
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_200_OK)
    return Response({'error': 'Invalid email/password. Have you registered yet?'}, status=status.HTTP_401_UNAUTHORIZED)

@login_required
def matches_view(request):
    user = request.user
    try:
        grad_data = GradData.objects.get(user=user)
        mentor_matches = grad_data.get_mentor_matches()  
        return JsonResponse({
            'authenticated': True,
            'userType': 'grad',
            'matches': mentor_matches,
        })
    except GradData.DoesNotExist: 
            try:
                mentor_data = MentorData.objects.get(user=user)
                grad_matches = mentor_data.get_grad_matches()
                return JsonResponse({
                    'authenticated': True,
                    'userType': 'mentor',
                    'matches': grad_matches,
                })
            except MentorData.DoesNotExist:
                return JsonResponse({'authenticated': False, 'error': 'Please login first'})
