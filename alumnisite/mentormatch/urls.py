from django.urls import path
from .views import grad_form_data, mentor_form_data, login_data, matches_view

urlpatterns = [
    path('login/', login_data, name='login_data'),
    path('grad_profile/', grad_form_data, name='grad_form_data'), 
    path('mentor_profile/', mentor_form_data, name='mentor_form_data'), 
    path('matches/', matches_view, name='matches_view'),
]