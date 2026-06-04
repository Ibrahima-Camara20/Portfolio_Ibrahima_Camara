# Portfolio d'Ibrahima Camara

Bonjour et bienvenue sur le dépôt de mon portfolio personnel. Ce projet me tient vraiment à cœur car il représente à la fois mon travail, mon parcours et ma façon de voir le développement. J'ai voulu créer quelque chose de propre, de moderne et surtout de vivant, un site que je peux mettre à jour facilement sans toucher au code.

## Ce que tu trouveras ici

Le site est divisé en deux grandes parties. D'un côté le portfolio public, que tout le monde peut consulter, avec mes projets, mon parcours académique, mes expériences professionnelles et mes compétences. De l'autre côté un panneau d'administration privé, accessible uniquement à moi, qui me permet de tout gérer depuis une interface graphique sans jamais avoir à modifier le code directement.

## Les technologies utilisées

Pour le frontend j'ai choisi React avec un système de design entièrement personnalisé. Pas de composants Bootstrap préfabriqués, juste du CSS fait maison avec des variables, des animations et une attention particulière au responsive. Le site est disponible en français et en anglais grâce à i18next.

Pour le backend j'ai utilisé Django REST Framework. Il expose une API que le frontend consomme pour afficher les données. L'authentification de l'interface admin est gérée avec des tokens JWT.

Pour la base de données j'ai choisi PostgreSQL hébergé sur Neon. Neon propose un plan gratuit avec une base de données persistante qui ne se réinitialise pas entre les déploiements, ce qui est essentiel pour conserver les données du portfolio et le compte administrateur. En développement local, SQLite suffit largement et se configure automatiquement si aucune variable DATABASE_URL n'est définie.

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

Les variables indispensables en production sont les suivantes. La variable `SECRET_KEY` protège les sessions Django et doit être une longue chaîne aléatoire. La variable `DATABASE_URL` doit pointer vers ta base Neon au format `postgresql://user:password@host/dbname?sslmode=require`. Les variables `DJANGO_SUPERUSER_USERNAME`, `DJANGO_SUPERUSER_PASSWORD` et `DJANGO_SUPERUSER_EMAIL` permettent de créer automatiquement le compte admin au premier démarrage. Une fois le compte créé en base Neon, il persiste indéfiniment même si tu redéploies.

## Déploiement en production

Le backend est hébergé sur Render et tourne dans un conteneur Docker. La base de données PostgreSQL est hébergée séparément sur Neon, ce qui garantit que toutes les données survivent aux redéploiements. Le frontend est déployé automatiquement sur GitHub Pages à chaque push sur la branche `main`, grâce à un workflow GitHub Actions.

Pour que le frontend puisse parler au backend, il faut ajouter un secret dans les paramètres GitHub Actions du dépôt. Le secret s'appelle `REACT_APP_API_URL` et sa valeur doit être l'URL complète de l'API Render, par exemple `https://portfolio-ibrahima-camara-1.onrender.com/api/`.

Pour que le backend accepte les requêtes du frontend hébergé sur GitHub Pages, la variable `FRONTEND_URL` doit être définie sur Render avec la valeur `https://ibrahima-camara20.github.io`.

## Accès à l'interface d'administration

L'interface admin est accessible à cette adresse une fois le site déployé :

```
https://ibrahima-camara20.github.io/Portfolio_Ibrahima_Camara/admin/login
```

C'est depuis cette interface que tu peux ajouter ou modifier tes projets, formations, expériences, compétences et informations de contact sans jamais toucher au code.

## Structure du projet

```
Portfolio_Ibrahima_Camara/
├── src/
│   ├── backend/           API Django REST Framework
│   ├── frontend/          Application React
│   ├── docker-compose.yml
│   └── render.yaml        Configuration Render
├── .github/
│   └── workflows/
│       └── deploy.yml     Déploiement automatique GitHub Pages
└── README.md
```

## Me contacter

Si tu as des questions sur le projet ou simplement envie d'échanger, tu peux m'écrire directement depuis la page contact du site ou retrouver mes coordonnées sur la page Mes Contacts.

Merci de ta visite.
