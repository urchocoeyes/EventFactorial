from rest_framework.decorators import api_view, permission_classes
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.views.decorators.http import require_POST
from .models import *
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

from rest_framework import status
from django.shortcuts import Http404
from rest_framework.response import Response
from .serializers import *
from django.views.decorators.csrf import csrf_exempt

from rest_framework_simplejwt.views import TokenObtainPairView

# class MyTokenObtainPairView(TokenObtainPairView):
#     pass  

@csrf_exempt
@permission_classes([IsAuthenticated])
def register_user_for_event(request, event_id, user_id):
    if request.method == 'POST':
        event = get_object_or_404(Event, pk=event_id)
        user = get_object_or_404(User, pk=user_id)
        
        if event.tickets_available > 0:
            event.tickets_available -= 1
            event.save()
            
            ticket = Ticket(user=user, event=event)
            ticket.save()
            return JsonResponse({'success': True, 'message': 'Registration successful'})
        else:
            return JsonResponse({'success': False, 'message': 'No tickets available'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)


@api_view(['GET'])
def get_events(request):
    if request.method == 'GET':
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_event(request, event_id):
    try:
        event = Event.objects.get(id=event_id)
    except Event.DoesNotExist as error:
        return Response({'message': str(error)}, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'GET':
        serializer = EventSerializer(event)
        return Response(serializer.data, status=status.HTTP_200_OK)

def user_tickets(request, pk):
    user = get_object_or_404(User, pk=pk)
    tickets = user.tickets.all()

    unique_event_names = set()
    ticket_data = []

    for ticket in tickets:
        if ticket.event.title not in unique_event_names:
            unique_event_names.add(ticket.event.title)
            ticket_data.append({
                'ticket_id': ticket.id,
                'event_title': ticket.event.title,
                'event_description':ticket.event.description,
                'event_date': ticket.event.date,
                'event_location': ticket.event.location,
            })


    return JsonResponse(ticket_data, safe=False)

@csrf_exempt
@permission_classes([IsAuthenticated])
def delete_booking(request, pk, ticket_id):
    if request.method == 'POST':
        user = get_object_or_404(User, pk=pk)
        ticket = Ticket.objects.get(id=ticket_id)
        event = ticket.event
        
        event.tickets_available += 1
        event.save()
            
        ticket.delete()
        
        return JsonResponse({'success': True, 'message': 'Booking deleted successfully'})
            # return JsonResponse({'success': False, 'message': 'Unauthorized to delete this booking'})
    
    return JsonResponse({'success': False, 'message': 'Invalid request method'})

