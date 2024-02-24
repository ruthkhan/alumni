from django.db import models
from django.contrib.auth.hashers import make_password

class CurrentUser(models.Model): 
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    userType = models.CharField(max_length=10) # 'grad' or 'mentor'

    def save(self, *args, **kwargs):
        # Hash the password before saving
        self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.email

class GradData(models.Model):
    user = models.OneToOneField(CurrentUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    gradDate = models.DateField()
    prevJob = models.CharField(max_length=255)
    mentorType = models.CharField(max_length=255)  
    mentorText = models.TextField()

    def get_mentor_matches(self):
        removed_matches = RemovedMatch.objects.filter(user=self.user).values_list('match_id', flat=True)
        mentor_data_list = MentorData.objects.all()
        mentor_matches = []
        for mentor_data in mentor_data_list:
            if mentor_data.id not in removed_matches: 
                match_score = calculate_match_score(self, mentor_data)
                mentor_matches.append({'mentor_id': mentor_data.id, 'name': mentor_data.name, 'match_score': match_score})
        # Sort mentor matches by match score in descending order
        mentor_matches = sorted(mentor_matches, key=lambda x: x['match_score'], reverse=True)[:3]
        return mentor_matches

    def __str__(self):
        return f'Profile for Grad {self.user.email}'
    
class MentorData(models.Model):
    user = models.OneToOneField(CurrentUser, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    gradDate = models.DateField()
    prevJob = models.CharField(max_length=255)
    currentJob = models.CharField(max_length=255)
    mentorType = models.CharField(max_length=255)  
    gradText = models.TextField()

    def get_grad_matches(self):
        removed_matches = RemovedMatch.objects.filter(user=self.user).values_list('match_id', flat=True)
        grad_data_list = GradData.objects.all()
        grad_matches = []
        for grad_data in grad_data_list:
            if grad_data.id not in removed_matches: 
                match_score = calculate_match_score(grad_data, self)
                grad_matches.append({'grad_id': grad_data.id, 'name': grad_data.name, 'match_score': match_score})
        # Sort grad matches by match score in descending order
        grad_matches = sorted(grad_matches, key=lambda x: x['match_score'], reverse=True)[:3]
        return grad_matches

    def __str__(self):
        return f'Profile for Mentor {self.user.email}'

class RemovedMatch(models.Model):
    user = models.ForeignKey(CurrentUser, on_delete=models.CASCADE)
    match_id = models.IntegerField()  # Store the ID of the removed match
    match_type = models.CharField(max_length=10)  # 'mentor' or 'grad'

def calculate_match_score(grad_data, mentor_data):
    match_score = 0    
    if grad_data.prevJob == mentor_data.prevJob:
        match_score += 1
    if grad_data.mentorType == mentor_data.mentorType:
        match_score += 1
    return match_score