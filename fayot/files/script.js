// date: mois, annee, jour effective
var date_jour = new Date().getFullYear()+'-'+('0'+(new Date().getMonth()+1)).slice(-2)+'-'+('0'+new Date().getDate()   ).slice(-2)
var date_annee = new Date().getFullYear();
var date_mois = date_annee+"-"+('0'+(new Date().getMonth()+1)).slice(-2);

// recup l'année la plus vielle dans la BDD
var date_creation = 0;
$.ajax({
  async : false,
  url : adresse+"fayot/files/date.php", // url
  type : "GET",
  success : function(retour) {
    date_creation = parseInt(retour);
  },
  error : function(retour) {
    console.log(retour);
  }
});
// show hide menu
$(document).ready(function() {
  $("#bouton").click(function() {
    if($("#menu").css("display")!="none") {
      $("#menu").hide("slide");
      $("#deco").hide("slide");
      $("#copyring").hide("slide");
    }
    else {
      $("#menu").show("slide");
      $("#deco").show("slide");
      $("#copyring").show("slide");
    }
  });
  // masque le menu peut importe ou l'ont clique
  jQuery(function($) {
    $(document.body).click(function(e) {
      if(!$(e.target).is($('#bouton'))&&!$.contains($('#bouton')[0],e.target) && !$(e.target).is($('#menu'))&&!$.contains($('#menu')[0],e.target)) {
        $("#menu").hide("slide");
      }
    });
  });
});
// fonction principal pour traiter le retoure ajax
// creation du corps de page
function core(date_fonction) {
  $.ajax({
    async : false,
    url : adresse+"fayot/files/ajax.php?date_fonction="+date_fonction, // url
    type : "GET",
    success : function(retour) {
      // traitement des retour
      // parse les signatures des navigateurs
      // tableau : utile pour les regex des match et qui compte les nombre des navigateur et os
      var os = {"Windows":0,"Linux":0,"Macintosh":0,"Chrome OS":0,"Android":0,"iPhone":0,"iPad":0,"iPod Touch":0,"Windows Phone OS":0,"Kindle":0,"Kindle Fire":0,"BlackBerry":0,"Playbook":0,"Tizen":0,"Oculus":0,"Nintendo 3DS":0,"New Nintendo 3DS":0,"Nintendo Wii":0,"Nintendo WiiU":0,"PlayStation 3":0,"PlayStation 4":0,"PlayStation Vita":0,"Xbox 360":0,"Xbox One":0,"Autres":0};
      var nav = {"Android Browser":0,"BlackBerry Browser":0,"Camino":0,"Kindle":0,"Silk":0,"Firefox":0,"IceWeasel":0,"IceCat":0,"Safari":0,"MSIE":0,"Edge":0,"IEMobile":0,"Chrome":0,"HeadlessChrome":0,"Yandex Browser":0,"Opera":0,"Midori":0,"Vivaldi":0,"TizenBrowser":0,"OculusBrowser":0,"SamsungBrowser":0,"UC Browser":0,"Lynx":0,"Wget":0,"Curl":0,"Puffin":0,"Autres":0};
      for (var jskey in JSON.parse(retour).total_navigateur) {
        // si il y a une valeur null alors on ajoute 1 a autre
        if (JSON.parse(JSON.parse(retour).total_navigateur[jskey]).platform == null) {os["Autres"] = os["Autres"]+1}
        if (JSON.parse(JSON.parse(retour).total_navigateur[jskey]).browser == null) {nav["Autres"] = nav["Autres"]+1}
        // on incremente les tableau pour compter les navigateur
        for (var key in os) {
          if (JSON.parse(JSON.parse(retour).total_navigateur[jskey]).platform == key) {
            os[key] = os[key]+1;
          }
        }
        for (var key in nav) {
          if (JSON.parse(JSON.parse(retour).total_navigateur[jskey]).browser == key) {
            nav[key] = nav[key]+1;
          }
        }
      }
      // on vide la page
      $("#titre").remove();
      $("#sstitre").remove();
      $("#cadre").remove();
      //construction des section
      $("#header").append("<div id='sstitre'></div>");
      $("#header").append("<div id='titre'></div>");
      $("body").append("<div id='cadre'></div>");
      //general
      $("#titre").append("<h1>Statistiques : "+date_fonction+"</h1>");
      $("#sstitre").append("Depuis "+date_creation+"<br />"+JSON.parse(retour).total_pages_visitees_depuis_creation+" pages ont été visitées par "+JSON.parse(retour).total_visiteur_depuis_debut+" visiteurs.");
      //viste par heure
      $("#cadre").append("<div>Vues par tranches horaires</div>");
      $("#cadre").append("<div id='visite_par_heure'></div>");
      for (var i = 0; i < JSON.parse(retour).visite_par_heure.length; i++) {
        if (JSON.parse(retour).visite_par_heure[i] == 0) {continue} //suprestion des heure vide
        // affichage des heure au format 00H - 01H
        $("#visite_par_heure").append("<div id=vht"+i+">"+('0'+i).slice(-2)+"H-"+('0'+(i+1)).slice(-2)+"H</div>");
        // CSS dans var.js
        $("#vht"+i+"").css(TbarCSS);
        $("#visite_par_heure").append("<div id=vh"+i+"><span>"+JSON.parse(retour).visite_par_heure[i]+"</span></div>");
        // CSS dans var.js
        $("#vh"+i+"").css(barCSS);
        $("#vh"+i+"").css({
          // width en pourcentage
          "width": ""+(100*JSON.parse(retour).visite_par_heure[i]/JSON.parse(retour).total_pages_vu)+"%"
        });
        // CSS dans var.js
        $("#vh"+i+" span").css(SpanBarCSS);
      }
      $("#visite_par_heure").append("<div id=vht><br />Soit un total de "+JSON.parse(retour).total_pages_vu+" pages vues par "+JSON.parse(retour).total_visiteur+" visiteurs.</div>");
      // CSS dans var.js
      $("#vht").css(TbarCSS);
      //pages les plus vues
      $("#cadre").append("<div>Les pages les plus vues</div>");
      $("#cadre").append("<div id='total_page'></div>");
      // conteur pour ecrire et appeler les id sur les div
      var count = 0;
      for (var page in JSON.parse(retour).total_page) {
        count = count+1;
        $("#total_page").append("<div id=pt"+count+">"+page+"</div>");
        // CSS dans var.js
        $("#pt"+count+"").css(TbarCSS);
        $("#total_page").append("<div id=p"+count+"><span>"+JSON.parse(retour).total_page[page]+"</span></div>");
        // CSS dans var.js
        $("#p"+count+"").css(barCSS);
        $("#p"+count+"").css({
          // width en pourcentage
          "width": ""+(100*JSON.parse(retour).total_page[page]/JSON.parse(retour).total_pages_vu)+"%"
        });
        // CSS dans var.js
        $("#p"+count+" span").css(SpanBarCSS);
      }
      // Les visiteurs les plus connectés
      $("#cadre").append("<div>Les visiteurs les plus connectés</div>");
      $("#cadre").append("<div id='total_visiteur'></div>");
      // conteur pour ecrire et appeler les id sur les div
      var count = 0;
      for (var host in JSON.parse(retour).total_host) {
        count = count+1;
        $("#total_visiteur").append("<div id=vt"+count+">"+host+"</div>");
        // CSS dans var.js
        $("#vt"+count+"").css(TbarCSS);
        $("#total_visiteur").append("<div id=v"+count+"><span>"+JSON.parse(retour).total_host[host]+"</span></div>");
        // CSS dans var.js
        $("#v"+count+"").css(barCSS);
        $("#v"+count+"").css({
          // width en pourcentage
          "width": ""+(100*JSON.parse(retour).total_host[host]/JSON.parse(retour).total_pages_vu)+"%"
        });
        // CSS dans var.js
        $("#v"+count+" span").css(SpanBarCSS);
      }
      // Les meilleurs referer
      $("#cadre").append("<div>Les meilleurs référants</div>");
      $("#cadre").append("<div id='total_referer'></div>");
      // conteur pour ecrire et appeler les id sur les div
      var count = 0;
      for (var referer in JSON.parse(retour).total_referer) {
        count = count+1;
        $("#total_referer").append("<div id=rt"+count+">"+referer+"</div>");
        // CSS dans var.js
        $("#rt"+count+"").css(TbarCSS);
        $("#total_referer").append("<div id=r"+count+"><span>"+JSON.parse(retour).total_referer[referer]+"</span></div>");
        // CSS dans var.js
        $("#r"+count+"").css(barCSS);
        $("#r"+count+"").css({
          // width en pourcentage
          "width": ""+(100*JSON.parse(retour).total_referer[referer]/JSON.parse(retour).total_pages_vu)+"%"
        });
        // CSS dans var.js
        $("#r"+count+" span").css(SpanBarCSS);
      }
      $("#cadre").append("<div>Classement des navigateurs populaires</div>");
      $("#cadre").append("<div id='total_navigateur'></div>");
      // conteur pour ecrire et appeler les id sur les div
      var count = 0;
      // on recherche le total des navigateurs pour calculer le %
      for (var key in nav) {
        if (nav[key] == 0) {continue} //suprestion des nav vide
        count = count+1;
        $("#total_navigateur").append("<div id=navt"+count+">"+key+"</div>");
        // CSS dans var.js
        $("#navt"+count+"").css(TbarCSS);
        $("#total_navigateur").append("<div id=nav"+count+"><span>"+nav[key]+"</span></div>");
        // CSS dans var.js
        $("#nav"+count+"").css(barCSS);
        $("#nav"+count+"").css({
          // width en pourcentage
          "width": ""+(100*nav[key]/JSON.parse(retour).total_pages_vu)+"%"
        });
        // CSS dans var.js
        $("#nav"+count+" span").css(SpanBarCSS);
      }
      $("#cadre").append("<div>Classement des OS populaires</div>");
      $("#cadre").append("<div id='total_os'></div>");
      // conteur pour ecrire et appeler les id sur les div
      var count = 0;
      for (var key in os) {
        if (os[key] == 0) {continue} //suprestion des os vide
        count = count+1;
        $("#total_os").append("<div id=ost"+count+">"+key+"</div>");
        // CSS dans var.js
        $("#ost"+count+"").css(TbarCSS);
        $("#total_os").append("<div id=os"+count+"><span>"+os[key]+"</span></div>");
        // CSS dans var.js
        $("#os"+count+"").css(barCSS);
        $("#os"+count+"").css({
          // width en pourcentage
          "width": ""+(100*os[key]/JSON.parse(retour).total_pages_vu)+"%"
        });
        // CSS dans var.js
        $("#os"+count+" span").css(SpanBarCSS);
      }
      $("#cadre").accordion();
    },
    error : function(retour) {
      console.log(retour);
    }
  });
}
