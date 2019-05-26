var annee   = new Date().getFullYear();
var mois    = ('0'+(new Date().getMonth()+1)).slice(-2);
var jour    = ('0'+new Date().getDate()   ).slice(-2);
var date_jour = annee+'-'+mois+'-'+jour ;
//ajax pour les statistique du jour
$( document ).ready(function() {
  core(date_jour);
});
