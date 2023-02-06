import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LoadingManager } from "three";

// Custom Modules
import HDR from "./HDR/HDR";

const init = (container: HTMLDivElement) => {

    const progressBar = document.getElementById("progress-bar") as HTMLProgressElement;;
    if (progressBar === null) throw new Error("progress bar not found");

    const progressContainer = document.querySelector(".loader-window ") as HTMLDivElement;
    if (progressContainer === null) throw new Error("progress-container bar not found");

    const manager = new THREE.LoadingManager();
    manager.onProgress = function (item, loaded, total) {
        progressBar.value = (loaded / total) * 100;
    }

    manager.onLoad = function () {
        progressContainer.style.display = "none";
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    const pointLight = new THREE.PointLight(0xffffff, 1, 1000);
    pointLight.position.set(0, 2, 3)
    scene.add(pointLight);

    const Ground = new THREE.Mesh(
        new THREE.PlaneGeometry(10, 10),
        new THREE.MeshPhongMaterial({ color: 0xffffff })
    )
    Ground.rotation.x = -Math.PI / 2;
    Ground.position.set(0, -1, 0)
    scene.add(Ground);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    camera.position.set(0, 1, 5)
    controls.update();

    HDR({ scene, manager })

    function animate() {
        requestAnimationFrame(animate);
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        controls.update();

        renderer.render(scene, camera);
    }
    animate();
}

export default init;