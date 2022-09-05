from django.db import models

class Candidate(models.Model):
    GENDER_CHOICES = (
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    )

    STATUS_CHOICES = (
        ('AP', 'Applied'),
        ('AC', 'Accepted'),
        ('RE', 'Rejected'),
    )
    
    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=200)
    phone = models.CharField(max_length=10)
    gender = models.CharField(max_length=10, choices=GENDER_CHOICES)
    summary = models.CharField(max_length=1000, null=True)
    # academic
    # professional
    status = models.CharField(max_length=100, choices=STATUS_CHOICES, default='applied')
    # resume

    def __str__(self):
        return self.name

class Academic(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    current = models.BooleanField(default=False)
    date = models.DateField(null=True)
    course = models.CharField(max_length=200)
    institute = models.CharField(max_length=200)

class Experience(models.Model):
    candidate = models.ForeignKey(Candidate, on_delete=models.CASCADE)
    current = models.BooleanField(default=False)
    fromDate = models.DateField()
    toDate = models.DateField(null=True)
    organization = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    description = models.CharField(max_length=1000, null=True)

class Resume(models.Model):
    candidate = models.OneToOneField(Candidate, on_delete=models.CASCADE, null=True)
    resume = models.FileField(upload_to='uploads/')