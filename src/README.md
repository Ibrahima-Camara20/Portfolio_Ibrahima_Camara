# Portfolio d'Ibrahima Camara

Bonjour et bienvenue sur le dépôt de mon portfolio personnel. Ce projet me tient vraiment à cœur car il représente à la fois mon travail, mon parcours et ma façon de voir le développement. J'ai voulu créer quelque chose de propre, de moderne et surtout de vivant, un site que je peux mettre à jour facilement sans toucher au code.

## Ce que tu trouveras ici

Le site est divisé en deux grandes parties. D'un côté le portfolio public, que tout le monde peut consulter, avec mes projets, mon parcours académique, mes expériences professionnelles et mes compétences. De l'autre côté un panneau d'administration privé, accessible uniquement à moi, qui me permet de tout gérer depuis une interface graphique sans jamais avoir à modifier le code directement.

## Les technologies utilisées

Pour le frontend j'ai choisi React avec un système de design entièrement personnalisé. Pas de composants Bootstrap préfabriqués, juste du CSS fait maison avec des variables, des animations et une attention particulière au responsive. Le site est disponible en français et en anglais grâce à i18next.

Pour le backend j'ai utilisé Django REST Framework. Il expose une API que le frontend consomme pour afficher les données. L'authentification de l'interface admin est gérée avec des tokens JWT.

La base de données est PostgreSQL en production. En développement local, SQLite suffit largement.

## Lancer le projet en local

La façon la plus simple est d'utiliser Docker. Tu n'as besoin d'installer rien d'autre sur ta machine.

```bash
docker compose up
```

Le frontend sera accessible sur http://localhost:3000 et l'API sur http://localhost:8000/api.

Si tu préfères lancer les deux séparément, voici comment faire.

Pour le backend, depuis le dossier `backend` :

```bash
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Pour le frontend, depuis le dossier `frontend` :

```bash
npm install
npm start
```

## Variables d'environnement

Le fichier `.env.example` à la racine du projet liste toutes les variables dont tu as besoin. Il suffit de le copier et de le renommer en `.env` puis de remplir les valeurs.

## Déploiement en production

Le backend est hébergé sur Render et la base de données sur le même service. Le frontend est déployé automatiquement sur GitHub Pages à chaque push sur la branche `main`, grâce à un workflow GitHub Actions.

Pour que le frontend puisse parler au backend, il faut ajouter un secret dans les paramètres GitHub Actions du dépôt. Le secret s'appelle `REACT_APP_API_URL` et sa valeur doit être l'URL complète de l'API Render, par exemple `https://portfolio-backend-xxxx.onrender.com/api/`.

## Structure du projet

```
src/
├── backend/          API Django REST Framework
├── frontend/         Application React
├── docker-compose.yml
└── render.yaml       Configuration Render
```
