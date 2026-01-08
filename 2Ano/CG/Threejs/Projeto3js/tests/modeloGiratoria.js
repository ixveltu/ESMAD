const base = new THREE.Group();
scene.add(base);

// Corpo principal
const corpo = new THREE.Mesh(
 new THREE.BoxGeometry(4, 1, 2),
 new THREE.MeshStandardMaterial({ color: 0x555555 })
);
corpo.position.y = 0.5;
base.add(corpo);

// Lagarta esquerda
const lagartaE = new THREE.Mesh(
 new THREE.BoxGeometry(4, 0.5, 0.5),
 new THREE.MeshStandardMaterial({ color: 0x222222 })
);
lagartaE.position.set(0, 0.25, -1.25);
base.add(lagartaE);

// Lagarta direita
const lagartaD = lagartaE.clone();
lagartaD.position.z = 1.25;
base.add(lagartaD);
