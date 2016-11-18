//EJERCICIO GUIADO
//Variables de los elementos HTML
var tablero = document.getElementById("tablero");
var lista = document.getElementById("lista");
var anadirLista = document.getElementById("anadirLista");
var formulario = document.getElementById("formulario");
//mi primera lista
var inputLista = document.getElementById("inputLista");
var guardar = document.getElementById("guardar");
  //variable que me ayuda a la funcionalidad de arrastrar
  //entre origen y destino
  var contadorID = 1;
//La primera tarjeta añade elementos a la lista, evento que se realiza entre las listas
anadirLista.addEventListener("click", function(e){
    //*Quita el candado de los elementos y que se puedan mover
  e.preventDefault();
  //"esconde" el elemento    
  anadirLista.style.display = "none";
  //llama a la funcion que hace "hace aparecer" la nueva tarjeta
  activarTarjeta();
  //Es como ser el personaje principal
  inputLista.focus();
  //agrego la clase "lsta" a mi elemento, el div de la lista inicial
  lista.classList.add("lsta");
});
//
//boton, evento que se realiza para crear una nueva lista, el boton
//se "traslada" a la nueva lista
guardar.addEventListener("click", function(){
  //se esconde el formulario que ingresa la nueva tarea
  formulario.style.display = "none";
  //funcion que agrega texto a la tarjeta
  agregarMensaje(inputLista, this);
  //funcion que crea una nueva lista
  insertarContenedor();
  //me aseguro que mi nueva lista no tenga ningun valor sea "nueva"
  inputLista.value = "";
  //*El evento se dispara sobre el elemento en el que se produjo
  // la colocación al finalizar la operación de arrastre. 
  // Un proceso de escucha se encargará de recuperar los datos 
  // que se arrastran e insertarlos en la ubicación de la colocación. 
  lista.addEventListener("drop", soltar);
  //Este evento se activa cuando el ratón/mouse se mueve
  //sobre un elemento cuando está teniendo lugar una
  //operación de arrastre.
  lista.addEventListener("dragover", arrastrarSobre);
  //Este evento se activa cuando el ratón/mouse sale de un
  //elemento mientras que está teniendo lugar una operación de arrastre.
  lista.addEventListener("dragleave", dejaArrastrar);
});
////////////////////////////  Comienzan las funciones /////////////////////////
  // funcion que "aparece" la nueva tarjeta e impide que se crea a lado de ella
  // la obliga a desplazarse para abajo
