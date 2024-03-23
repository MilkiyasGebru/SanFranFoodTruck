import json
from datetime import datetime

from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from pymongo import MongoClient
from pymongo.server_api import ServerApi
import urllib.parse

username = urllib.parse.quote_plus('milkiyasgebru')
password = urllib.parse.quote_plus('Miki@0929054164')


# Create your views here.


def update_all(request):
    connection_string = f"mongodb+srv://{username}:{password}@sanfranciscofoodtruck.uwrcvez.mongodb.net/?retryWrites=true&w=majority&appName=SanFranciscoFoodTruck"
    client = MongoClient(connection_string, server_api=ServerApi('1'))
    db = client.SanFranFoodTruck
    response = {}

    trucks = db.foodtrucks.find({})
    for truck in trucks:
        coordinates = [truck["Longitude"], truck["Latitude"]]
        db.foodtrucks.update_one({"_id": truck["_id"]}, {"$set": {"coordinates": coordinates}})

    return JsonResponse("Finished updating all food trucks")


def get_nearest_food_trucks(request, lat, lng, limit=20):

    print(lat, lng,limit, " This are the coordinates of the nearest food truck")
    connection_string = f"mongodb+srv://{username}:{password}@sanfranciscofoodtruck.uwrcvez.mongodb.net/?retryWrites=true&w=majority&appName=SanFranciscoFoodTruck"
    client = MongoClient(connection_string, server_api=ServerApi('1'))
    db = client.SanFranFoodTruck.foodtrucks

    response = list(db.find({
        'coordinates': {
            '$nearSphere': {
                '$geometry': {
                    'type': "Point",
                    'coordinates': [float(lng), float(lat)]
                },
                '$maxDistance': 1000000000
            }
        }
    }).limit(limit))

    return JsonResponse(json.dumps(response, default=str), safe=False)


def get_food_truck_detail(request, id):
    connection_string = f"mongodb+srv://{username}:{password}@sanfranciscofoodtruck.uwrcvez.mongodb.net/?retryWrites=true&w=majority&appName=SanFranciscoFoodTruck"
    client = MongoClient(connection_string, server_api=ServerApi('1'))
    db = client.SanFranFoodTruck.foodtrucks
    truck = db.find_one({"locationid": int(id)})
    context = {
        'truck': truck
    }
    return render(request, 'food_truck_list.html', context)


def getHome(request):
    return render(request, 'main.html')
