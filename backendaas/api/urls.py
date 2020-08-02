from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework import routers
from .views import ownerViewSet



router = routers.DefaultRouter()
router.register('owner', ownerViewSet)

urlpatterns = [
    path('', include(router.urls)),
     path('rest-auth/', include('rest_auth.urls')),
       
]
