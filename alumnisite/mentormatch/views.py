from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import GradData
from .serializers import GradDataSerializer

@api_view(['POST'])
def grad_form_data(request):
    serializer = GradDataSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)
