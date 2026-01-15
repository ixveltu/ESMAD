import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
 55, // FOV
 window.innerWidth / window.innerHeight, // ratio x/y
 0.1,
 1000
);
camera.position.set(-8, 4, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87ceeb);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Fog
scene.fog = new THREE.Fog(0x87ceeb, 50, 130);

// Luzes
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;
dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.right = 50;
dirLight.shadow.camera.top = 50;
dirLight.shadow.camera.bottom = -50;
scene.add(dirLight);

// Texturas
const textureLoader = new THREE.TextureLoader();
const groundTexture = textureLoader.load("@/../assets/textures/ground.jpeg");
const skyTexture = textureLoader.load("@/../assets/textures/sky.jpg");

// Céu
const skyGeo = new THREE.SphereGeometry(500, 32, 32);
const skyMat = new THREE.MeshBasicMaterial({
 map: skyTexture,
 side: THREE.BackSide,
 fog: false,
});
const sky = new THREE.Mesh(skyGeo, skyMat);
scene.add(sky);

// Chão
const groundGeo = new THREE.PlaneGeometry(200, 200);
const groundMat = new THREE.MeshStandardMaterial({
 map: groundTexture,
 roughness: 0.8,
});
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(10, 10);

const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
ground.receiveShadow = true;
scene.add(ground);

// Lista de objetos para colisão
const physicsObjects = [];

// Caixas
function createBox(x, z, size, color) {
 const geo = new THREE.BoxGeometry(size, size, size);
 const mat = new THREE.MeshStandardMaterial({ color: color });
 const mesh = new THREE.Mesh(geo, mat);
 mesh.position.set(x, size / 2, z);
 mesh.castShadow = true;
 mesh.receiveShadow = true;
 scene.add(mesh);

 physicsObjects.push({
  mesh: mesh,
  velocity: new THREE.Vector3(0, 0, 0),
  mass: size * size * size,
  size: size,
 });

 return mesh;
}

// Cilindros
function createCylinder(x, z, radius, height, color) {
 const geo = new THREE.CylinderGeometry(radius, radius, height, 16);
 const mat = new THREE.MeshStandardMaterial({ color: color });
 const mesh = new THREE.Mesh(geo, mat);
 mesh.position.set(x, height / 2, z);
 mesh.castShadow = true;
 mesh.receiveShadow = true;
 scene.add(mesh);

 physicsObjects.push({
  mesh: mesh,
  velocity: new THREE.Vector3(0, 0, 0),
  mass: radius * radius * Math.PI * height,
  size: Math.max(radius * 2, height),
 });

 return mesh;
}

// Objetos
createBox(5, 5, 1, 0xff6b6b);
createBox(7, 3, 0.8, 0x4ecdc4);
createBox(3, 7, 1.2, 0xffe66d);
createCylinder(6, -4, 0.5, 1.5, 0x95e1d3);
createBox(-5, 5, 1, 0xf38181);
createCylinder(-7, 3, 0.6, 1, 0xaa96da);
createBox(-3, -5, 0.9, 0xfcbad3);

// Materiais
const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffd700 });
const darkMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2c });
const trackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
const cabinMat = new THREE.MeshStandardMaterial({
 color: 0x333333,
 transparent: true,
 opacity: 0.7,
});
const armMat = new THREE.MeshStandardMaterial({ color: 0xff8c00 });

// Escavadora
const excavator = new THREE.Group();
excavator.position.y = 0.3;
scene.add(excavator);

// Base
const chassisGeo = new THREE.BoxGeometry(3.5, 0.4, 2.5);
const chassis = new THREE.Mesh(chassisGeo, bodyMat);
chassis.position.y = 0.2;
chassis.castShadow = true;
excavator.add(chassis);

