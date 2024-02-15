from django.db import models

# Create your models here.
class GradData(models.Model):
    gradName = models.CharField(max_length=255)
    gradDate = models.DateField()
    prevJob = models.CharField(max_length=255)
    mentorText = models.TextField()

    def __str__(self):
        return self.name