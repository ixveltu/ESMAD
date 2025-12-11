import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const scene = new THREE.Scene();
scene.background = new THREE.Color("#ffcc99"); // igual a renderer.clearColor("#ffcc99"")

const camera = new THREE.PerspectiveCamera(75, innerWidth / innerHeight, 0.1, 100);
camera.position.z = 6;

const renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias para bordas mais suaves
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

// USE ORBIT CONTROLS
const controls = new OrbitControls(camera, renderer.domElement);

// ------------------------------------------------------
// MATERIAIS que não requerem iluminação: normal, basic
// ------------------------------------------------------
const matBranco = new THREE.MeshBasicMaterial({ color: 0xffffff });
const matPreto = new THREE.MeshBasicMaterial({ color: 0x000000 });

const matCorpo = new THREE.MeshBasicMaterial({ color: "#7ebefe" }); // azul-claro
const matMembro = new THREE.MeshBasicMaterial({ color: "#3399ff" }); // azul médio

// ------------------------------------------------------
// CORPO (elemento base do boneco)
// ------------------------------------------------------
const corpoGeo = new THREE.BoxGeometry(1, 1.5, 1);
const corpo = new THREE.Mesh(corpoGeo, matCorpo);


// ------------------------------------------------------
// FACE 
// ------------------------------------------------------
const faceGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
const face = new THREE.Mesh(faceGeo, matCorpo);
face.position.y = 1.75;

// ------------------------------------------------------
// Olhos (cada olho é um Group)
// ------------------------------------------------------
function criarOlho(offsetX) {
    const olho = new THREE.Group();
    olho.position.set(offsetX, 0.15, 0.7);

    const esferaGeo = new THREE.SphereGeometry(0.15, 12, 8);
    const bolaOlho = new THREE.Mesh(esferaGeo, matBranco);
    olho.add(bolaOlho);

    // Pupila
    const pupilaGeo = new THREE.SphereGeometry(0.075, 16, 16);
    const pupila = new THREE.Mesh(pupilaGeo, matPreto);
    pupila.position.z = 0.1;
    olho.add(pupila);

    return olho;
}

const olhoEsq = criarOlho(-0.36);
const olhoDir = criarOlho(0.36);


// ------------------------------------------------------
// Braços 
// ------------------------------------------------------
function criarBraco(offsetX) {

    const geo = new THREE.BoxGeometry(0.25, 1, 0.25);
    const braco = new THREE.Mesh(geo, matMembro);
    braco.position.x = offsetX; // ajustar a malha para baixo em relação ao pivot
    braco.position.y = -0.5
    return braco;
}

const bracoEsq = criarBraco(-0.15);
const bracoDir = criarBraco(0.15);


// ------------------------------------------------------
// Pernas (sem pivot de rotação, pois não vão mexer)
// ------------------------------------------------------
function criarPerna(offsetX) {

    const geo = new THREE.BoxGeometry(0.25, 0.4, 0.25);
    const perna = new THREE.Mesh(geo, matMembro);
    perna.position.x = offsetX;
    perna.position.y = -1.15;

    return perna;
}

const pernaEsq = criarPerna(-0.25);
const pernaDir = criarPerna(0.25);
scene.add(pernaEsq, pernaDir);

const bracoDirPivot = new THREE.Object3D
bracoDirPivot.add(bracoDir)
bracoDirPivot.position.x = 0.5
bracoDirPivot.position.y = 0.75

const bracoEsqPivot = new THREE.Object3D
bracoEsqPivot.add(bracoEsq)
bracoEsqPivot.position.x = -0.5
bracoEsqPivot.position.y = 0.75

const olhoEsqPivot = new THREE.Object3D()
olhoEsqPivot.add(olhoEsq)
olhoEsqPivot.position.y = 1.6

const olhoDirPivot = new THREE.Object3D()
olhoDirPivot.add(olhoDir)
olhoDirPivot.position.y = 1.6

face.add(olhoDir, olhoEsq)

corpo.add(bracoDirPivot, bracoEsqPivot, face, pernaDir, pernaEsq)

scene.add(corpo)

// ------------------------------------------------------
// Função utilitária: adicionar outline preto
// ------------------------------------------------------
function adicionarOutline(mesh, scale = 0.02) {
    const geo = new THREE.EdgesGeometry(mesh.geometry);

    // Contorno preto — ligeiramente maior
    const outline = new THREE.LineSegments(
        geo,
        new THREE.LineBasicMaterial({ color: 0x000000 })
    );
    outline.scale.set(1, 1 + scale, 1 + scale);
    outline.name = "outline";
    mesh.add(outline);
}

// percorrer a hierarquia e adicionar outline a cada Mesh
scene.traverse(child => {
    // and search for Meshes of geometry BoxGeometry
    if (child.isMesh && child.name == "" && child.geometry instanceof THREE.BoxGeometry) {
        adicionarOutline(child);
    }
});



// ------------------------------------------------------
// ANIMAÇÃO
// ------------------------------------------------------
function animate() {
    // obter um tempo baseado no número de frames renderizados
    const t = renderer.info.render.frame * 0.02;

    // Rodar o corpo todo
    corpo.rotation.y = Math.sin(t * 2) * 0.4;

    // Rodar a face
    // face.rotation.y = Math.sin(t) * 0.4;

    // Mover os braços
    bracoEsqPivot.rotation.z = -0.5 + Math.sin(t * 2) * 0.5;
    bracoDirPivot.rotation.z = 0.5 - Math.sin(t * 2) * 0.5;

    // Piscar os olhos 
    const blink = Math.abs(Math.sin(t));
    const escalaOlho = THREE.MathUtils.lerp(1, 0.1, blink);
    olhoEsq.scale.y = escalaOlho;
    olhoDir.scale.y = escalaOlho;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);



/************************
* handle browser resize
* **********************/
window.addEventListener('resize', event => {
    // update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    // updates the camera projection matrix, 
    // which is the matrix that converts from 3D world coordinates 
    // to 2D screen coordinates   
    camera.updateProjectionMatrix();
    // update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
});
