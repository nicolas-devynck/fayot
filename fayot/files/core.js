function core(date_jour) {
  //ajax pour les statistique du jour
  $.ajax({
    url : adresse+"fayot/files/ajax.php?date_jour="+date_jour, // url
    type : "GET",
    success : function(retour) {// traitement des retour
      // operation manquante dans php pour les signature des navigateurs
      // tableau : utile pour les regex des match et qui compte les nombre des navigateur et os
      var os = {Windows:0,Linux:0,Macintosh:0,Android:0};
      var nav = {Chrome:0,Firefox:0,Safari:0,Opera:0,Edge:0};
      for (var navigateur in JSON.parse(retour).total_navigateur) {
        for (var key in os) {
          if (navigateur.match(key)) {
            os[key] = os[key]+parseInt(JSON.parse(retour).total_navigateur[navigateur]);
          }
        }
        for (var key in nav) {
          if (navigateur.match(key)) {
            nav[key] = nav[key]+parseInt(JSON.parse(retour).total_navigateur[navigateur]);
          }
        }
      }
      // formatage de la date
      var datefr = $.datepicker.formatDate( "DD d MM yy", new Date(date_jour), {
        monthNames: [ "janvier", "février", "mars", "avril", "mai", "juin","juillet", "août", "septembre", "octobre", "novembre", "décembre" ],
        monthNamesShort: [ "janv.", "févr.", "mars", "avr.", "mai", "juin","juil.", "août", "sept.", "oct.", "nov.", "déc." ],
        dayNames: [ "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ],
        dayNamesShort: [ "dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam." ],
        dayNamesMin: [ "D","L","M","M","J","V","S" ],
        weekHeader: "Sem."
      });
      // on vide la page
      $("#titre").remove();
      $("#sstitre").remove();
      $("#cadre").remove();
      //construction des section
      $("#header").append("<div id='sstitre'></div>");
      $("#header").append("<div id='titre'></div>");
      $("body").append("<div id='cadre'></div>");
      //general
      $("#titre").append("<h1>Statistiques du "+datefr+"</h1>");
      $("#sstitre").append("Depuis la création du site<br />"+JSON.parse(retour).total_pages_visitees_depuis_creation+" pages ont été visitées par "+JSON.parse(retour).total_visiteur_depuis_debut+" visiteurs.");
      //viste par heure
      $("#cadre").append("<div>Vues par tranche horaires</div>");
      $("#cadre").append("<div id='visite_par_heure'></div>");
      for (var i = 0; i < JSON.parse(retour).visite_par_heure.length; i++) {
        if (JSON.parse(retour).visite_par_heure[i] == 0) {continue} //suprestion des heure vide
        // affichage des heure au format 00H - 01H
        $("#visite_par_heure").append("<div id=vh"+i+">"+('0'+i).slice(-2)+"H - "+('0'+(i+1)).slice(-2)+"H<span>"+JSON.parse(retour).visite_par_heure[i]+"</span></div>");
        // CSS dans var.js
        $("#vh"+i+"").css(barCSS);
        $("#vh"+i+"").css({
          // width en pourcentage
          "width": ""+(100*JSON.parse(retour).visite_par_heure[i]/JSON.parse(retour).total_pages_vu)+"%"
        });
        $("#vh"+i+" span").css({
          "float":"right"
        });
      }
      $("#visite_par_heure").append("<div>Soit un total de "+JSON.parse(retour).total_pages_vu+" pages vues par "+JSON.parse(retour).total_visiteur+" visiteurs.</div>");
      //pages les plus vues
      $("#cadre").append("<div>Les pages les plus vues</div>");
      $("#cadre").append("<div id='total_page'></div>");
      // conteur pour ecrire et appeler les id sur les div
      var count = 0;
      for (var page in JSON.parse(retour).total_page) {
        count = count+1;
        $("#total_page").append("<div id=p"+count+">"+page+"<span>"+JSON.parse(retour).total_page[page]+"</span></div>");
        // CSS dans var.js
        $("#p"+count+"").css(barCSS);
        $("#p"+count+"").css({
          // width en pourcentage
          "width": ""+(100*JSON.parse(retour).total_page[page]/JSON.parse(retour).total_pages_vu)+"%"
        });
        $("#p"+count+" span").css({
          "float":"right"
        });
      }
      // Les visiteurs les plus connectés
      $("#cadre").append("<div>Les visiteurs les plus connectés</div>");
      $("#cadre").append("<div id='total_visiteur'></div>");
      // conteur pour ecrire et appeler les id sur les div
      var count = 0;
      for (var host in JSON.parse(retour).total_host) {
        count = count+1;
        $("#total_visiteur").append("<div id=v"+count+">"+host+"<span>"+JSON.parse(retour).total_host[host]+"</span></div>");
        // CSS dans var.js
        $("#v"+count+"").css(barCSS);
        $("#v"+count+"").css({
          // width en pourcentage
          "width": ""+(100*JSON.parse(retour).total_host[host]/JSON.parse(retour).total_pages_vu)+"%"
        });
        $("#v"+count+" span").css({
          "float":"right"
        });
      }
      // Les meilleurs referer
      $("#cadre").append("<div>Les meilleurs référant</div>");
      $("#cadre").append("<div id='total_referer'></div>");
      // conteur pour ecrire et appeler les id sur les div
      var count = 0;
      for (var referer in JSON.parse(retour).total_referer) {
        count = count+1;
        $("#total_referer").append("<div id=r"+count+">"+referer+"<span>"+JSON.parse(retour).total_referer[referer]+"</span></div>");
        // CSS dans var.js
        $("#r"+count+"").css(barCSS);
        $("#r"+count+"").css({
          // width en pourcentage
          "width": ""+(100*JSON.parse(retour).total_referer[referer]/JSON.parse(retour).total_pages_vu)+"%"
        });
        $("#r"+count+" span").css({
          "float":"right"
        });
      }
      $("#cadre").append("<div>Classement des navigateurs utiliser</div>");
      $("#cadre").append("<div id='total_navigateur'></div>");
      // conteur pour ecrire et appeler les id sur les div
      var count = 0;
      // on recherche le total des navigateurs pour calculer le %
      for (var key in nav) {
        if (nav[key] == 0) {continue} //suprestion des nav vide
        count = count+1;
        $("#total_navigateur").append("<div id=nav"+count+">"+key+"<span>"+nav[key]+"</span></div>");
        // CSS dans var.js
        $("#nav"+count+"").css(barCSS);
        $("#nav"+count+"").css({
          // width en pourcentage
          "width": ""+(100*nav[key]/JSON.parse(retour).total_pages_vu)+"%"
        });
        $("#nav"+count+" span").css({
          "float":"right"
        });
      }
      $("#cadre").append("<div>Classement des OS utiliser</div>");
      $("#cadre").append("<div id='total_os'></div>");
      // conteur pour ecrire et appeler les id sur les div
      var count = 0;
      for (var key in os) {
        if (os[key] == 0) {continue} //suprestion des os vide
        count = count+1;
        $("#total_os").append("<div id=os"+count+">"+key+"<span>"+os[key]+"</span></div>");
        // CSS dans var.js
        $("#os"+count+"").css(barCSS);
        $("#os"+count+"").css({
          // width en pourcentage
          "width": ""+(100*os[key]/JSON.parse(retour).total_pages_vu)+"%"
        });
        $("#os"+count+" span").css({
          "float":"right"
        });
      }
      $("#cadre").accordion();
    },
    error : function(retour) {
      // message d'erreur et affichage du retoure ajax dans la console
      $("body").append("<p>une erreur est survenue, veuillez contacter l'administrateur</p>");
      console.log(retour);
    }
  });
}
