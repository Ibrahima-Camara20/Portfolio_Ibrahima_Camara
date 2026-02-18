from django.contrib import admin
from .models import Project, Contact, Education, Experience, Skill

@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'technologies', 'created_at')


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('degree', 'university', 'start_year', 'graduation_year')
    list_filter = ('university',)
    search_fields = ('degree', 'university')


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('title', 'company', 'category', 'location', 'start_date', 'end_date', 'is_current')
    list_filter = ('is_current', 'category', 'company')
    search_fields = ('title', 'company', 'location')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'proficiency_level', 'order')
    list_filter = ('category', 'proficiency_level')
    search_fields = ('name',)
    ordering = ('category', 'order', 'name')

