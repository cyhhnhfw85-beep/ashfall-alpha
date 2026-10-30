ASHFALL - GRAPHICS VNEXT / ENV-P01 / SALLE TEMOIN PERIPHERIE

STATUT : PROTOTYPE DE COMPARAISON ISOLE, NE PAS AJOUTER AU DEPOT main.
PRODUCTION DE RENDU 2D Canvas POUR SOLS / MURS / PORTES / OBSTACLES.
AUCUNE INTEGRATION GAMEPLAY, AUCUNE MODIFICATION DE V32.

SUR WINDOWS
  1. Decompresser ce dossier.
  2. Double-cliquer sur OUVRIR_DEMO_PC.bat (ou ouvrir index.html dans Chrome).
  3. Choisir le type de salle et changer les variantes.
  4. Transmettre une capture de la version candidate avec ton avis.

IMPORTANT
  - L'image de gauche emploie le p01-graphics.js d'origine correspondant au blob
    GitHub main 5958c7213d90da54728eef2fc12446e66164cf55 (audit 30/10/2026).
  - La droite est une etude originale de rendu, sur la MEME geometrie temoin.
  - Ce n'est pas une preuve que le rendu fonctionnerait sur les salles reelles
    ou atteindrait les performances cible sur iPhone.
  - Aucun nouveau mur, collision, salle, loot, ennemi ou bouton n'est cree.
  - Le prototype ne choisit pas encore un monde via data.run.difficulty : ce
    branchement sera ajoute uniquement apres validation visuelle et audit.
  - Le rendu d'un coffre/loot/installation n'est pas encore remplace dans V32.
  - Le ZIP complet a integrer sur main n'est PAS pret a ce stade.

FICHIERS
  index.html                        Demonstration avant / apres, sans reseau
  OUVRIR_DEMO_PC.bat                Lance la demonstration dans Chrome/Edge
  renderer/p01-graphics-original.js Fichier de reference INCHANGE
  renderer/peripherie-pilot.js      Code du candidat VISUEL (isolé)
  docs/PLAN_PRODUCTION.md           Plan de production et criteres d'acceptation
  docs/RAPPORT_CONTROLES.md          Audit, couverture et limites
  tests/test_pilot.mjs              Tests de structure Node.js
