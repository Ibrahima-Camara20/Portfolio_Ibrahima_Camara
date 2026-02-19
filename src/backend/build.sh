#!/usr/bin/env bash
set -o errexit

pip install -r requirements.txt
python manage.py collectstatic --no-input
python manage.py migrate

# Création/réinitialisation du superuser via variables d'environnement
python manage.py shell -c "
from django.contrib.auth.models import User
import os
username = os.environ.get('DJANGO_SUPERUSER_USERNAME', 'admin')
password = os.environ.get('DJANGO_SUPERUSER_PASSWORD')
email = os.environ.get('DJANGO_SUPERUSER_EMAIL', '')
if not password:
    print('DJANGO_SUPERUSER_PASSWORD not set, skipping.')
elif User.objects.filter(username=username).exists():
    u = User.objects.get(username=username)
    u.set_password(password)
    u.save()
    print(f'Password updated for {username}')
else:
    User.objects.create_superuser(username=username, email=email, password=password)
    print(f'Superuser {username} created')
"
