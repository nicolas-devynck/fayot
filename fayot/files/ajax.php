<?php
// Variabe pour la basse de donner
include 'var.php';
// date ajax
$date_jour = $_GET["date_jour"];
// connexion a la Basse de donner
try {$pdo = new PDO("mysql:host=".$bdHost.";dbname=".$bdName, $bdLogin, $bdPsw);}
catch (Exception $e) {die('Erreur : '.$e->getMessage());}
// variable statistique
$total_pages_visitees_depuis_creation = 0;
$total_visiteur_depuis_debut = 0;
$visite_par_heure = array(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);
$total_pages_vu = 0;
$total_visiteur = 0;
$total_page = array();
$total_host = array();
$total_referer = array();
$total_navigateur = array();
//on recherche le nombre de page visitees depuis le debut
$SqlRequete = $pdo->prepare("SELECT id FROM ".$bdTable);
$SqlRequete->execute();
while ($retour = $SqlRequete->fetch(PDO::FETCH_ASSOC)) { //argument de fetch qui suprime tout les index numerique
  $total_pages_visitees_depuis_creation = $total_pages_visitees_depuis_creation+1;
}
//on recherche le nombre de visiteur depuis le debut
$SqlRequete = $pdo->prepare("SELECT DISTINCT(ip) FROM ".$bdTable);
$SqlRequete->execute();
while ($retour = $SqlRequete->fetch(PDO::FETCH_ASSOC)) { //argument de fetch qui suprime tout les index numerique
  $total_visiteur_depuis_debut = $total_visiteur_depuis_debut+1;
}
// on recherche les visite par heures
$SqlRequete = $pdo->prepare("SELECT date_viste FROM ".$bdTable." WHERE date_viste LIKE '".$date_jour."%' ORDER BY date_viste ASC");
$SqlRequete->execute();
while ($retour = $SqlRequete->fetch(PDO::FETCH_ASSOC)) { //argument de fetch qui suprime tout les index numerique
  $date=$retour['date_viste'];
  sscanf($date, "%4s-%2s-%2s %2s:%2s:%2s", $date_Y, $date_m, $date_d, $date_H, $date_i, $date_s);
  if ($date_H < "10"){
    $date_H = substr($date_H, -1);
  }
  $visite_par_heure[$date_H]=$visite_par_heure[$date_H]+1;
  $total_pages_vu = $total_pages_vu+1;
}
// on calcule le nombre de visiteurs de la journée
$SqlRequete = $pdo->prepare("SELECT DISTINCT(ip) FROM ".$bdTable." WHERE date_viste LIKE '".$date_jour."%' ORDER BY date_viste ASC");
$SqlRequete->execute();
while ($retour = $SqlRequete->fetch(PDO::FETCH_ASSOC)) { //argument de fetch qui suprime tout les index numerique
  $total_visiteur = $total_visiteur+1;
}
// on recherche les pages qui ont été les plus vues sur la journée (on calcule au passage le nombre de fois qu'elles ont été vu)
$SqlRequete = $pdo->prepare("SELECT distinct(page), count(page) as nb_page FROM ".$bdTable." WHERE date_viste LIKE '".$date_jour."%' GROUP BY page ORDER BY nb_page DESC");
$SqlRequete->execute();
while ($retour = $SqlRequete->fetch(PDO::FETCH_ASSOC)) { //argument de fetch qui suprime tout les index numerique
  $total_page[$retour['page']] = $retour['nb_page'];
}
// on recherche les visiteurs qui ont été les plus connectes au site sur la journée (on calcule au passage le nombre de page qu'ils ont chargé)
$SqlRequete = $pdo->prepare("SELECT distinct(host), count(host) as nb_host FROM ".$bdTable." WHERE date_viste LIKE '".$date_jour."%' GROUP BY host ORDER BY nb_host DESC");
$SqlRequete->execute();
while ($retour = $SqlRequete->fetch(PDO::FETCH_ASSOC)) { //argument de fetch qui suprime tout les index numerique
  $total_host[$retour['host']] = $retour['nb_host'];
}
// on recherche les meilleurs referer sur la journée
$SqlRequete = $pdo->prepare("SELECT distinct(referer), count(referer) as nb_referer FROM ".$bdTable." WHERE date_viste LIKE '".$date_jour."%' AND referer!='' GROUP BY referer ORDER BY nb_referer DESC");
$SqlRequete->execute();
while ($retour = $SqlRequete->fetch(PDO::FETCH_ASSOC)) { //argument de fetch qui suprime tout les index numerique
  $total_referer[$retour['referer']] = $retour['nb_referer'];
}
// on recherche les navigateurs utilisés par les visiteurs (on calcule au passage le nombre de page qui ont été chargés avec ces systèmes)
$SqlRequete = $pdo->prepare("SELECT distinct(navigateur), count(navigateur) as nb_navigateur FROM ".$bdTable." WHERE date_viste LIKE '".$date_jour."%' GROUP BY navigateur ORDER BY nb_navigateur DESC");
$SqlRequete->execute();
while ($retour = $SqlRequete->fetch(PDO::FETCH_ASSOC)) { //argument de fetch qui suprime tout les index numerique
  $total_navigateur[$retour['navigateur']] = $retour['nb_navigateur'];
}
// retoure ajax
$arrayJson = array();
$arrayJson['total_pages_visitees_depuis_creation'] = $total_pages_visitees_depuis_creation;
$arrayJson['total_visiteur_depuis_debut'] = $total_visiteur_depuis_debut;
$arrayJson['visite_par_heure'] = $visite_par_heure;
$arrayJson['total_pages_vu'] = $total_pages_vu;
$arrayJson['total_visiteur'] = $total_visiteur;
$arrayJson['total_page'] = $total_page;
$arrayJson['total_host'] = $total_host;
$arrayJson['total_referer'] = $total_referer;
$arrayJson['total_navigateur'] = $total_navigateur;
echo json_encode($arrayJson);
?>