// Lagartas
function createTrack(side) {
 const trackGroup = new THREE.Group();

 const trackBody = new THREE.Mesh(new THREE.BoxGeometry(4, 0.5, 0.8), trackMat);
 trackBody.castShadow = true;
 trackGroup.add(trackBody);

 for (let i = -1.5; i <= 1.5; i += 0.75) {
  const wheel = new THREE.Mesh(
   new THREE.CylinderGeometry(0.25, 0.25, 0.6, 12),
   darkMat
  );
  wheel.rotation.z = Math.PI / 2;
  wheel.position.x = i;
  wheel.castShadow = true;
  trackGroup.add(wheel);
 }

 trackGroup.position.z = side * 1.2;
 trackGroup.position.y = -0.1;
 return trackGroup;
}

const leftTrack = createTrack(-1);
const rightTrack = createTrack(1);
excavator.add(leftTrack);
excavator.add(rightTrack);

// Base rotativa
const rotatingBase = new THREE.Group();
rotatingBase.position.y = 0.5;
excavator.add(rotatingBase);

// Cabina
const cabinGeo = new THREE.BoxGeometry(1.8, 1.5, 1.8);
const cabin = new THREE.Mesh(cabinGeo, bodyMat);
cabin.position.y = 0.75;
cabin.position.x = -0.3;
cabin.castShadow = true;
rotatingBase.add(cabin);

// Janela
const windowGeo = new THREE.BoxGeometry(0.1, 1, 1.4);
const frontWindow = new THREE.Mesh(windowGeo, cabinMat);
frontWindow.position.set(0.65, 0.75, 0);
rotatingBase.add(frontWindow);

// Motor
const engineGeo = new THREE.BoxGeometry(1.2, 1, 1.5);
const engine = new THREE.Mesh(engineGeo, darkMat);
engine.position.set(-1.2, 0.5, 0);
engine.castShadow = true;
rotatingBase.add(engine);

// Escape
const exhaustGeo = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
const exhaust = new THREE.Mesh(exhaustGeo, darkMat);
exhaust.position.set(-1.5, 1.2, 0.4);
exhaust.castShadow = true;
rotatingBase.add(exhaust);

// Braço
const armMount = new THREE.Group();
armMount.position.set(0.8, 0.8, 0);
rotatingBase.add(armMount);

const upperArmPivot = new THREE.Group();
armMount.add(upperArmPivot);

const upperArmGeo = new THREE.BoxGeometry(3, 0.4, 0.4);
const upperArm = new THREE.Mesh(upperArmGeo, armMat);
upperArm.position.x = 1.5;
upperArm.castShadow = true;
upperArmPivot.add(upperArm);

const jointGeo = new THREE.SphereGeometry(0.3, 16, 16);
const joint1 = new THREE.Mesh(jointGeo, darkMat);
joint1.castShadow = true;
upperArmPivot.add(joint1);

const lowerArmPivot = new THREE.Group();
lowerArmPivot.position.x = 3;
upperArmPivot.add(lowerArmPivot);

const joint2 = new THREE.Mesh(jointGeo, darkMat);
joint2.castShadow = true;
lowerArmPivot.add(joint2);

const lowerArmGeo = new THREE.BoxGeometry(2.5, 0.35, 0.35);
const lowerArm = new THREE.Mesh(lowerArmGeo, armMat);
lowerArm.position.x = 1.25;
lowerArm.castShadow = true;
lowerArmPivot.add(lowerArm);

const bucketPivot = new THREE.Group();
bucketPivot.position.x = 2.5;
lowerArmPivot.add(bucketPivot);

const joint3 = new THREE.Mesh(jointGeo, darkMat);
joint3.castShadow = true;
bucketPivot.add(joint3);

// Balde
const bucketGroup = new THREE.Group();
bucketPivot.add(bucketGroup);

const bucketBackGeo = new THREE.BoxGeometry(0.6, 0.8, 1);
const bucketBack = new THREE.Mesh(bucketBackGeo, armMat);
bucketBack.position.set(0.3, 0, 0);
bucketBack.castShadow = true;
bucketGroup.add(bucketBack);

