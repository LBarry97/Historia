var formElement=null;
var xmlDoc=null;

var question;
var questions=0;

var numOpt=0;
var opcionesArray=[];//Contendra todas las opciones del xml
var intI=0;//Guarda el valor de la "i"
var selPos=0;//Marca la posicion del "select"
var boxPos=0;//Marca la posicion del "checkbox"

var nota = 0.0; //La nota final del formulario

var contQues=0;//Contador de las preguntas
var answerXml=null;//Respuesta del xml
var answerUser=null;//Respuesta del usuario


//Al cargar la pagina{
window.onload = function(){
	//El formulario{
	formElement = document.getElementById ("myform");
	formElement.onsubmit = function (){
		corregirTipoText();
		corregirTiposSelect();
		corregirTiposRadio();
		corregirTiposCheckbox();
		corregirTiposSelMultiple();
		mostrarNota();
		formElement.reset();
		return false;
	}
	//El formulario}
	
	//Leer el fichero xml{
	var xhttp = new XMLHttpRequest ();
	xhttp.onreadystatechange = function (){
		if (this.readyState == 4 && this.status == 200){
			gestionarXml(this);
		}
	};
	xhttp.open ("GET", "https://rawgit.com/LBarry97/Historia/master/xml/historia.xml", true);
	xhttp.send ();
	//Leer el fichero xml}
	document.getElementById("sub").onclick = function () {//Al hacer click en corregir
		document.getElementById("list").style.display = "block";
	}
	document.getElementById("acep").onclick = function () {//Al hacer click en corregir
		document.getElementById("list").style.display = "none";
	}
}
//Al cargar la pagina}

function gestionarXml (dadesXml){
	xmlDoc = dadesXml.responseXML;/*Leer todos los datos del fiche xml
	y ponerlos en la variable "xmlDoc"*/
	leerYpintar();//Pinta por completo el "html"
}

function leerYpintar(){
	questions=10;//Hasta que pregunta leeo y pinto
	for(i=0;i<questions;i++){
		if(i==0||i==1){//Questions de tipo "text"
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
		}
		if(i==2||i==3){//Questions de tipo "select"
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
			numOpt=xmlDoc.getElementsByTagName ("question")[i].getElementsByTagName ('option').length;//¿Quantas opciones hay?
			intI=i;//Guarda el valor de la "i"
			for(y=0;y<numOpt;y++){
				opcionesArray[y]=xmlDoc.getElementsByTagName ("question")[intI].getElementsByTagName('option')[y].innerHTML;
			}
			
			var select=document.getElementsByTagName ("select")[selPos];
			for(y=0;y<numOpt;y++){
				var option=document.createElement("option");
				option.text=opcionesArray[y];
				option.value=y+1;
				select.options.add(option);
			}
			selPos++;
		}
		if(i==4||i==5){//Questions de tipo "radio"
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
			numOpt=xmlDoc.getElementsByTagName ("question")[i].getElementsByTagName ('option').length;//¿Quantas opciones hay?
			intI=i;//Guarda el valor de la "i"
			for(y=0;y<numOpt;y++){
				opcionesArray[y]=xmlDoc.getElementsByTagName ("question")[intI].getElementsByTagName('option')[y].innerHTML;
			}
			var div=document.getElementsByTagName("div")[boxPos]
			
			for(y=0;y<numOpt;y++){;
				var input=document.createElement("input");
				var label=document.createElement("label");
				var espacio1=document.createElement("br");
				var espacio2=document.createElement("br");
				input.type="radio";
				if(i==4){
					input.name="radio1";//Para la primera pregunta
				}else{
					input.name="radio2";//Para la segunda pregunta
				}
				input.value=y+1;
				label.innerHTML=opcionesArray[y];//Escribir la "opcion" del xml en el "label"
				div.appendChild(input);//Añadir "input"
				div.appendChild(label);//Añadir "label"
				div.appendChild(espacio1);//Añadir "espacio"
				div.appendChild(espacio2);//Añadir "espacio"
			}
			boxPos++;
		}
		if(i==6||i==7){//Questions de tipo "checkbox"
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
			numOpt=xmlDoc.getElementsByTagName ("question")[i].getElementsByTagName ('option').length;//¿Quantas opciones hay?
			intI=i;//Guarda el valor de la "i"
			for(y=0;y<numOpt;y++){
				opcionesArray[y]=xmlDoc.getElementsByTagName ("question")[intI].getElementsByTagName('option')[y].innerHTML;
			}
			var div=document.getElementsByTagName("div")[boxPos]
			for(y=0;y<numOpt;y++){
				var linea=document.createElement("p");
				var node=document.createTextNode(opcionesArray[y]);
				var input=document.createElement("input");
				input.type="checkbox";
				if(i==6){
					input.name="check1";//Para la primera pregunta
				}else{
					input.name="check2";//Para la segunda pregunta
				}
				input.value=y+1;
				linea.appendChild(input);
				linea.appendChild(node);
				div.appendChild(linea);
			}
			boxPos++;
		}
		if(i==8||i==9){//Questions de tipo "multiple"
			question =xmlDoc.getElementsByTagName ("title")[i].innerHTML;//Leer pregunta del xml(xmlDoc)
			document.getElementsByTagName ("h3")[i].innerHTML = question;//Pintar en el HTML
			numOpt=xmlDoc.getElementsByTagName ("question")[i].getElementsByTagName ('option').length;//¿Quantas opciones hay?
			intI=i;//Guarda el valor de la "i"
			for(y=0;y<numOpt;y++){
				opcionesArray[y]=xmlDoc.getElementsByTagName ("question")[intI].getElementsByTagName('option')[y].innerHTML;
			}
			
			var select=document.getElementsByTagName ("select")[selPos];
			for(y=0;y<numOpt;y++){
				var option=document.createElement("option");
				option.text=opcionesArray[y];
				option.value=y+1;
				select.options.add(option);
			}
			selPos++;
		}
	}

}

