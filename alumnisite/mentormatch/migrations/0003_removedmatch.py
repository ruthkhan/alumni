# Generated by Django 5.0.2 on 2024-02-24 02:10

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentormatch', '0002_rename_encryptedpw_currentuser_password_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='RemovedMatch',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('match_id', models.IntegerField()),
                ('match_type', models.CharField(max_length=10)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='mentormatch.currentuser')),
            ],
        ),
    ]
