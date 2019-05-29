$( document ).ready(function() {
  core(date_mois);
  $("#menuMois").selectmenu({
    icons:{button: "ui-icon-circle-triangle-s"},
    select: function( event, ui ) {
      core(date_annee+"-"+ui.item.value);
    }
  });
});
