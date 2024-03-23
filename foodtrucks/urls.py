from django.urls import path
from .views import get_nearest_food_trucks, get_food_truck_detail, getHome
urlpatterns = [

    path('getClosest/<str:lat>/<str:lng>', get_nearest_food_trucks, name=''),
    path('truck/<str:id>/', get_food_truck_detail, name='update_all'),
    path('', getHome, name='home')
]

