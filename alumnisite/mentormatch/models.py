from django.db import models

# Create your models here.
class GradData(models.Model):
    name = models.CharField(max_length=255)
    gradDate = models.DateField()
    prevJob = models.CharField(max_length=255)
    mentorType = models.CharField(max_length=255)  
    mentorText = models.TextField()

    def __str__(self):
        return self.name
    
class MentorData(models.Model):
    name = models.CharField(max_length=255)
    gradDate = models.DateField()
    prevJob = models.CharField(max_length=255)
    currentJob = models.CharField(max_length=255)
    mentorType = models.CharField(max_length=255)  
    gradText = models.TextField()

    def __str__(self):
        return self.name