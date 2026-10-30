# ASHFALL — ENV-P01 : feuille de production, Monde 1 Périphérie

**Décision de cadrage du 30/10/2026 :** priorité aux environnements et à l'exploration. Survivant, ennemis et 3D en pause. **Aucun push dans `main`.**

## Cible

Style B **2D HD tactique premium**, densité B **premium équilibré** : milieu de pièce sobre pour garder lisibles joueur, projectiles et dangers ; richesse visuelle aux murs et points d'intérêt. Palette industrielle bleu nuit/graphite ; accents ambre/cyan fonctionnels et localisés ; métal patiné, maintenance abandonnée. L'ambiance dépend du **monde visuel (difficulté effective de l'expédition)**, non du secteur de gameplay.

## Plan de travail jusqu'au ZIP candidat `main`

| Étape | Livrable | Acceptation | État |
|---|---|---|---|
| 01 | Audit de V32 / contrats visuels | Vérifier l'API du renderer et les hitbox existantes | Terminé sur `p01-graphics.js` de `main` |
| 02 | Salle témoin Périphérie isolée | Démo 2D avant/après avec vrais types d'entrées, aucune mutation du gameplay | **Prototype livré**, validation artistique requise |
| 03 | Kit Périphérie complet (36 cibles) | Sols, murs, portes, props, décals, lumières ; raccords, échelle, variations | À produire |
| 04 | Salles et objets d'exploration | Sept catégories de salles ; installations, coffres, loot, FX ; priorités de lisibilité | À produire |
| 05 | Raccordement V32 protégé | Difficulté effective 1 → nouveau décor ; difficultés 2–5 → rendu V32 ; cache, PWA, aucune modification du gameplay | À développer |
| 06 | QA et ZIP installable | Tests JS, comparaison visuelle, iPhone Safari, sécurité des sauvegardes, bundle vérifié, fichiers `main` à jour | À valider |

**Ne pas présenter ce prototype isolé comme le ZIP GitHub `main` final.** La validation réelle sur appareil et le cadrage du Cerveau central demeurent nécessaires avant publication.

## Kit de base Périphérie : 36 modules cibles

| Lot | Nombre | Contenu |
|---|---:|---|
| SOL | 8 | standard, usé, renforcé, grille, jonction, maintenance, marquage, endommagé |
| MUR | 8 | droit, angles, terminaison, renfort, conduite, jonction de porte, usure |
| PORTE | 4 | encadrement, ouverte, fermée, verrouillée (état toujours tiré du moteur) |
| PROP | 8 | caisse, conteneur, générateur, armoire, machine, baril, poste maintenance, console |
| DECAL | 4 | câbles, numérotation, marquages, usure au sol (sans collision) |
| LUM | 4 | cyan, ambre, urgence, machine (FX statique prioritaire) |
| **TOTAL** | **36** | Cibles artistiques, pas 36 ressources produites à ce stade |

## Développement en sous-lots

### A. Architecture (priorité immédiate)
1. **SOL** : modules de plaques, joints, grilles, usure ; contraste au centre ≤ décoration du pourtour ; 100% raccordables.
2. **MUR** : panneaux, poutres, conduites et renforts peints UNIQUEMENT dans les rectangles fournis par `roomWalls()`.
3. **PORTE** : états passable/verrouillé/arena dérivés de `doorInfo` ; préserver le vide et le code rouge danger.
4. **AMB** : lueurs localisées cyan/ambre, matériaux unifiés, ombres en cache. Pas de baisse de lisibilité des télégraphes.

### B. Décors et obstacles
5. **PROP** : modèles visuels à l'intérieur des obstacles réels ; aucune pièce peinte ne crée une nouvelle obstruction physique.
6. **DECAL** : une identité de maintenance, stockage, dégradation ou énergie par salle, stable à seed identique ; identité de salle ne doit pas simuler un passage ni une installation activable inexistante.

### C. Identité des salles
7. Orinaire : circulation claire ; Arène : accents de danger sans fausses hitbox ; Boss : architecture plus lourde sans chambre fixe obligatoire ; Extraction : reconnaissance immédiate de l'état réel ; Avant-poste : marqueurs sûrs ; Secrète : détails mystérieux sans ajout de porte ; Départ : repérage simple. Pas de salles en L introduites.
8. Le placement du boss et des sorties est libre selon la génération V32. Ne jamais coder une mise en scène fixe qui suppose leur position.

### D. Effets visuels
9. Vapeur/poussière et clignotements sobres, contrôlés par état de la salle et limités en coût CPU ; priorité absolue à la lecture des lasers et attaques.
10. Variants de lumière activés seulement après profils sur iPhone (aucune hypothèse de FPS).

### E. Coffres et loot
11. Coffre expédition : `closed` / `opened`, animation cosmétique depuis `room.chestFx`, sans état de gameplay ajouté.
12. Récompenses : six raretés × trois déclinaisons artistiques si elles existent dans le flux de récompense concerné ; mapping réel à vérifier.
13. Loot réel : `xp`, `credits`, `weapon`; respect des ancrages, couleurs fonctionnelles et dimensions. Pas de drop nouveau ou taux modifié.

## Contrats de non-régression

- Un seul joystick, tir automatique ; aucun bouton supplémentaire.
- HUD et Tactical Map V3 inchangés, V32 `geometryVersion`, collisions, IA, salles, secteurs gameplay, événements, probas, équipements, inventaire et sauvegardes inchangés.
- Difficulté **effective** : 1 = Périphérie ; 2 = Laboratoires ; 3 = Fonderie ; 4 = Citadelle ; 5 = à déterminer, rendu V32 en repli.
- Fallback explicite si rendu premium non disponible ; pas d'écran noir.
- Comparer `main` juste avant création du ZIP final pour éviter d'écraser des évolutions ultérieures.

## Critères d'acceptation ART et QA

1. Décors reconnaissables à taille iPhone sans zoom artificiel.
2. Centre lisible en combat ; décor périphérique riche sans fausses collisions.
3. Porte fermée vs ouverte identifiable sans uniquement utiliser une couleur.
4. Variation de salle perceptible sans se répéter systématiquement sur 50 salles.
5. Aucun élément graphique ne masque joueur, télégraphes ou zone d'extraction.
6. À seed identique, même salle → même habillage. Aucun aléatoire par frame.
7. Pas de fuite de mémoire sur 50 salles ; vérifier CPU/FPS mémoire sur appareils cibles.
8. Tous les chemins d'affichage doivent disposer d'un fallback V32.
9. ZIP cible pour `main` uniquement après contrôle de l'état exact du dépôt, QA, capture et feu vert utilisateur/Cerveau.

## Point d'arrêt actuellement

Le composant `renderer/peripherie-pilot.js` est une **esquisse programmée d'un décor 2D**, pas une texture premium finalisée ni une intégration. La démo peut être évaluée visuellement sur PC. Les principales améliorations artistiques se feront après ton retour sur la densité, les matériaux et les éclairages.
