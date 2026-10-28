# ASHFALL — Périphérie Environment V2 (prototype)

## Changements
- Anciennes 31 textures de `assets/p01v2/` supprimées de cette copie.
- Nouveau `p01-graphics.js` : rendu Canvas procédural pour sols, murs, portes et obstacles.
- Décors déterministes par salle, palettes selon type, relief simulé, détails réduits.
- Objets visuels dessinés **dans les rectangles de collision existants** : aucune collision de gameplay ajoutée ou modifiée.
- Service worker : retrait des textures obsolètes de la liste de pré-cache ; changement de cache ; versionnement du script.

## Limites importantes
- Le moteur de génération des salles, les obstacles physiques et le pathfinding restent inchangés. La génération de nouveaux obstacles, la validation automatique de leur accessibilité et la physique des projectiles ne sont PAS implémentées.
- Cette livraison est un prototype visuel, pas une certification 7–8/10. Vérifier le rendu sur iPhone et tester collisions, portes, sauvegardes et performances.
- Aucun changement sur GitHub.
