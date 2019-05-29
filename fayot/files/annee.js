$( document ).ready(function() {
  //appel de la fonction core avec comme parametre la date du jour
  core(date_annee);
  for (var i = date_annee; i >= parseInt(sessionStorage.getItem("date_creation")); i--) {
    if (i == parseInt(sessionStorage.getItem("date_creation"))) {
      $("#number").append("<option value="+i+" selected>"+i+"</option>");
    }
    else {
      $("#number").append("<option value="+i+">"+i+"</option>");
    }
  }
  $("#number").selectmenu();
});
