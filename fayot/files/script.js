var date_creation = 0;
var date_jour = new Date().getFullYear()+'-'+('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+new Date().getDate()   ).slice(-2)
var date_annee = new Date().getFullYear();

$( document ).ready(function() {
  $("#bouton").click(function() {
    if($("#menu").css("display")!="none") {
      $("#menu").hide("slide");
    }
    else {
      $("#menu").show("slide");
    }
  });
  jQuery(function($) {
    $(document.body).click(function(e) {
      if(!$(e.target).is($('#bouton'))&&!$.contains($('#bouton')[0],e.target) && !$(e.target).is($('#menu'))&&!$.contains($('#menu')[0],e.target)) {
        $("#menu").hide("slide");
      }
    });
  });
  $.ajax({
    url : adresse+"fayot/files/date.php", // url
    type : "GET",
    success : function(retour) {
      date_creation = parseInt(retour);
      console.log(date_creation);
    },
    error : function(retour) {
      // message d'erreur et affichage du retoure ajax dans la console
      $("body").append("<p>une erreur est survenue, veuillez contacter l'administrateur</p>");
      console.log(retour);
    }
  });
});
