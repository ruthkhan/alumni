# Generated by Django 5.0.2 on 2024-02-15 21:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mentormatch', '0002_formdata'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='FormData',
            new_name='MentorData',
        ),
    ]
