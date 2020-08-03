from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from twilio.rest import Client
from .location import local,actual

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
        # vehicle_loc = ob.vehicle_location
        # print(vehicle_loc)
        y= pred(di)
        
        vehicle_location = ob.vehicle_location
        lat,lng= "",""
        flag=0
        print("vehicle_location =  "+vehicle_location)
        for i in vehicle_location:
            if i==',':
                flag=1
            elif flag==1:
                lng+=i
            if flag==0:
                lat+=i
            
        print("lng = "+lng)
        print("lat = "+lat)
        
        def calling(h1_add,h1_name,vec_loc):
        
            account_sid = 'AC0b6be55e2bb2b89e7ef65d0ec1badbfd'
            auth_token = '9cb800807474c4fcf69ee3ad1de3877f'
            client = Client(account_sid, auth_token)
            mg = "this... is..   an  ..  accidental    Alert  ... System ..    from    .....   Black  Hats .........."
            msg = "<Response><Say>"+mg+" accident  taken place at  "+str(vec_loc)+" .... aapki car  ka accident   "+str(vec_loc)+"   hua hai  "+"</Say></Response>"

            call = client.calls.create(
                                    twiml= msg,
                                    to='+916265176283',
                                    from_='+12057406198'
                                    )
            mosg = mg+" accident  taken place at "+ str(vec_loc) + " the nearest hosspital is "+str(h1_name)+ "  Address  = "+ str(h1_add) + "...." + "https://www.google.com/maps/search/?api=1&query=21.1562462,81.3418322"
            message = client.messages \
                .create(
                    body=mosg,
                    from_='+12057406198',
                    to='+916265176283'
                )

        if y==2 or y==1:
            obj = User.objects.get(vehicle= str(ob.vehicle))
            print(obj.first_name)
            # vec_loc = ob.vehicle_location
            vec_loc = actual(lng,lat)
            phone_no=obj.phone_no
            hos_one,hos_two=local(lng,lat)
            h1_add = hos_one[1]
            h1_name = hos_one[0]

            # print(h_name,h_add)
            print(phone_no)
            print(obj.accident)
            obj.accident = 1
            obj.save()
            print(obj.accident)
            calling(h1_add,h1_name,vec_loc)
       
        print("condition: "+str(y))
        owner.objects.latest("id").delete()  #deleting
        # return Response({"status":"success","condition":y,"tmp":args})
        return Response({"condition":y})

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

