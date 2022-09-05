from rest_framework import serializers
from .models import Academic, Candidate, Experience, Resume
from drf_writable_nested.serializers import WritableNestedModelSerializer

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ('resume',)

class AcademicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Academic
        fields = ('current', 'date', 'course', 'institute')

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = ('current', 'fromDate', 'toDate', 'organization', 'position', 'description')

class CandidateSerializer(WritableNestedModelSerializer):
    # resume = ResumeSerializer()
    academic = AcademicSerializer(source='academic_set', many=True)
    experience = ExperienceSerializer(source='experience_set', many=True)
    
    class Meta:
        model = Candidate
        fields = '__all__'

class CandidateListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidate
        fields = ('id', 'name', 'gender', 'status', 'summary', 'status')