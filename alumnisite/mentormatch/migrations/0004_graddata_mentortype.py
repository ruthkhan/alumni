# Generated by Django 5.0.2 on 2024-02-15 23:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mentormatch', '0003_rename_formdata_mentordata'),
    ]

    operations = [
        migrations.AddField(
            model_name='graddata',
            name='mentorType',
            field=models.CharField(default='Career Advice', max_length=255),
            preserve_default=False,
        ),
    ]