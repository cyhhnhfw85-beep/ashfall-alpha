# ASHFALL ENV-P01 — Contrôles du prototype isolé

**Source GitHub `main` examinée le 30 octobre 2026** : fichier `p01-graphics.js`, SHA blob `5958c7213d90da54728eef2fc12446e66164cf55`. Vérification correspondante de l'archive locale V32. Appels vérifiés dans `game.js` de la V32 locale : `AshP01Graphics.floor(ctx,room,roomObstacles(room))` et `.walls(ctx,room,roomWalls(room),doorInfo)`. Le `game.js` actif sur GitHub peut avoir évolué : nouvelle comparaison nécessaire avant intégration.

- `renderer/p01-graphics-original.js` : copie à l'identique, ne pas intégrer cette copie dans le dépôt.
- `renderer/peripherie-pilot.js` : **nouveau**, exposé seulement comme `window.AshPeripheryPilot`. N'intercepte rien en production.
- `index.html` : comparaison locale en Canvas, mêmes obstacles / portes / murs et palette par type de salle.
- `test_pilot.mjs` : tests de l'API, déterminisme, entrées inchangées, dessin avec faux contexte Canvas.
- Vérification `node --check` : passée.
- Vérification `node tests/test_pilot.mjs` : passée.
- Capture réelle HTML via Chromium headless : **non obtenue dans l'environnement assistant** (le processus navigateur n'a pas terminé). La démo reste à vérifier visuellement sur PC et sur Safari iPhone.
- Toute mesure FPS, RAM, latence tactile, PWA/cache ou déploiement `main` : **non réalisée**.

**Note de sécurité de rendu** : les exemples de salles du démonstrateur sont géométriquement plausibles, mais ce ne sont pas des salles V32 extraites de l'algorithme à l'exécution ; leur fidélité n'est pas prouvée. Le module nouveau ne modifie pas les objets passés. L'absence de fausses collisions découle du dessin de props uniquement sur les rectangles fournis, et reste à contrôler dans toutes les salles V32.

**Limites de périmètre** : coffre, loot, interactifs, particules dynamiques, extraction et style de mondes 2–5 ne sont pas remplacés par ce premier prototype. Le branchement `data.run.difficulty` est volontairement absent. Les personnages restent hors scope selon demande utilisateur.
