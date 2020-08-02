from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
     path('rest-auth/', include('rest_auth.urls')),
       
]
