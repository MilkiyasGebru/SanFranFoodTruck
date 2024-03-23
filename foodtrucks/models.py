from django.db import models


from bson import ObjectId


# Create your models here.


class FoodTruck(models.Model):
    locationid = models.IntegerField(primary_key=True)
    Applicant = models.CharField(max_length=255)
    FacilityType = models.CharField(max_length=255)
    cnn = models.IntegerField()
    LocationDescription = models.CharField(max_length=255)
    Address = models.CharField(max_length=255)
    blocklot = models.IntegerField()
    block = models.IntegerField()
    lot = models.IntegerField()
    permit = models.CharField(max_length=255)
    Status = models.CharField(max_length=255)
    FoodItems = models.CharField(max_length=255)
    X = models.FloatField()
    Y = models.FloatField()
    Latitude = models.FloatField()
    Longitude = models.FloatField()
    Schedule = models.TextField()
    dayshours = models.CharField(max_length=255)
    NOISent = models.CharField(max_length=255, blank=True, null=True)
    Approved = models.CharField(max_length=255, blank=True, null=True)
    Received = models.CharField(max_length=255, blank=True, null=True)
    PriorPermit = models.CharField(max_length=255, blank=True, null=True)
    ExpirationDate = models.DateField(blank=True, null=True)
    Location = models.CharField(max_length=255)
    Fire_Prevention_Districts = models.IntegerField()
    Police_Districts = models.IntegerField()
    Supervisor_Districts = models.IntegerField()
    Zip_Codes = models.IntegerField()
    Neighborhoods_old = models.IntegerField()




    def __str__(self):
        return f"{self.Applicant} - {self.locationid}"


