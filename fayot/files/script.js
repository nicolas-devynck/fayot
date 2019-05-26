var annee   = new Date().getFullYear();
var mois    = ('0'+(new Date().getMonth()+1)).slice(-2);
var jour    = ('0'+new Date().getDate()   ).slice(-2);
var date_jour = annee+'-'+mois+'-'+jour ;
$( document ).ready(function() {
  //appel de la fonction core qui affiche toute la page des statistiques
  core(date_jour);
  // calandrier
  $("#datepicker").datepicker({
    closeText: "Fermer",
    prevText: "Précédent",
    nextText: "Suivant",
    currentText: "Aujourd'hui",
    monthNames: [ "janvier", "février", "mars", "avril", "mai", "juin","juillet", "août", "septembre", "octobre", "novembre", "décembre" ],
    monthNamesShort: [ "janv.", "févr.", "mars", "avr.", "mai", "juin","juil.", "août", "sept.", "oct.", "nov.", "déc." ],
    dayNames: [ "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ],
    dayNamesShort: [ "dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam." ],
    dayNamesMin: [ "D","L","M","M","J","V","S" ],
    weekHeader: "Sem.",
    dateFormat: "dd/mm/yy",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ""
  });
});