function activarTarjeta(){
  formulario.style.display = "block";
}
//Funcion que crea dos div que ayudan a crear el titulo en las listas y crear tarjetas
function agregarMensaje(texto, guardar){
  // es como llamar al "abuelo" del boton guardar, que se llama "anadirLista"
  var padre = guardar.parentElement.parentElement;
  //div que funciona como de la tarjeta
  var tarjeta = document.createElement("div");
  //div que funciona como "marco" de la tarjeta
  var newItem = document.createElement("div");
  //linea de codigo que guarda el texto ingresado, titulo de la lista
  newItem.innerText = texto.value;
  //inserta el nuevo elemento newItem como primer hijo del padre, ver como arregla
  padre.insertBefore(newItem, padre.childNodes[0]);
  //agregar clase al nuevo elemento
  newItem.classList.add("nuevalsta");
  //
  //agregar mensaje a la tarjeta
  tarjeta.innerText = "Añadir una tarjeta..."
  //agregar hijo al padre del boton guardar
  padre.appendChild(tarjeta);
  //se le pone una clase
  tarjeta.classList.add("tarjeta2");
  //
  //La pretarjeta tine una funcion que ayuda a crear mas tarjetas
  tarjeta.addEventListener("click", function(){
    tarjeta.style.display = "none";
    anadirTarjeta(padre);
  });
}
//funcion que me permite crear lo que sera una nueva "lista"
function insertarContenedor(){
  //se crea un div como contenedor de la nueva "lista"
  var nuevoCampo = document.createElement("div");
  //mi nueva "lista" es agregada como nuevo hijo al div que funciona como tablero
  tablero.appendChild(nuevoCampo);
  //
  //el nuevo campo se debe agregar al padre y al padre del padre 
  nuevoCampo.insertBefore(anadirLista, nuevoCampo.childNodes[0]);
  nuevoCampo.insertBefore(formulario, nuevoCampo.childNodes[0]);
  //se agregan clases al nuevo campo
  nuevoCampo.classList.add("nuevocampo");
  nuevoCampo.classList.add("lsta");
  //por default el div anadirlista no permite otros elementos en su misma linea
  anadirLista.style.display = "block";
  //*El evento se dispara sobre el elemento en el que se produjo
  // la colocación al finalizar la operación de arrastre. 
  // Un proceso de escucha se encargará de recuperar los datos 
  // que se arrastran e insertarlos en la ubicación de la colocación.
  nuevoCampo.addEventListener("drop", soltar);
  //Este evento se activa cuando el ratón/mouse se mueve
  //sobre un elemento cuando está teniendo lugar una
  //operación de arrastre.
  nuevoCampo.addEventListener("dragover", arrastrarSobre);
  //Este evento se activa cuando el ratón/mouse sale de un
  //elemento mientras que está teniendo lugar una operación de arrastre.
  nuevoCampo.addEventListener("dragleave", dejaArrastrar);
}
//funcion para agregar nueva tarjetas
function anadirTarjeta(padre){
  //variables necesarias para crear una nueva tarjeta. Creacion de nodos-elementos
  //card es mi nueva tarjeta
  var card = document.createElement("div");
  var textArea = document.createElement("textarea");
  var btnAnadir = document.createElement("button");
  //se añade textarea como primer hijo del div car
  card.insertBefore(textArea, card.childNodes[0]);
  //se añade boton como segundo hijo del div card
  card.insertBefore(btnAnadir, card.childNodes[1]);
  padre.appendChild(card);
  //
  //se agrega el tipo al boton
  btnAnadir.type = "button";
  //se agrega texto al boton
  btnAnadir.innerText = "Añadir";
  //
  //al div card le agrego una clase
  card.classList.add("card");
  //al textarea le agrego una clase
  textArea.classList.add("textarea");
  //al boton le agrego una clase
  btnAnadir.classList.add("boton");
  //
  //en este punto la textArea contiene toda la atencion cuando la funcion se activa
  textArea.focus();
  //
  //mi nuevo boton llama a una funcion que ayuda a guarda la tarjeta creada dentro de la lista
  btnAnadir.addEventListener("click",function(){
    card.style.display = "none";
    guardarTarjeta(padre,textArea);
  });
}
//
//funcion que me permite conservar la nueva tarjeta dentro la lista
function guardarTarjeta(padre,textArea){
  //variable que crea un nuevo div
  var campoTarjeta = document.createElement("div");
  //"rescata" lo que se escribio en la tarjeta
  campoTarjeta.innerText = textArea.value;
  //esta linea inserta la tarjeta como ultimo hijo de la lista
  padre.insertBefore(campoTarjeta, padre.lastChild);
  //agregar los estilos de la tarjeta creada y guardada en la lista
  campoTarjeta.classList.add("tarjeta1");
    //Propiedad que hace posible a la tarjeta moverse
  campoTarjeta.setAttribute("draggable","true");
  //Propiedad id para poder mover, hasta donde se ha investidado
    //es necesario que los elementos que se mueven tengan id
  campoTarjeta.setAttribute("id", "card.1"+contadorID);
  padre.appendChild(campoTarjeta.previousSibling);
  //las tarjetas no permiten elementos en su misma linea, desplazan las nuevas tarjetas abajo
  padre.lastChild.style.display = "block";
    //*Se ejecuta sobre un elemento cuando se inicia una operación de arrastre. 
  campoTarjeta.addEventListener("dragstart", arrastrar);
    //El origen del arrastre recibirá un evento dragend cuando la operación se
    // haya completado, tanto si tuvo éxito como si no
  campoTarjeta.addEventListener("dragend", terminaArrastrar);
  //Como se maneja una lista, el contador sirve ademas de id
  //como indice de las tareas en la lista
  contadorID++;
}
//Funciones para Drag Drop y estilos para "seleccionar" "arrastrar" "colocar"
//Funcion que arrastra y agrega estilos mientras se arrastra
function arrastrar(e) {
  //Origen
  //El método dataTransfer.setData () define el tipo de datos y el valor de los datos arrastrados
  e.dataTransfer.setData("text", this.id);
  //Agregando estilos al arrastrar
  this.style.backgroundColor = "#0C5560";
  this.style.color = "white";
  this.style.opacity = "0.4";
}
//Funcion que determina estilos cuando la tarjeta pasa sobre otro elemento
function arrastrarSobre(e) {
  e.preventDefault();
  //agregar estilo
  this.style.backgroundColor = "#67D3FA";
}
//Funcion para el elemento destino y estilos
function soltar(e) {
  //Destino
  //Obtener los datos arrastrados con el método dataTransfer.getData ().
  var idArrastrado = e.dataTransfer.getData("text");
  //Las tarjetas tienen id
  //Obtener los datos arrastrados con el método dataTransfer.getData ().
  var elementoArrastrado = document.getElementById(idArrastrado);
  //esta linea me ayuda a poner la tarjeta "donde quiero"
  this.insertBefore(elementoArrastrado, this.childNodes[1]);
  //Estilos
  this.style.backgroundColor = "#E2E4E6";
  this.classList.add("animate");
}
//Funcion de estilos para cuando termina de arrastrar
function terminaArrastrar(e) {
  //agregando estilos
  this.style.opacity = null;
}
//Funcion que se activa cuando se coloca la tarjeta a la nueva lista,
//el div padre sufre los cambios
function dejaArrastrar(e) {
  //agregando estilos
  this.style.backgroundColor = "#E2E4E6";
  this.classList.remove("animate");
}