

    



/* =========================================================
   CALCULADORA DE RECETAS (recetas.html)
   Las cantidades base estan escritas para 2 personas en el
   atributo data-base de cada <span class="cantidad">.
   Para 4 personas se multiplica x2 y para 6 personas x3.
   ========================================================= */
const nombres = ["Lucía", "Martina", "Pedro"];
const emails = ["lucia.demo@gmail.com", "martina.demo@gmail.com", "pedro.demo@gmail.com"];
const claves = ["1234", "abcd", "pedro99"];

// Devuelve la posición de un valor en una lista, o -1 si no está.
function buscarPosicion(lista, valor) {
  for (let i = 0; i < lista.length; i++) {
    if (lista[i] == valor) {
      return i;
    }
  }
  return -1;
}

// Escribe un mensaje en el elemento con ese id.
function mostrarMensaje(idMensaje, texto) {
  document.getElementById(idMensaje).innerHTML = texto;
}

function registrarUsuario() {
  const nombre = document.getElementById("registro-nombre").value;
  const email = document.getElementById("registro-email").value;
  const clave = document.getElementById("registro-clave").value;
  const clave2 = document.getElementById("registro-clave2").value;

  if (nombre == "" || email == "" || clave == "" || clave2 == "") {
    mostrarMensaje("mensaje-registro", "Completá todos los campos.");
    return;
  }
  if (clave != clave2) {
    mostrarMensaje("mensaje-registro", "Las contraseñas no coinciden.");
    return;
  }
  if (buscarPosicion(emails, email) != -1) {
    mostrarMensaje("mensaje-registro", "Ese email ya está registrado.");
    return;
  }

  nombres.push(nombre);
  emails.push(email);
  claves.push(clave);
  mostrarMensaje("mensaje-registro", "¡Bienvenida, " + nombre + "! Te registraste con éxito.");
}

function iniciarSesion() {
  const email = document.getElementById("login-email").value;
  const clave = document.getElementById("login-clave").value;

  if (email == "" || clave == "") {
    mostrarMensaje("mensaje-login", "Ingresá tu email y tu contraseña.");
    return;
  }

  const posicion = buscarPosicion(emails, email);

  if (posicion == -1) {
    window.alert("No estás registrado");
    return;
  }
  if (claves[posicion] != clave) {
    mostrarMensaje("mensaje-login", "Contraseña incorrecta.");
    return;
  }

  mostrarMensaje("mensaje-login", "¡Bienvenida, " + nombres[posicion] + "! Pudiste ingresar.");
  mostrarPanel(nombres[posicion]);
}

// Muestra los formularios y esconde el panel de bienvenida
function mostrarFormularios() {
  document.getElementById("panel-sesion").style.display = "none";
  document.getElementById("contenedor-cuenta").style.display = "flex";
}

// Esconde los formularios y muestra el panel de bienvenida
function mostrarPanel(nombre) {
  document.getElementById("saludo-usuario").innerHTML = "¡Hola, " + nombre + "! Pudiste ingresar.";
  document.getElementById("panel-sesion").style.display = "flex";
  document.getElementById("contenedor-cuenta").style.display = "none";
}

function cerrarSesion() {
  mostrarMensaje("mensaje-login", "");
  mostrarFormularios();
}


/* =========================================================
   CALCULADORA DE RECETAS (recetas.html)
   Las cantidades están escritas para 2 personas.
   ========================================================= */

// Dumplings
const dumplingsCantidades = [200, 100, 150, 10, 2];
const dumplingsUnidades = ["g de ", "ml de ", "g de ", "g de ", "cebollas de "];
const dumplingsIngredientes = ["harina", "agua", "cerdo picado", "jengibre", "verdeo"];

// Arancinis
const arancinisCantidades = [200, 100, 80, 2, 300];
const arancinisUnidades = ["g de ", "g de ", "g de ", "", "ml de "];
const arancinisIngredientes = ["arroz", "queso", "pan rallado", "huevos", "aceite"];

// Sando de cerdo
const sandoCantidades = [300, 2, 60, 4, 300];
const sandoUnidades = ["g de ", "", "ml de ", "g de ", "g de "];
const sandoIngredientes = ["bondiola de cerdo", "panes brioche", "barbacoa", "sal", "papas"];

// Recalcula la lista de ingredientes y el mensaje para una receta
function calcularReceta(personas, cantidades, unidades, ingredientes, idLista, idMensaje) {
  const factor = personas / 2;
  let texto = "";

  for (let i = 0; i < cantidades.length; i++) {
    texto = texto + "<li>" + (cantidades[i] * factor) + " " + unidades[i] + ingredientes[i] + "</li>";
  }
  document.getElementById(idLista).innerHTML = texto;

  let frase = "";
  if (personas == 2) {
    frase = "Ideal para una cena de a dos.";
  } else if (personas == 4) {
    frase = "Perfecta para compartir en familia.";
  } else {
    frase = "Ideal para recibir a tus amigos.";
  }
  document.getElementById(idMensaje).innerHTML = "Receta calculada para " + personas + " personas. " + frase;
}

// Una función por receta: la llaman los botones
function dumplings(personas) {
  calcularReceta(personas, dumplingsCantidades, dumplingsUnidades, dumplingsIngredientes, "lista-dumplings", "mensaje-dumplings");
  document.getElementById("consejo-dumplings").innerHTML = "Con estas cantidades salen unos " + (12 * personas / 2) + " dumplings. Tip: dejá descansar la masa 20 minutos antes de estirarla.";
}

function arancinis(personas) {
  calcularReceta(personas, arancinisCantidades, arancinisUnidades, arancinisIngredientes, "lista-arancinis", "mensaje-arancinis");
  document.getElementById("consejo-arancinis").innerHTML = "Con estas cantidades salen unos " + (6 * personas / 2) + " arancinis. Tip: usá arroz del día anterior, queda más firme.";
}

function sando(personas) {
  calcularReceta(personas, sandoCantidades, sandoUnidades, sandoIngredientes, "lista-sando", "mensaje-sando");
  document.getElementById("consejo-sando").innerHTML = "Con estas cantidades salen " + (2 * personas / 2) + " sandwiches. Tip: tostá un poco el pan antes de armarlo.";
}