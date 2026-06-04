from rest_framework import serializers
from .models import Project, Contact, Education, Experience, Skill, PersonalInfo

class PersonalInfoSerializer(serializers.ModelSerializer):
    cv_url = serializers.SerializerMethodField()

    class Meta:
        model = PersonalInfo
        fields = '__all__'

    def get_cv_url(self, obj):
        if not obj.cv_file:
            return None
        request = self.context.get('request')
        if request:
            return request.build_absolute_uri(obj.cv_file.url)
        return obj.cv_file.url


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = '__all__'


class ExperienceSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Experience
        fields = '__all__'


class SkillSerializer(serializers.ModelSerializer):
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    proficiency_display = serializers.CharField(source='get_proficiency_level_display', read_only=True)
    
    class Meta:
        model = Skill
        fields = '__all__'

