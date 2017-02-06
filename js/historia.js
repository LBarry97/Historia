//Declaracion Global{
var formElement=null;
var solucion=null;
var answerUserSelect=null;
var answerUserCheckbox = [];
var nota = 0; //La nota final del formulario
//Declaracion Global}

//Al cargar la pagina{
window.onload = function(){
	//El formulario{
	formElement = document.getElementById ("myform");
	formElement.onsubmit = function (){
		return false;
	}
	//El formulario}
	
	//Leer el fichero xml{
	xhttp.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200){
			gestionarXml(this);
		}
	};
	xhttp.open ("GET", "xml/historia.xml", true);
	xhttp.send ();
	//Leer el fichero xml}
}
//Al cargar la pagina}

//Tratar datos xml{
function gestionarXml (dadesXml){
	var xmlDoc = dadesXml.responseXML;/*Leer todos los datos del fiche xml
	y ponerlos en la variable "xmlDoc"*/
	
	//Extraer los datos{
	var titleInput=xmlDoc.getElementsByTagName ("title")[0].childNodes[0].nodeValue;
	ponerTitle(titleInput);
	//Extraer los datos}
}
//Tratar datos xml}

//Poner los datos en el html{
function ponerTitle ("titleInput"){//Funcion que pone el titulo
	document.getElementById ("jklm_001").innerHTML = titleInput;
}
//Poner los datos en el html}
