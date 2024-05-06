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
                'ticket': ticket.id,
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
        ticket = get_object_or_404(Ticket, pk=ticket_id)
        event = ticket.event
        
        if request.user == user and request.user == ticket.user:        
            event.tickets_available += 1
            event.save()
            
            user.tickets.remove(ticket)
            
            return JsonResponse({'success': True, 'message': 'Booking deleted successfully'})
        else:
            return JsonResponse({'success': False, 'message': 'Unauthorized to delete this booking'})



'''
Логика, которую хочу реализовать если успею 
@permission_classes([IsAuthenticated])
@require_POST
def delete_booking(request, ticket_id):
    ticket = get_object_or_404(Ticket, pk=ticket_id)
    event = ticket.event
    
    # Check if the current user is the same as the user who made the booking
    if request.user == ticket.user:        
        # Increment tickets_available by 1
        event.tickets_available += 1
        event.save()
        
        # Remove the event from the user's registered events list
        request.user.registered_events.remove(event)
        
        # Delete the ticket
        ticket.delete()
        
        return JsonResponse({'success': True, 'message': 'Booking deleted successfully'})
    else:
        return JsonResponse({'success': False, 'message': 'Unauthorized to delete this booking'})


class TicketsAPIView(APIView):
    permission_classes = IsAuthenticated,

    def get(self, request):
        tickets = Ticket.objects.all()
        serializer = TicketSerializer(tickets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class TicketDetailAPIView(APIView):
    permission_classes = IsAuthenticated,

    def get_object(self, pk):
        try:
            return Ticket.objects.get(id=pk)
        except Ticket.DoesNotExist as error:
            raise Http404

    def get(self, request, pk=None):
        ticket = self.get_object(pk)
        serializer = TicketSerializer(ticket)
        return Response(serializer.data, status=status.HTTP_200_OK)
'''