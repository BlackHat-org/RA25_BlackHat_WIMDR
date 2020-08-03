from rest_framework import serializers
from api.models import  User,owner



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = "__all__"
        
class ownerSerializer(serializers.ModelSerializer):

     
    class Meta:
        model = owner
        fields = ('Accelerometer','DPS','Gyroscope','BPS','vehicle_location','vehicle','vehicle_fuel','vehicle_pol')