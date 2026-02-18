from rest_framework import viewsets
from .models import Project, Contact, Education, Experience, Skill
from .serializers import ProjectSerializer, ContactSerializer, EducationSerializer, ExperienceSerializer, SkillSerializer
from .permissions import IsAdminOrReadOnly

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all().order_by('-created_at')
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all().order_by('-created_at')
    serializer_class = ContactSerializer


class EducationViewSet(viewsets.ModelViewSet):
    queryset = Education.objects.all().order_by('-start_year')
    serializer_class = EducationSerializer
    permission_classes = [IsAdminOrReadOnly]


class ExperienceViewSet(viewsets.ModelViewSet):
    queryset = Experience.objects.all().order_by('-start_date')
    serializer_class = ExperienceSerializer
    permission_classes = [IsAdminOrReadOnly]


class SkillViewSet(viewsets.ModelViewSet):
    queryset = Skill.objects.all().order_by('category', 'order', 'name')
    serializer_class = SkillSerializer
    permission_classes = [IsAdminOrReadOnly]

