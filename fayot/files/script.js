$( document ).ready(function() {
  //appel de la fonction core avec comme parametre la date du jour
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
    dateFormat: "yy-mm-dd",
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: "",
    onSelect: function (date) {
      core(date);
    }
  });
  $("#logo").click(function() {
    core(date_jour);
  });
});
