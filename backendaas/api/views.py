from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


from api.permissions import IsLoggedInUserOrAdmin, IsAdminUser
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer, ownerSerializer
from .AAS import pred
from . models import owner, User
from .location import actual,local


class ownerViewSet(viewsets.ModelViewSet):
    queryset = owner.objects.all()
    serializer_class = ownerSerializer

    def create(self,request,*args,**kwargs):
        viewsets.ModelViewSet.create(self,request,*args,**kwargs)
        ob = owner.objects.latest("id")
        print(ob.vehicle_location)
        di = {}
        di["Accelerometer"]=ob.Accelerometer
        di["DPS"]=ob.DPS
        di["Gyroscope"]=ob.Gyroscope
        di["BPS"] = ob.BPS
        print(di)
        vehicle_loc = ob.vehicle_location
        print(vehicle_loc)
        y= pred(di)
        
        if y==2 or y==1:
            obj = User.objects.get(vehicle= str(ob.vehicle))
            lat,lng= "",""
            flag=0
        # print("vehicle_location =  "+vehicle_location)
            for i in vehicle_loc:
                if i==',':
                    flag=1
                elif flag==1:
                    lng+=i
                if flag==0:
                    lat+=i
            vec_loc=actual(lng,lat)

            phone_no=obj.phone_no
            obj.accident = 1
       
        print("condition: "+str(y))
        owner.objects.latest("id").delete()  #deleting
        return Response({"status":"success","condition":y,"tmp":args})
        # return Response({"condition":y})


