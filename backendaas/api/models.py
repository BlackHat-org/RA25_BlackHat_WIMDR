
from django.db import models

from django.contrib.auth.models import AbstractUser

from django.utils.translation import ugettext_lazy as _

from django.conf import settings
from datetime import date

class User(AbstractUser):
    
    username = models.CharField(max_length=50,blank=True, null=True,unique=True)
    email = models.EmailField(_('email address'), unique=True)
    owner_ph_no = models.CharField(max_length=10,default=0)
    dob = models.DateField(default=date.today)
    address = models.TextField(max_length=200,default=0)
    adhar = models.ImageField(upload_to='uploads', blank=True)
    native_name = models.CharField(max_length=20,default=0)
    phone_no = models.CharField(max_length=10,default=0)
    vehicle= models.CharField(max_length=50,default=0)
    vehicle_location=models.CharField(max_length=50,default=0)
    city = models.CharField(max_length=50,default=0)
    zip = models.CharField(max_length=6,default=0)
    vehicle_fuel= models.CharField(max_length=50,default=0)
    vehicle_pol_status= models.CharField(max_length=3,default=0)
    
    
    USERNAME_FIELD = 'email'
   
    REQUIRED_FIELDS = ['username', 'first_name', 'last_name'] 
  

    def __str__(self):
        return "{}".format(self.username)
    
    
class owner(models.Model):
    sensor1 = models.IntegerField()
    sensor2 = models.IntegerField()
    vehicle_location=models.CharField(max_length=50)
    vehicle=models.CharField(max_length=50)
    vehicle_fuel = models.CharField(max_length=100,default="0")
    vehicle_pol = models.CharField(max_length=3,default="0")
    
    def to_dict(self):
        return {'sensor1':self.sensor1,'sensor2':self.sensor2,'vehicle_location':self.vehicle_location,'vehicle':self.vehicle,'vehicle_fuel':self.vehicle_fuel,'vehicle_pol':self.vehicle_pol}
     
       

    