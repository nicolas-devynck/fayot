<?php
// Variabe pour la basse de donner
include 'files/var.php';
// recuperation de l'heure courante
$date_courante = date("Y-m-d H:i:s");
// recuperation de l'adresse IP du client (on cherche d'abord a savoir si il est derriere un proxy)
if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])) {
  $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
}
elseif(isset($_SERVER['HTTP_CLIENT_IP'])) {
  $ip  = $_SERVER['HTTP_CLIENT_IP'];
}
else {
  $ip = $_SERVER['REMOTE_ADDR'];
}
// recuperation du domaine du client
$host = gethostbyaddr($ip);
// recuperation du navigateur et de l'OS du client
$navigateur = $_SERVER['HTTP_USER_AGENT'];
// recuperation du REFERER
if (isset($_SERVER['HTTP_REFERER'])) {
  if (preg_match("/".$_SERVER['HTTP_HOST']."/i", $_SERVER['HTTP_REFERER'])) {
  $referer ='';
  }
  else {
  $referer = $_SERVER['HTTP_REFERER'];
  }
}
else {
  $referer ='';
}
// recuperation du nom de la page courante ainsi que ses arguments
if ($_SERVER['QUERY_STRING'] == "") {
  $page_courante = $_SERVER['PHP_SELF'];
}
else {
  $page_courante = $_SERVER['PHP_SELF'].'?'.$_SERVER['QUERY_STRING'];
}
// connexion a la Basse de donner
try {
  $pdo = new PDO("mysql:host=".$bdHost.";dbname=".$bdName, $bdLogin, $bdPsw);
}
catch (Exception $e) {
  die('Erreur : '.$e->getMessage());
}
// insertion des elements dans la base de donnees
$SqlRequete = $pdo->prepare("INSERT INTO ".$bdTable." VALUES (
  '',
  :bdDate,
  :bdPage,
  :bdIp,
  :bdHost,
  :bdNavigateur,
  :bdReferer
)");
$SqlRequete->execute(array(
  'bdDate' => $date_courante,
  'bdPage' => $page_courante,
  'bdIp' => $ip,
  'bdHost' => $host,
  'bdNavigateur' => $navigateur,
  'bdReferer' => $referer,
));
?>
