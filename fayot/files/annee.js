$( document ).ready(function() {
  //appel de la fonction core avec comme parametre la date du jour
  core(date_annee);
  var i = date_creation;
  var j = date_annee;
  for (j; j >= i; j--) {
    $("#menuAn").append(" <option value="+j+">"+j+"</option>");
  }
  $("#menuAn").change(function() {
    core($(this).val());
  });
});
