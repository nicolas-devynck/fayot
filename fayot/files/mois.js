$( document ).ready(function() {
  core(date_mois);
  var i = date_creation;
  var j = date_annee;
  for (j; j >= i; j--) {
    $("#menuAn").append(" <option value="+j+">"+j+"</option>");
  }
  $("#ok").click(function() {
    core($("#menuAn").val()+"-"+$("#menuMois").val());
  });
});
