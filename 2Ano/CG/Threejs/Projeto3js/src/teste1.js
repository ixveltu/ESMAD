import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export default function RoboticArm() {
 const containerRef = useRef(null);

 useEffect(() => {
  if (!containerRef.current) return;

  // Scene, Camera, Renderer
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
   75,
   window.innerWidth / window.innerHeight,
   0.1,
   1000
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x87ceeb);
  renderer.shadowMap.enabled = true;
  containerRef.current.appendChild(renderer.domElement);

  // Lighting
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

  // Ground
  const groundGeo = new THREE.PlaneGeometry(200, 200);
  const groundMat = new THREE.MeshStandardMaterial({
   color: 0x4a7c59,
   roughness: 0.8,
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = 0;
  ground.receiveShadow = true;
  scene.add(ground);

  // Grid helper
  const gridHelper = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
  gridHelper.material.opacity = 0.2;
  gridHelper.material.transparent = true;
  scene.add(gridHelper);

  // Physics objects array
  const physicsObjects = [];

  // Create interactive boxes
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

  // Create cylinders
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

  // Add some objects to interact with
  createBox(5, 5, 1, 0xff6b6b);
  createBox(7, 3, 0.8, 0x4ecdc4);
  createBox(3, 7, 1.2, 0xffe66d);
  createCylinder(6, -4, 0.5, 1.5, 0x95e1d3);
  createBox(-5, 5, 1, 0xf38181);
  createCylinder(-7, 3, 0.6, 1, 0xaa96da);
  createBox(-3, -5, 0.9, 0xfcbad3);

  // Excavator materials
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xffd700 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x2c2c2c });
  const trackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });
  const cabinMat = new THREE.MeshStandardMaterial({
   color: 0x333333,
   transparent: true,
   opacity: 0.7,
  });
  const armMat = new THREE.MeshStandardMaterial({ color: 0xff8c00 });

  // Main excavator group
  const excavator = new THREE.Group();
  excavator.position.y = 0.3;
  scene.add(excavator);

  // Base/Chassis
  const chassisGeo = new THREE.BoxGeometry(3.5, 0.4, 2.5);
  const chassis = new THREE.Mesh(chassisGeo, bodyMat);
  chassis.position.y = 0.2;
  chassis.castShadow = true;
  excavator.add(chassis);

  // Tracks (lagartas)
  function createTrack(side) {
   const trackGroup = new THREE.Group();

   // Main track body
   const trackBody = new THREE.Mesh(
    new THREE.BoxGeometry(4, 0.5, 0.8),
    trackMat
   );
   trackBody.castShadow = true;
   trackGroup.add(trackBody);

   // Track wheels
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

  // Rotating base
  const rotatingBase = new THREE.Group();
  rotatingBase.position.y = 0.5;
  excavator.add(rotatingBase);

  // Cabin
  const cabinGeo = new THREE.BoxGeometry(1.8, 1.5, 1.8);
  const cabin = new THREE.Mesh(cabinGeo, bodyMat);
  cabin.position.y = 0.75;
  cabin.position.x = -0.3;
  cabin.castShadow = true;
  rotatingBase.add(cabin);

  // Cabin windows
  const windowGeo = new THREE.BoxGeometry(0.1, 1, 1.4);
  const frontWindow = new THREE.Mesh(windowGeo, cabinMat);
  frontWindow.position.set(0.65, 0.75, 0);
  rotatingBase.add(frontWindow);

  // Engine housing
  const engineGeo = new THREE.BoxGeometry(1.2, 1, 1.5);
  const engine = new THREE.Mesh(engineGeo, darkMat);
  engine.position.set(-1.2, 0.5, 0);
  engine.castShadow = true;
  rotatingBase.add(engine);

  // Exhaust pipe
  const exhaustGeo = new THREE.CylinderGeometry(0.1, 0.1, 1, 8);
  const exhaust = new THREE.Mesh(exhaustGeo, darkMat);
  exhaust.position.set(-1.5, 1.2, 0.4);
  exhaust.castShadow = true;
  rotatingBase.add(exhaust);

  // Arm mount point
  const armMount = new THREE.Group();
  armMount.position.set(0.8, 0.8, 0);
  rotatingBase.add(armMount);

  // Upper arm (boom)
  const upperArmPivot = new THREE.Group();
  armMount.add(upperArmPivot);

  const upperArmGeo = new THREE.BoxGeometry(3, 0.4, 0.4);
  const upperArm = new THREE.Mesh(upperArmGeo, armMat);
  upperArm.position.x = 1.5;
  upperArm.castShadow = true;
  upperArmPivot.add(upperArm);

  // Joint sphere
  const jointGeo = new THREE.SphereGeometry(0.3, 16, 16);
  const joint1 = new THREE.Mesh(jointGeo, darkMat);
  joint1.castShadow = true;
  upperArmPivot.add(joint1);

  // Lower arm (stick) pivot
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

  // Bucket pivot
  const bucketPivot = new THREE.Group();
  bucketPivot.position.x = 2.5;
  lowerArmPivot.add(bucketPivot);

  const joint3 = new THREE.Mesh(jointGeo, darkMat);
  joint3.castShadow = true;
  bucketPivot.add(joint3);

  // Bucket
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

  // Bucket teeth
  for (let i = -0.4; i <= 0.4; i += 0.2) {
   const toothGeo = new THREE.ConeGeometry(0.08, 0.25, 4);
   const tooth = new THREE.Mesh(toothGeo, darkMat);
   tooth.position.set(1.1, -0.5, i);
   tooth.rotation.z = Math.PI / 2;
   tooth.castShadow = true;
   bucketGroup.add(tooth);
  }

  // Camera offset from excavator
  const cameraOffset = new THREE.Vector3(-6, 4, 0);

  // Controls
  const keys = {};
  const moveSpeed = 0.08;
  const rotSpeed = 0.03;
  const armSpeed = 0.02;

  document.addEventListener("keydown", (e) => {
   keys[e.code] = true;
  });
  document.addEventListener("keyup", (e) => {
   keys[e.code] = false;
  });

  // Get bucket world position for collision detection
  function getBucketWorldPosition() {
   const worldPos = new THREE.Vector3();
   bucketBottom.getWorldPosition(worldPos);
   return worldPos;
  }

  // Simple physics collision detection
  function checkCollisions() {
   const bucketPos = getBucketWorldPosition();
   const bucketRadius = 0.8;

   physicsObjects.forEach((obj) => {
    const objPos = obj.mesh.position;
    const distance = new THREE.Vector3(
     bucketPos.x - objPos.x,
     bucketPos.y - objPos.y,
     bucketPos.z - objPos.z
    ).length();

    const collisionDist = bucketRadius + obj.size / 2;

    if (distance < collisionDist && distance > 0.01) {
     // Calculate push direction
     const pushDir = new THREE.Vector3(
      objPos.x - bucketPos.x,
      objPos.y - bucketPos.y,
      objPos.z - bucketPos.z
     ).normalize();

     // Apply force
     const force = (collisionDist - distance) * 0.5;
     obj.velocity.add(pushDir.multiplyScalar(force));
    }

    // Apply gravity and friction
    obj.velocity.y -= 0.01;
    obj.velocity.multiplyScalar(0.95);

    // Update position
    obj.mesh.position.add(obj.velocity);

    // Ground collision
    if (obj.mesh.position.y < obj.size / 2) {
     obj.mesh.position.y = obj.size / 2;
     obj.velocity.y = Math.abs(obj.velocity.y) * 0.3;
     obj.velocity.x *= 0.9;
     obj.velocity.z *= 0.9;
    }

    // Keep objects in bounds
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

  // Animation loop
  function animate() {
   // Excavator movement
   const forward = new THREE.Vector3(0, 0, -1);
   forward.applyQuaternion(excavator.quaternion);

   if (keys["KeyW"]) {
    excavator.position.addScaledVector(forward, moveSpeed);
   }
   if (keys["KeyS"]) {
    excavator.position.addScaledVector(forward, -moveSpeed);
   }
   if (keys["KeyA"]) {
    excavator.rotation.y += rotSpeed;
   }
   if (keys["KeyD"]) {
    excavator.rotation.y -= rotSpeed;
   }

   // Base rotation
   if (keys["KeyQ"]) rotatingBase.rotation.y += rotSpeed;
   if (keys["KeyE"]) rotatingBase.rotation.y -= rotSpeed;

   // Upper arm
   if (keys["KeyI"]) upperArmPivot.rotation.z += armSpeed;
   if (keys["KeyK"]) upperArmPivot.rotation.z -= armSpeed;

   // Lower arm
   if (keys["KeyJ"]) lowerArmPivot.rotation.z += armSpeed;
   if (keys["KeyL"]) lowerArmPivot.rotation.z -= armSpeed;

   // Bucket
   if (keys["KeyU"]) bucketPivot.rotation.z += armSpeed;
   if (keys["KeyO"]) bucketPivot.rotation.z -= armSpeed;

   // Clamp rotations
   upperArmPivot.rotation.z = Math.max(
    -Math.PI / 3,
    Math.min(Math.PI / 2, upperArmPivot.rotation.z)
   );
   lowerArmPivot.rotation.z = Math.max(
    -Math.PI / 2,
    Math.min(Math.PI / 6, lowerArmPivot.rotation.z)
   );
   bucketPivot.rotation.z = Math.max(
    -Math.PI / 2,
    Math.min(Math.PI / 2, bucketPivot.rotation.z)
   );

   // Physics
   checkCollisions();

   // Update camera to follow excavator
   const targetCameraPos = excavator.position.clone();
   const offset = cameraOffset.clone();
   offset.applyQuaternion(excavator.quaternion);
   targetCameraPos.add(offset);

   camera.position.lerp(targetCameraPos, 0.1);

   const lookAtPos = excavator.position.clone();
   lookAtPos.y += 2;
   camera.lookAt(lookAtPos);

   renderer.render(scene, camera);
  }

  renderer.setAnimationLoop(animate);

  // Resize handler
  const handleResize = () => {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };

  window.addEventListener("resize", handleResize);

  // Cleanup
  return () => {
   window.removeEventListener("resize", handleResize);
   renderer.setAnimationLoop(null);
   containerRef.current?.removeChild(renderer.domElement);
   renderer.dispose();
  };
 }, []);

 return (
  <div
   style={{
    width: "100vw",
    height: "100vh",
    margin: 0,
    padding: 0,
    overflow: "hidden",
   }}
  >
   <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
   <div
    style={{
     position: "absolute",
     top: 10,
     left: 10,
     background: "rgba(0,0,0,0.8)",
     color: "white",
     padding: "15px",
     borderRadius: "8px",
     fontFamily: "Arial, sans-serif",
     fontSize: "13px",
     lineHeight: "1.6",
    }}
   >
    <div style={{ fontWeight: "bold", marginBottom: "8px", fontSize: "15px" }}>
     🚜 Controles da Retroescavadora
    </div>
    <div>
     <strong>Movimento:</strong>
    </div>
    <div>W/S - Frente/Trás</div>
    <div>A/D - Girar</div>
    <div style={{ marginTop: "8px" }}>
     <strong>Base:</strong>
    </div>
    <div>Q/E - Girar base</div>
    <div style={{ marginTop: "8px" }}>
     <strong>Braço:</strong>
    </div>
    <div>I/K - Braço superior</div>
    <div>J/L - Braço inferior</div>
    <div>U/O - Lagarta (balde)</div>
    <div style={{ marginTop: "8px", fontSize: "11px", opacity: 0.8 }}>
     💡 Use a lagarta para empurrar os objetos!
    </div>
   </div>
  </div>
 );
}
