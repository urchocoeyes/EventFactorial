from django.db import models
from django.contrib.auth.models import User


class Event(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    date = models.DateTimeField()
    location = models.CharField(max_length=100)
    tickets_available = models.IntegerField()

    class Meta:
        verbose_name = 'Event'
        verbose_name_plural = 'Events'

    def __str__(self):
        return f'{self.id}: {self.title}, {self.date}, {self.tickets_available}'

    def to_json_format(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'date': self.date,
            'location': self.location,
            'tickets_available': self.tickets_available
        }

class Ticket(models.Model):
    event = models.ForeignKey(Event, related_name='tickets', on_delete=models.CASCADE)
    user = models.ForeignKey(User, related_name='tickets', on_delete=models.CASCADE)  # User who is registered

    class Meta:
        verbose_name = 'Ticket'
        verbose_name_plural = 'Tickets'

    def __str__(self):
        return f'{self.id}: {self.event}, {self.user}'

    def to_json_format(self):
        return {
            'id': self.id,
            'event': self.event,
            'user': self.user,
        }