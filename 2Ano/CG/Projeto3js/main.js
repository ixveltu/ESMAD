import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/*********************
* SCENE 
* *******************/
// create an empty scene, that will hold all our elements such as objects, cameras and lights
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75, // FOV
    window.innerWidth / window.innerHeight, // aspect ratio
    0.1, 1000); // near and far

camera.position.z = 5;  // move the camera back to the position (0, 0, 5)
camera.position.y = -1;  // move the camera up to the position (0, 2, 5)
camera.position.x = 2;  // move the camera right to the position (2, 0, 5)
/*********************
 * RENDERER
 * *******************/



const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // set the size of the renderer to the size of the window
renderer.setClearColor("#000000");  // set the background color of the scene
document.body.appendChild(renderer.domElement); // add the renderer element to the HTML document




// controlo de órbita
const controls = new OrbitControls(camera, renderer.domElement); // add orbit controls to the camera

renderer.setAnimationLoop(animate);

function animate() {

    renderer.render(scene, camera); // render the scene from the perspective of the camera
}