const bucketBottomGeo = new THREE.BoxGeometry(0.8, 0.1, 1);
const bucketBottom = new THREE.Mesh(bucketBottomGeo, armMat);
bucketBottom.position.set(0.7, -0.4, 0);
bucketBottom.rotation.z = -0.3;
bucketBottom.castShadow = true;
bucketGroup.add(bucketBottom);

// Dentes
for (let i = -0.4; i <= 0.4; i += 0.2) {
 const toothGeo = new THREE.ConeGeometry(0.08, 0.25, 4);
 const tooth = new THREE.Mesh(toothGeo, darkMat);
 tooth.position.set(1.1, -0.5, i);
 tooth.rotation.z = Math.PI / 2;
 tooth.castShadow = true;
 bucketGroup.add(tooth);
}

// Câmera principal (orbit)
const mainCamera = camera;
const controls = new OrbitControls(mainCamera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 3;
controls.maxDistance = 15;
controls.maxPolarAngle = Math.PI / 2;

// Câmera fixa
const rotatingCamera = new THREE.PerspectiveCamera(
 70,
 window.innerWidth / window.innerHeight,
 0.1,
 1000
);
rotatingCamera.position.set(-8, 3, 0);
excavator.add(rotatingCamera);

// controlo de camera
let activeCamera = mainCamera;
let useRotatingCamera = false;

const keys = {};
const moveSpeed = 0.08;
const rotSpeed = 0.03;
const armSpeed = 0.02;

// Animação em loop
let isAnimating = false;
let animationTime = 0;

document.addEventListener("keydown", (e) => {
 keys[e.code] = true;
 if (e.code === "Space") {
  e.preventDefault();
  isAnimating = !isAnimating;
  if (isAnimating) animationTime = 0;
 }
 // mudar camera
 if (e.code === "KeyR") {
  useRotatingCamera = !useRotatingCamera;
  activeCamera = useRotatingCamera ? rotatingCamera : mainCamera;

  controls.enabled = !useRotatingCamera;

  // Reset câmera
  if (!useRotatingCamera) {
   mainCamera.position.set(-6, 3, 0);
   controls.target.copy(excavator.position);
   controls.update();
  }
 }
});

document.addEventListener("keyup", (e) => {
 keys[e.code] = false;
});

function getBucketWorldPosition() {
 const worldPos = new THREE.Vector3();
 bucketBottom.getWorldPosition(worldPos);
 return worldPos;
}

// Colisões
function checkCollisions() {
 const bucketPos = getBucketWorldPosition();
 const bucketRadius = 0.3;

 physicsObjects.forEach((obj) => {
  const objPos = obj.mesh.position;

  // Colisão com balde
  const distance = new THREE.Vector3(
   bucketPos.x - objPos.x,
   bucketPos.y - objPos.y,
   bucketPos.z - objPos.z
  ).length();

  const collisionDist = bucketRadius + obj.size / 2;

  if (distance < collisionDist && distance > 0.01) {
   const pushDir = new THREE.Vector3(
    objPos.x - bucketPos.x,
    objPos.y - bucketPos.y,
    objPos.z - bucketPos.z
   ).normalize();

   const force = (collisionDist - distance) * 0.08;
   obj.velocity.add(pushDir.multiplyScalar(force));
  }

  // Colisão com corpo da giratoria
  const chassisBox = new THREE.Box3().setFromObject(chassis);
  const objBox = new THREE.Box3().setFromObject(obj.mesh);

  chassisBox.expandByScalar(0.1);

  if (chassisBox.intersectsBox(objBox)) {
   const pushDir = new THREE.Vector3(
    objPos.x - excavator.position.x,
    0,
    objPos.z - excavator.position.z
   ).normalize();

   obj.velocity.add(pushDir.multiplyScalar(0.05));
  }

  // Físicas
  obj.velocity.y -= 0.01;
  obj.velocity.multiplyScalar(0.95);
  obj.mesh.position.add(obj.velocity);

  // Chão
  if (obj.mesh.position.y < obj.size / 2) {
   obj.mesh.position.y = obj.size / 2;
   obj.velocity.y = Math.abs(obj.velocity.y) * 0.3;
   obj.velocity.x *= 0.9;
   obj.velocity.z *= 0.9;
  }

  if (excavator.position.y < 0.3) {
   excavator.position.y = 0.3;
  }

  // Limites
  const bound = 95;
  if (Math.abs(obj.mesh.position.x) > bound) {
   obj.mesh.position.x = Math.sign(obj.mesh.position.x) * bound;
   obj.velocity.x *= -0.5;
  }
  if (Math.abs(obj.mesh.position.z) > bound) {
   obj.mesh.position.z = Math.sign(obj.mesh.position.z) * bound;
   obj.velocity.z *= -0.5;
  }
 });
}

// Loop de animação
function animate() {
 const forward = new THREE.Vector3(1, 0, 0);
 forward.applyQuaternion(excavator.quaternion);

 // Animação
 if (isAnimating) {
  animationTime += 0.02;

  rotatingBase.rotation.y = (Math.sin(animationTime * 0.5) * Math.PI) / 3;
  upperArmPivot.rotation.z = Math.sin(animationTime) * 0.25 + 0.3;
  lowerArmPivot.rotation.z = Math.sin(animationTime * 1.2) * 0.15 + 0.05;
  bucketPivot.rotation.z = Math.sin(animationTime * 1.5) * 0.25 + 0.1;
 } else {
  // Controls
  if (keys["KeyW"]) excavator.position.addScaledVector(forward, moveSpeed);
  if (keys["KeyS"]) excavator.position.addScaledVector(forward, -moveSpeed);
  if (keys["KeyA"]) excavator.rotation.y += rotSpeed;
  if (keys["KeyD"]) excavator.rotation.y -= rotSpeed;

  if (keys["KeyQ"]) rotatingBase.rotation.y += rotSpeed;
  if (keys["KeyE"]) rotatingBase.rotation.y -= rotSpeed;

  if (keys["KeyI"]) upperArmPivot.rotation.z += armSpeed;
  if (keys["KeyK"]) upperArmPivot.rotation.z -= armSpeed;

  if (keys["KeyJ"]) lowerArmPivot.rotation.z += armSpeed;
  if (keys["KeyL"]) lowerArmPivot.rotation.z -= armSpeed;

  if (keys["KeyU"]) bucketPivot.rotation.z += armSpeed;
  if (keys["KeyO"]) bucketPivot.rotation.z -= armSpeed;

  // Limites de rotacao
  upperArmPivot.rotation.z = Math.max(
   -Math.PI / 7,
   Math.min(Math.PI / 2, upperArmPivot.rotation.z)
  );
  lowerArmPivot.rotation.z = Math.max(
   -Math.PI / 3,
   Math.min(Math.PI / 6, lowerArmPivot.rotation.z)
  );
  bucketPivot.rotation.z = Math.max(
   -Math.PI / 3,
   Math.min(Math.PI / 2, bucketPivot.rotation.z)
  );
 }

 // colisao para balde nao passar do chao
 const bucketPos = getBucketWorldPosition();
 if (bucketPos.y < 0) {
  upperArmPivot.rotation.z += 0.03;
 }

 checkCollisions();

 // Atualizar target do OrbitControls e lookAt da câmera fixa
 if (!useRotatingCamera) {
  controls.target.copy(excavator.position);
  controls.target.y += 2;
  controls.update();
 } else {
  // Fazer a câmera fixa olhar para o centro da giratória
  const lookTarget = new THREE.Vector3();
  rotatingBase.getWorldPosition(lookTarget);
  lookTarget.y += 1;
  rotatingCamera.lookAt(lookTarget);
 }

 renderer.render(scene, activeCamera);
}

renderer.setAnimationLoop(animate);

// Resize
window.addEventListener("resize", () => {
 const aspect = window.innerWidth / window.innerHeight;

 mainCamera.aspect = aspect;
 mainCamera.updateProjectionMatrix();

 rotatingCamera.aspect = aspect;
 rotatingCamera.updateProjectionMatrix();

 renderer.setSize(window.innerWidth, window.innerHeight);
 renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
