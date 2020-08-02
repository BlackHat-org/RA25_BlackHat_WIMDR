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



class ownerViewSet(viewsets.ModelViewSet):
    queryset = owner.objects.all()
    serializer_class = ownerSerializer