function corregirTipoText(){
	while(contQues<2){
		answerXml=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[0].innerHTML;//Cojer respuesta del xml
		
		answerUser=formElement.elements[contQues].value;//Cojer respuesta del usuario
		
		answerUser=answerUser.toLowerCase();//Pasar lo a minusculas
		
		miNota();//Poner nota
		
		contQues++;//Pasar a la siguiente pregunta
	}
}

function corregirTiposSelect(){
	while(contQues<4){
		answerXml=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[0].innerHTML;//Cojer respuesta del xml
		
		answerUser=formElement.elements[contQues].selectedIndex;//Cojer respuesta del usuario
		
		answerUser=answerUser-1;//Restar una porque tengo la pordefecto
		
		miNota();//Poner nota
		
		contQues++;//Pasar a la siguiente pregunta
	}
}

function corregirTiposRadio(){
	while(contQues<6){
		answerXml=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[0].innerHTML;//Cojer respuesta del xml
		
		answerXml=parseInt(answerXml);//Pasarlo a entero
		if(contQues==4){
			answerUser=-1;//Inicializar la variable
			for(i = 0; i < formElement.radio1.length; i++){//Recore los "input" de name igual "radio1"
				if(formElement.radio1[i].checked){//Si este input fue seleccionado
					answerUser=i;//Cojer la posicion que se selecciono
					i=formElement.radio1.length;//Provocar el fin del boocle
				}
			}
		}else{
			answerUser=-1;//Inicializar la variable
			for(i = 0; i < formElement.radio2.length; i++){//Recore los "input" de name igual "radio1"
				if(formElement.radio2[i].checked){//Si este input fue seleccionado
					answerUser=i;//Cojer la posicion que se selecciono
					i=formElement.radio2.length;//Provocar el fin del boocle
				}
			}
		}
		
		miNota();//Poner nota
		
		contQues++;//Pasar a la siguiente pregunta
	}
}

function corregirTiposCheckbox(){
	while(contQues<8){
		answerXml=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[0].innerHTML;//Cojer respuesta del xml
		
		answerXml=parseInt(answerXml);//Pasarlo a entero
		
		var check=0;//Contador de numero de selecciones
		
		if(contQues==6){
			answerUser=-1;//Inicializar la variable
			
			for(i = 0; i < formElement.check1.length; i++){//Recore los "input" de name igual "check1"
				if(formElement.check1[i].checked){//Si este input fue seleccionado
					check++;//Suma al contador 1
				}
			}
			
			if(check==1){//Si solo se selecciono una respuesta
				for(i = 0; i < formElement.check1.length; i++){//Recore los "input" de name igual "check1"
					if(formElement.check1[i].checked){//Si este input fue seleccionado
						answerUser=i;//Cojer la posicion que se selecciono
						i=formElement.check1.length;//Provocar el fin del boocle
					}
				}
			}
			
		}else{
			answerUser=-1;//Inicializar la variable
			
			for(i = 0; i < formElement.check2.length; i++){//Recore los "input" de name igual "check2"
				if(formElement.check2[i].checked){//Si este input fue seleccionado
					check++;//Suma al contador 1
				}
			}
			
			if(check==1){//Si solo se selecciono una respuesta
				for(i = 0; i < formElement.check2.length; i++){//Recore los "input" de name igual "check2"
					if(formElement.check2[i].checked){//Si este input fue seleccionado
						answerUser=i;//Cojer la posicion que se selecciono
						i=formElement.check2.length;//Provocar el fin del boocle
					}
				}
			}
		}
		
		miNota();//Poner nota
		
		contQues++;//Pasar a la siguiente pregunta
	}
}

function corregirTiposSelMultiple(){
	selPos=selPos-2;//La posicion del select
	while(contQues<10){
		
		answerXml=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[0].innerHTML;//Cojer respuesta 1 del xml
		answerXml+=xmlDoc.getElementsByTagName("question")[contQues].getElementsByTagName("answer")[1].innerHTML;//Cojer respuesta 2 del xml
		
		answerUser="";//Inicializar la variable


		if(contQues==8){
			numOpt=document.getElementsByTagName("select")[selPos].getElementsByTagName("option").length;//Contar el numero de options
			
			for(i = 0; i < numOpt; i++){
			
				var sel=document.getElementsByTagName("select")[selPos].getElementsByTagName("option")[i];//Opcion
			
				if(sel.selected){//Si este input fue seleccionado
					answerUser+=i;//Cojer la posicion que se selecciono
				}
			}
				
		}else{
			numOpt=document.getElementsByTagName("select")[selPos].getElementsByTagName("option").length;//Contar el numero de options
			
			for(i = 0; i < numOpt; i++){
			
				var sel=document.getElementsByTagName("select")[selPos].getElementsByTagName("option")[i];//Opcion
			
				if(sel.selected){//Si este input fue seleccionado
					answerUser+=i;//Cojer la posicion que se selecciono
				}
			}
		}

		miNota();//Poner nota
		
		contQues++;//Pasar a la siguiente pregunta
		selPos++;//Pasamos al siguiente select
	}
}

function miNota(){
	if(answerUser==answerXml){
		nota+=1;//Sumar un punto a "nota"
	}else{
		if(nota>=1){
			nota-=0.5;//Restar nota 0.5 puntos
		}else{
			nota=0;//(0.5-0.5)=0
		}
	}
}

function mostrarNota(){
	if(nota<5){
		document.getElementById("emoti").src="img/enf.png";
	}
	document.getElementById("nota").innerHTML=nota;//Muestra la nota
}
