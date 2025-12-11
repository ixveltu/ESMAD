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

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight); // set the size of the renderer to the size of the window
renderer.setClearColor("#000000");  // set the background color of the scene
document.body.appendChild(renderer.domElement); // add the renderer element to the HTML document

// SPHERE
const geometrySphere = new THREE.SphereGeometry(1); // create a box geometry
const materialSphere = new THREE.MeshNormalMaterial({wireframe: true});    // create a material that colors the faces based on the normal vectors
const sphere = new THREE.Mesh(geometrySphere, materialSphere); // create a mesh with the geometry and material

sphere.rotation.x = 0.5; // rotate the sphere on the x axis
sphere.rotation.y = 0.5; // rotate the sphere on the y axis

sphere.position.x = 0; // move the sphere to the left

scene.add(sphere); // add the sphere to the scene

// LIGHT
const light = new THREE.DirectionalLight(0xffffff, 1); // create a directional light
light.position.set(5, 5, 5); // set the position of the light
scene.add(light); // add the light to the scene

// TUBE
const geometryTube = new THREE.TorusGeometry(3, 0.5, 5, 100); // create a torus geometry
const materialTube = new THREE.MeshNormalMaterial({wireframe: true}); // create a basic material
const tube = new THREE.Mesh(geometryTube, materialTube); // create a mesh with the geometry and material

scene.add(tube); // add the tube to the scene

// TUBE2
const geometryTube2 = new THREE.TorusGeometry(3, 0.5, 5, 100); // create a torus geometry
const materialTube2 = new THREE.MeshNormalMaterial({wireframe: true}); // create a basic material
const tube2 = new THREE.Mesh(geometryTube2, materialTube2); // create a mesh with the geometry and material

scene.add(tube2); // add the tube to the scene

// TUBE3
const geometryTube3 = new THREE.TorusGeometry(3, 0.5, 5, 100); // create a torus geometry
const materialTube3 = new THREE.MeshNormalMaterial({wireframe: true}); // create a basic material
const tube3 = new THREE.Mesh(geometryTube3, materialTube3); // create a mesh with the geometry and material

scene.add(tube3); // add the tube to the scene

// controlo de órbita
const controls = new OrbitControls(camera, renderer.domElement); // add orbit controls to the camera

renderer.setAnimationLoop(animate);

function animate() {
    sphere.rotation.x += 0.01; // rotate the sphere on the x axis
    sphere.rotation.y += 0.01; // rotate the sphere on the y axis
    tube.rotation.x += 0.01; // rotate the tube on the y axis
    tube2.rotation.y -= 0.01; // rotate the tube on the x axis
    tube3.rotation.z -= 0.01; // rotate the tube on the x axis

    renderer.render(scene, camera); // render the scene from the perspective of the camera
}