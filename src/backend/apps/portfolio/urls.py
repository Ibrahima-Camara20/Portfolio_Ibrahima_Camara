from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, ContactViewSet, EducationViewSet, ExperienceViewSet, SkillViewSet

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'contacts', ContactViewSet)
router.register(r'education', EducationViewSet)
router.register(r'experiences', ExperienceViewSet)
router.register(r'skills', SkillViewSet)

urlpatterns = router.urls

