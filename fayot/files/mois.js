$( document ).ready(function() {
  core(date_jour);
  $("#menuMois").selectmenu({
    icons:{button: "ui-icon-circle-triangle-s"},
    select: function( event, ui ) {
      core(date_annee+"-"+ui.item.value);
    }
  }).selectmenu( "menuWidget" ).addClass( "overflow" );
});
