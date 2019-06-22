<?php
include 'var.php';
// connexion a la Basse de donner
try {$pdo = new PDO("mysql:host=".$bdHost.";dbname=".$bdName, $bdLogin, $bdPsw);}
catch (Exception $e) {die('Erreur : '.$e->getMessage());}
$date_cration = 0;
$SqlRequete = $pdo->prepare("SELECT SUBSTR(date_viste,1,4) as date_creation FROM ".$bdTable." ORDER BY date_viste ASC LIMIT 1");
$SqlRequete->execute();
while ($retour = $SqlRequete->fetch(PDO::FETCH_ASSOC)) { //argument de fetch qui suprime tout les index numerique
  $date_creation = $retour["date_creation"];
}
echo $date_creation;
?>
