import sys
from django.core.management.base import BaseCommand
from django.http import HttpRequest
from foodtrucks.views import get_nearest_food_trucks
import json

class Command(BaseCommand):
    help = 'Retrieve nearest food trucks from the command line'

    def add_arguments(self, parser):
        parser.add_argument('lat', type=float, help='Latitude of the location')
        parser.add_argument('lng', type=float, help='Longitude of the location')
        parser.add_argument('limit', type=int,help='Limit the number of food trucks to be displayed')

    def handle(self, *args, **kwargs):
        lat = kwargs['lat']
        lng = kwargs['lng']
        limit = kwargs['limit']
        request = HttpRequest()
        request.method = 'GET'
        response = get_nearest_food_trucks(request, lat=lat, lng=lng, limit=limit)
        response = json.loads(response.content)
        self.stdout.write(response)
