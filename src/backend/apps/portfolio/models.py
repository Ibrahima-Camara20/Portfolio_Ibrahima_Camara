from django.db import models

class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=300)
    github_link = models.URLField()
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Contact(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Education(models.Model):
    university = models.CharField(max_length=200, help_text="Nom de l'université")
    degree = models.CharField(max_length=200, help_text="Nom de la formation")
    start_year = models.IntegerField(help_text="Année de début")
    graduation_year = models.IntegerField(blank=True, null=True, help_text="Année d'obtention (laisser vide si en cours)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-start_year']
        verbose_name = "Formation"
        verbose_name_plural = "Formations"

    def __str__(self):
        return f"{self.degree} - {self.university}"



class Experience(models.Model):
    CATEGORY_CHOICES = [
        ('student_job', 'Job Étudiant'),
        ('internship', 'Stage'),
        ('permanent', 'CDI'),
        ('temporary', 'CDD'),
        ('freelance', 'Freelance'),
    ]
    
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES, default='student_job', help_text="Type d'expérience")
    title = models.CharField(max_length=200, help_text="Intitulé du poste")
    company = models.CharField(max_length=200, help_text="Nom de l'entreprise")
    location = models.CharField(max_length=100, help_text="Ville, Pays")
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True, help_text="Laisser vide si poste actuel")
    description = models.TextField(help_text="Description des responsabilités")
    is_current = models.BooleanField(default=False, help_text="Poste actuel")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-start_date']
        verbose_name = "Expérience"
        verbose_name_plural = "Expériences"

    def __str__(self):
        return f"{self.title} - {self.company}"



class Skill(models.Model):
    CATEGORY_CHOICES = [
        ('languages', 'Langages'),
        ('langues', 'Langues'),
        ('methodes', 'Méthodes'),
        ('ai_ml', 'Intelligence Artificielle & Machine Learning'),
        ('web_frameworks', 'Frameworks Web'),
        ('databases', 'Bases de Données'),
        ('tools_devops', 'Outils & DevOps'),
    ]
    
    PROFICIENCY_CHOICES = [
        ('beginner', 'Débutant'),
        ('intermediate', 'Intermédiaire'),
        ('advanced', 'Avancé'),
        ('expert', 'Expert'),
    ]

    name = models.CharField(max_length=100, help_text="Nom de la technologie")
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)
    proficiency_level = models.CharField(max_length=20, choices=PROFICIENCY_CHOICES, default='intermediate')
    order = models.IntegerField(default=0, help_text="Ordre d'affichage (0 = premier)")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['category', 'order', 'name']
        verbose_name = "Compétence"
        verbose_name_plural = "Compétences"

    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class PersonalInfo(models.Model):
    full_name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    location = models.CharField(max_length=200)
    linkedin_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    cv_file = models.FileField(upload_to='cv/', blank=True, null=True)
    
    class Meta:
        verbose_name = "Informations Personnelles"
        verbose_name_plural = "Informations Personnelles"

    def __str__(self):
        return self.full_name

