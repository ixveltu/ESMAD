import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// ----------------------------
// Scene, Camera, Renderer
// ----------------------------
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
 75,
 window.innerWidth / window.innerHeight,
 0.1,
 1000
);
camera.position.set(2, 2, 5);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

// ----------------------------
// Materials
// ----------------------------
const corVermelha = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const corVerde = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const corAmarelo = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const corRosa = new THREE.MeshBasicMaterial({ color: 0xff69b4 });
const corPivot = new THREE.MeshBasicMaterial({ color: 0xf0ff00 });

// ----------------------------
// Geometries
// ----------------------------
const bicepGeo = new THREE.BoxGeometry(2, 0.5, 0.5);
const antBracoGeo = new THREE.BoxGeometry(2, 0.5, 0.5);
const maoGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const pivotGeo = new THREE.SphereGeometry(0.2, 16, 16);

// ----------------------------
// Pivots
// ----------------------------
const ombroPivot = new THREE.Object3D();
scene.add(ombroPivot);

const ombroHelper = new THREE.AxesHelper(0.5);
ombroPivot.add(ombroHelper);

// ----------------------------
// Bicep
// ----------------------------
const bicep = new THREE.Mesh(bicepGeo, corVerde);
bicep.position.x = 1; // centro do bíceps relativo ao pivot
ombroPivot.add(bicep);

// ----------------------------
// Cotovelo pivot
// ----------------------------
const cotoveloPivot = new THREE.Object3D();
cotoveloPivot.position.x = 1; // fim do bíceps
bicep.add(cotoveloPivot);

const cotoveloSphere = new THREE.Mesh(pivotGeo, corPivot);
cotoveloPivot.add(cotoveloSphere);

const cotoveloHelper = new THREE.AxesHelper(0.5);
cotoveloPivot.add(cotoveloHelper);

// ----------------------------
// Antebraço
// ----------------------------
const antBraco = new THREE.Mesh(antBracoGeo, corVermelha);
antBraco.position.x = 1; // meio do antebraço a partir do pivot
cotoveloPivot.add(antBraco);

// ----------------------------
// Mão
// ----------------------------
const mao = new THREE.Mesh(maoGeo, corAmarelo);
mao.position.x = 1.25; // fim do antebraço
antBraco.add(mao);

// ----------------------------
// Controlo do teclado
// ----------------------------
const keys = {};
const rotSpeed = 0.05;

document.addEventListener("keydown", (e) => {
 keys[e.code] = true;
});
document.addEventListener("keyup", (e) => {
 keys[e.code] = false;
});

// ----------------------------
// Render loop
// ----------------------------
function animate() {
 // Rotacionar ombro
 if (keys["ArrowLeft"]) ombroPivot.rotation.y += rotSpeed;
 if (keys["ArrowRight"]) ombroPivot.rotation.y -= rotSpeed;
 if (keys["ArrowUp"]) ombroPivot.rotation.z += rotSpeed;
 if (keys["ArrowDown"]) ombroPivot.rotation.z -= rotSpeed;

 // Rotacionar cotovelo
 if (keys["KeyA"]) cotoveloPivot.rotation.y += rotSpeed;
 if (keys["KeyD"]) cotoveloPivot.rotation.y -= rotSpeed;
 if (keys["KeyW"]) cotoveloPivot.rotation.z += rotSpeed;
 if (keys["KeyS"]) cotoveloPivot.rotation.z -= rotSpeed;

 renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);

// ----------------------------
// Resize
// ----------------------------
window.addEventListener("resize", () => {
 camera.aspect = window.innerWidth / window.innerHeight;
 camera.updateProjectionMatrix();
 renderer.setSize(window.innerWidth, window.innerHeight);
 renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
