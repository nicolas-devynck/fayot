# fayot
Petit script pour générer les statistiques des visiteurs d'un site web en php.

## installation
ajouter entre ```<head> </head>``` à chaque fichier php que vous voulez surveiller le petit bout de code ```<?php include 'fayot/fayot.php'; ?>```.

le fichier "\files\sql.sql" contient le code sql pour crée la basse de données.
le fichier "\files\var.php" contient les variables pour ce connecter à la basse de donner.
le fichier "\files\var.js" contient les variables pour les paramètres de JavaScript.

## note
j'utilise [PHP User Agent Parser](https://github.com/donatj/PhpUserAgent)
pour traiter les User Agent et faire les statistiques des navigateur
