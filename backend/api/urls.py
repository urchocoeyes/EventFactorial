from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view()),
    path('events/', get_events),
    path('events/<int:event_id>/', get_event),

    path('events/<int:event_id>/register/<int:user_id>/', register_user_for_event, name='register_user_for_event'),

    path('users/<int:pk>/tickets/', user_tickets)
]