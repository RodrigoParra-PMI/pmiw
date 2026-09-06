let caminar = [];
let frame = 0;
let posicionX = 700;
let atacar = [];
let estaAtacando = false;
let estaCaminando = false;
let inicioAtaque = 0;
let fondo;
function preload() {
  fondo = loadImage("assets/fondo.png");
  for (let i = 0; i < 3; i++) {
    caminar[i] = loadImage("assets/caminar/" + nf(i + 1, 4) + ".png");
  }
  for (let i = 0; i < 4; i++) {
    atacar[i] = loadImage("assets/atacar/" + nf(i + 1, 4) + ".png");
  }
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  image(fondo, 0, 0, 800, 600);
  if (estaAtacando) {
    frame = obtenerFrame(4, 200);
    if (frame >= 4) {
      estaAtacando = false;
      frame = 0;
    } else {
      mostrarAnimacion(atacar, frame, posicionX, 425);
    }
  } else if (estaCaminando) {
    frame = obtenerFrame(3, 200);
    posicionX = posicionX - 2;
    if (posicionX < -caminar[frame].width) {
      posicionX = width;
    }
    mostrarAnimacion(caminar, frame, posicionX, 425);
  } else {
    image(caminar[0], posicionX, 425);
  }
}

function keyPressed() {
  if (key === 'c') {
    estaCaminando = true;
  }
  if (key === 'a') {
    estaAtacando = true;
    inicioAtaque = millis();
  }
  if (key === 'r') {
    reiniciarAnimacion(700, false);
  }
}

function mostrarAnimacion(animacion, frameActual, x, y) {
  image(animacion[frameActual], x, y);
}

function obtenerFrame(cantidadFrames, velocidad) {
  if (estaAtacando) {
    return floor((millis() - inicioAtaque) / velocidad);
  } else {
    return floor(millis() / velocidad) % cantidadFrames;
  }
}

function reiniciarAnimacion(posicionInicial, estadoInicial) {
  posicionX = posicionInicial;
  estaAtacando = estadoInicial;
  estaCaminando = false;
  frame = 0;
  inicioAtaque = millis();
}
