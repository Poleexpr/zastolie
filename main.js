import * as THREE from "https://cdn.skypack.dev/three@0.135.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.135.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.135.0/examples/jsm/loaders/GLTFLoader.js";


/*import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';*/


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;
let controls;

const loader = new GLTFLoader();


loader.load(
    'https://poleexpr.github.io/zastolie/models/dinner/scene.gltf',
    function (gltf) {
        object = gltf.scene;
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error(error);
    }
);


const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);


document.getElementById("container3D").appendChild(renderer.domElement);


camera.position.z = 50;


const topLight = new THREE.DirectionalLight(0xffffff, 2.5);
topLight.position.set(500, 500, 500)
topLight.castShadow = true;
scene.add(topLight);


const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);


controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}


window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});


document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
}


animate();






