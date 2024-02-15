from django.urls import path
from .views import grad_form_data

urlpatterns = [
    path('grad_profile/', grad_form_data, name='grad_form_data'), 
]