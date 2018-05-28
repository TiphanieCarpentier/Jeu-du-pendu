//Stockage du mot mystère
var strMystere = prompt("Entrez le mot à faire deviner (pas de caractères spéciaux ni de chiffres)", "Mystère");

if (strMystere !== null) {  //Traitement des accents
 	var motMystere=strMystere.toUpperCase();
 	  var accent    = "ÀÁÂÃÄÅÒÓÔÕÕÖØÈÉÊËÇÐÌÍÎÏÙÚÛÜÑŠŸŽ";
      var sansAccent = "AAAAAAOOOOOOOEEEECDIIIIUUUUNSYZ";
      var l, a;

      for (l = 0; l < motMystere.length; l++) {
        a = accent.indexOf(motMystere.charAt(l));
        if (a !== -1) {
           motMystere = motMystere.replace(motMystere.charAt(l), sansAccent.charAt(a));
        }
      }
}

else {	
	alert ("Veuillez entrer un mot");
}

//Création de la zone "mot" (tableau avec mot caché + ligne de tirets)
var motCache= "<table><tr id='idMotCache'>"; 
var motTirets= "<tr>";

for (i=0; i<motMystere.length; i++) {
	motCache += "<td id="+ i +">" + motMystere.charAt(i) + "</td>";
}

motCache += "</tr>";
for (j=0; j<motMystere.length; j++) {
	motTirets += "<td> - </td>"; 
}
motTirets += "</tr></table>";

document.getElementById("zoneMot").innerHTML = motCache + " " + motTirets;
document.getElementById("idMotCache").style.visibility = "hidden";

//Enregistrement de la lettre tapée sur le clavier 
var lettreTapee="";
document.getElementById("champrecherche").onkeydown = function() {recupLettreTapee()};
function recupLettreTapee() {
	lettreTapee = event.key;
	lettreTapee = lettreTapee.toUpperCase();
}

//Lettre correcte ou non + positionnement dans mot mystère
var lettresCorrectes=[];
var lettresIncorrectes=[];
document.getElementById("btnValid").onclick = function() {nouveauCoup()};
function nouveauCoup() {
	if (lettreTapee=="") {
		alert ("Veuillez entrer une lettre");
	}
	else {
	var index = motMystere.search(lettreTapee);
	if (index!=-1) {

		//Cas où la lettre est contenue plus d'une fois dans le mot mystère
		var b, n;
		for (b = 0; b < motMystere.length; b++) {
        	if (motMystere.charAt(b)==lettreTapee) {
          		lettresCorrectes.push(lettreTapee);
				document.getElementById(b).style.visibility="visible";	// Affiche la ou les lettres correctes
	        }
	      }
		} 
	else {
			lettresIncorrectes.push(lettreTapee);
			document.getElementById("listeIncorrecte").innerHTML = "Lettres incorrectes déjà proposées : "+ lettresIncorrectes;
	}
		if (lettresCorrectes.length==motMystere.length) { //Cas de victoire
			alert ("GAGNE!"); 
			}
document.getElementById("champrecherche").value = "";

//Actualisation de l'image du pendu en fonction du nombre d'erreurs
if (lettresIncorrectes.length==1) { 
	document.getElementById("imagePendu").src= "pendu1.png";
}

if (lettresIncorrectes.length==2) { 
	document.getElementById("imagePendu").src= "pendu2.png";
}

if (lettresIncorrectes.length==3) { 
	document.getElementById("imagePendu").src= "pendu3.png";
}

if (lettresIncorrectes.length==4) { 
	document.getElementById("imagePendu").src= "pendu4.png";
}

if (lettresIncorrectes.length==5) { 
	document.getElementById("imagePendu").src= "pendu5.png";
}

if (lettresIncorrectes.length==6) { //Cas de défaite (6 erreurs)
	document.getElementById("imagePendu").src= "pendu6.png";
	alert ("Trop de tentatives incorrectes. PERDU!");
	} 
}
}
		
//Nouveau jeu
document.getElementById("btnNouvJeu").addEventListener("click", function() {
	location.reload();
});

//Appui sur "ENTRER" équivalent à bouton VALIDER
/*
var input = document.getElementById("champrecherche");
input.addEventListener("keyup", function(event) {
    //event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("btnValid").click();
    }
});
*/