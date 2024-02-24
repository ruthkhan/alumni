from django.urls import path
from .views import grad_form_data, mentor_form_data, login_data, remove_match_view

urlpatterns = [
    path('login/', login_data, name='login_data'),
    path('grad_profile/', grad_form_data, name='grad_form_data'), 
    path('mentor_profile/', mentor_form_data, name='mentor_form_data'), 
    path('remove-match/', remove_match_view, name='remove_match_view'), 
]