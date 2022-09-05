from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Candidate, Resume
from .serializers import CandidateSerializer, CandidateListSerializer, ResumeSerializer
import base64
from django.core.files.base import ContentFile

@api_view(['GET'])
def getList(request):
    candidates = Candidate.objects.all()
    serializer = CandidateListSerializer(candidates, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getDetails(request, pk):
    candidate = Candidate.objects.get(id = pk)
    serializer = CandidateSerializer(candidate)
    return Response(serializer.data)

@api_view(['POST'])
def newCandidate(request):
    serializer = CandidateSerializer(data = request.data)
    resume_file = base64.b64decode(request.data['selectedFile'][28:].encode('utf-8'))
    
    if serializer.is_valid(raise_exception=True):
        serializer.save()
        candidate = Candidate.objects.get(id=serializer.data['id'])
        filename = "Resume_" + str(candidate.id) + ".pdf"
        pdf_content = ContentFile(resume_file, filename)
        Resume.objects.create(candidate=candidate, resume=pdf_content)
        
    return Response(serializer.data)

@api_view(['GET'])
def getResume(request, pk):
    candidate = Candidate.objects.get(id=pk)
    pdf_file_in_bytes = base64.b64encode(candidate.resume.resume.read())
    pdf_file_name = "resume-"+candidate.name
    response = HttpResponse(
        pdf_file_in_bytes,
        headers={'Content-Disposition': f'attachment; filename={pdf_file_name}'},
        content_type='application/pdf'
    )
    return response

@api_view(['DELETE'])
def deleteCandidate(request, pk):
    candidate = Candidate.objects.get(id=pk)
    candidate.delete()
    return HttpResponse(status=200)

@api_view(['PATCH'])
def updateStatus(request, pk):
    candidate = Candidate.objects.get(id=pk)
    if candidate.status == request.data['status']:
        candidate.status = 'AP'
    else:
        candidate.status = request.data['status']
    candidate.save()
    serializer = CandidateListSerializer(candidate)
    return Response(serializer.data)
    
