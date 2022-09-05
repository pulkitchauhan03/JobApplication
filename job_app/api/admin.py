from django.contrib import admin
from api.models import Candidate, Experience, Academic, Resume

admin.site.register(Candidate)
admin.site.register(Experience)
admin.site.register(Academic)
admin.site.register(Resume)