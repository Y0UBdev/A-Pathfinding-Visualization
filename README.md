# A* Pathfinding Visualization

Une application web interactive pour visualiser l'algorithme de recherche de chemin A* (A-star). L'application permet de créer des grilles personnalisées, de placer des obstacles, et de visualiser en temps réel le processus de recherche du chemin le plus court entre un point de départ et un point d'arrivée.

## Fonctionnalités

- **Interface interactive** : Cliquez et glissez pour placer des obstacles, le point de départ et d'arrivée
- **Visualisation en temps réel** : Observez l'algorithme A* explorer la grille pour trouver le chemin optimal
- **Paramètres personnalisables** :
  - Ajustez la taille des cellules (10-30 pixels)
  - Configurez la taille des blocs d'obstacles (1x10)
  - Différents modes de placement (départ, arrivée, obstacle, effacement)
- **Grille dynamique** : Surface de 40x30 cellules par défaut

## Technologies utilisées

- HTML5 Canvas pour le rendu graphique
- JavaScript ES6+ (modules)
- CSS3 pour le style
- Architecture orientée objet avec pattern Strategy

## Démarrage

### Prérequis

Aucun prérequis particulier. Un navigateur web moderne compatible avec ES6+ modules est suffisant.

### Installation

1. Clonez le dépôt :
   ```bash
   git clone https://github.com/votre-username/astar-visualization.git
   cd astar-visualization
   ```

2. Ouvrez `index.html` dans votre navigateur web préféré

Ou utilisez un serveur de développement local :

```bash
# Avec Python 3
python -m http.server 8000

# Avec Node.js (si vous avez installé http-server)
npx http-server

# Avec PHP
php -S localhost:8000
```

Puis accédez à `http://localhost:8000` dans votre navigateur.

## Utilisation

1. **Placer les éléments** : Utilisez les boutons radio pour sélectionner le mode de placement :
   - **Start** : Positionnez le point de départ (vert)
   - **End** : Positionnez le point d'arrivée (rouge)
   - **Block** : Créez des obstacles (noir)
   - **Erase** : Supprimez des éléments

2. **Ajuster les paramètres** :
   - Modifiez la taille des cellules avec le curseur "Taille des cellules"
   - Configurez la taille des blocs avec les curseurs "Largeur" et "Hauteur"

3. **Lancer l'algorithme** : Cliquez sur le bouton "Démarrer" pour lancer la visualisation A*

## Structure du projet

```
astar-visualization/
├── index.html             # Page principale
├── styles/
│   └── style.css          # Feuille de style
├── scripts/
│   ├── main.js            # Point d'entrée principal
│   ├── models.js          # Modèles de données (Node, Grid, Coordinate)
│   ├── strategy.js        # Implémentation de l'algorithme A*
│   ├── events.js          # Gestion des événements utilisateur
│   └── render.js          # Fonctions de rendu graphique
└── README.md
```

## Architecture

L'application suit une architecture modulaire :

- **models.js** : Définit les classes de base (Node, Coordinate, Grid)
- **strategy.js** : Implémente l'algorithme A* avec le pattern Strategy
- **events.js** : Gère les interactions utilisateur avec la grille
- **render.js** : Gère le rendu graphique sur le canvas
- **main.js** : Initialise l'application et coordonne les modules

## Sources : 
- https://theory.stanford.edu/~amitp/GameProgramming/Heuristics.html
- https://fr.wikipedia.org/wiki/Algorithme_A*

## Contribution de l'ia dans ce projet

- `events.js` : La majorité des événements ont été réalisé à l'aide de *ChatGpt*
- `style.css` : *OpenCode* c'est occupé de réalisé la totalité du style
- `index.html` : *OpenCode* c'est occupé des `<fieldset/>`
- `README.md` : *OpenCode* a corriger les fautes d'orthographes, a amélioré les premiers points de façon plus professionnel et a rédigé la patie *Installation*.
