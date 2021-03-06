# Generated by Django 3.0.8 on 2020-08-02 06:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='owner',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Accelerometer', models.IntegerField()),
                ('DPS', models.IntegerField()),
                ('BPS', models.IntegerField()),
                ('Gyroscope', models.IntegerField()),
                ('vehicle_location', models.CharField(max_length=50)),
                ('vehicle', models.CharField(max_length=50)),
                ('vehicle_fuel', models.CharField(default='0', max_length=100)),
                ('vehicle_pol', models.CharField(default='0', max_length=3)),
            ],
        ),
    ]
