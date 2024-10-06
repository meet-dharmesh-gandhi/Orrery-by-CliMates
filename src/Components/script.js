import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

async function fetcher() {
    const result = await fetch("https://data.nasa.gov/resource/b67r-rgxc.json");
    const jsonFile = await result.json();
}

fetcher();

const planetFile = [
    { e: 0.2056, i_deg: 7.0, q_au_1: 0.3075, p_yr: 0.241 }, // Mercury
    { e: 0.0068, i_deg: 3.4, q_au_1: 0.7184, p_yr: 0.615 }, // Venus
    { e: 0.0167, i_deg: 0.0, q_au_1: 0.9833, p_yr: 1.0 }, // Earth
    { e: 0.0934, i_deg: 1.8, q_au_1: 1.3814, p_yr: 1.88 }, // Mars
    { e: 0.0484, i_deg: 1.3, q_au_1: 4.950, p_yr: 11.86 }, // Jupiter
    { e: 0.0565, i_deg: 2.5, q_au_1: 9.047, p_yr: 29.46 }, // Saturn
    { e: 0.0463, i_deg: 0.8, q_au_1: 18.330, p_yr: 84.01 }, // Uranus
    { e: 0.0100, i_deg: 1.8, q_au_1: 29.090, p_yr: 164.79 }, // Neptune
];
const planetNames = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"];
const planetRadii = [0.05, 0.09, 0.1, 0.053, 0.23, 0.19, 0.085, 0.09];

const moonRadii = [0.01];
const moonNames = ["earth-moon"];

let speedLabel = document.querySelector(".speedValue") ?? null;
let planetOrbitsCheckBox = document.querySelector(".planet-orbits") ?? null;
let asteroidOrbitsCheckBox = document.querySelector(".asteroid-orbits") ?? null;

let planetOribitVisible = true;
let asteroidOribitVisible = true;
let speed = 1;

const planets = [];
const asteroids = [];

function createAsteroid({ data, scene, color = "blue", size = 0.01, texture = "", planetName = "" }) {
    const e = parseFloat(data.e);
    const inclination = parseFloat(data.i_deg) * (Math.PI / 180);
    const q = parseFloat(data.q_au_1);
    const p = parseFloat(data.p_yr);

    const Q = q * (1 + e) / (1 - e);

    const a = (q + Q) / 2;

    const b = a * Math.sqrt(1 - e * e);

    const ellipseCurve = new THREE.EllipseCurve(
        0, 0,
        a, b,
        0, 2 * Math.PI,
        false,
        0
    );

    const points = ellipseCurve.getPoints(100);
    const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const orbitLine = new THREE.Line(orbitGeometry, orbitMaterial);
    orbitLine.rotation.x = inclination;

    scene.add(orbitLine);

    const planetGeometry = new THREE.SphereGeometry(size, 32, 32);
    const planetMaterial = texture === "" ? new THREE.MeshStandardMaterial({ color }) : new THREE.MeshStandardMaterial({ map: texture, color });
    const planet = new THREE.Mesh(planetGeometry, planetMaterial);
    planetName ? planet.name = planetName : null;

    planet.position.x = a;

    planet.rotation.x = inclination;

    scene.add(planet);

    return {
        planet,
        angle: 0,
        orbitLine,
        semiMajorAxis: a,
        semiMinorAxis: b,
        period: p,
        update: function (speed, oribitVisible) {
            this.angle += (Math.PI * 2) / this.period * speed;

            this.planet.position.x = this.semiMajorAxis * Math.cos(this.angle);
            this.planet.position.y = this.semiMinorAxis * Math.sin(this.angle);

            this.planet.rotation.y += 0.02;

            orbitLine.visible = oribitVisible;
        }
    };
}

const scene = new THREE.Scene();

export function loadOrrery() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    const renderer = new THREE.WebGLRenderer();
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.z = 5;
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector(".orrery")?.appendChild(renderer.domElement); // change from body to the element which contains the model

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("./Images/sun-equirectangular-image.jpg");
    const sunGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const sunMaterial = new THREE.MeshStandardMaterial({ map: texture, color: "" });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.name = "Sun";
    scene.add(sun);

    const light = new THREE.PointLight(0xffffff, 10, 100);
    light.position.set(0, 0, 0);
    scene.add(light);

    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 0, 0);
    scene.add(hemiLight);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    function onMouseClick(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects(scene.children, true);

        if (intersects.length > 0) {
            intersects.forEach(intersect => { if (intersect.object.name !== "") console.log(`You clicked on: ${intersect.object.name}`) });
        }
    }

    window.addEventListener("click", onMouseClick);

    let index = 0;

    for (const data of planetFile) {
        const planetInfo = createAsteroid(
            {
                data,
                scene,
                color: "",
                size: planetRadii[index],
                texture: textureLoader.load(`./Images/${planetNames[index]}-equirectangular-image.jpg`),
                planetName: `${planetNames[index]}`
            }
        )
        if (index === 2) {
            const moonGeometry = new THREE.SphereGeometry(moonRadii[0], 32, 32);
            const moonMaterial = new THREE.MeshStandardMaterial({ map: textureLoader.load(`./Images/${moonNames[0]}-equirectangular-image.jpg`) });
            const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

            moonMesh.position.x = 0.15;
            planetInfo.planet.add(moonMesh);
        }
        if (index === 5) {
            const ringGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.02, 64, 1, false);
            const ringTexture = textureLoader.load("./Images/saturn-ring-equirectangular-image.png");
            const ringMaterial = new THREE.MeshBasicMaterial({ map: ringTexture, side: THREE.DoubleSide });

            const rings = new THREE.Mesh(ringGeometry, ringMaterial);

            rings.rotation.x = Math.PI / 2;
            rings.rotation.z = 0.5;

            planetInfo.planet.add(rings);
        }
        planets.push(planetInfo);
        index++;
    }

    for (const data of jsonFile) {
        const asteroidInfo = createAsteroid({ data, scene });
        asteroids.push(asteroidInfo);
    }

    function animate() {
        requestAnimationFrame(animate);

        for (const planet of planets) {
            planet.update(speed / 500.0, planetOribitVisible);
        }

        for (const asteroid of asteroids) {
            asteroid.update(speed / 500.0, asteroidOribitVisible);
        }

        controls.update();

        renderer.render(scene, camera);
    }

    animate();  // This handles the continuous rendering loop, so no need to call renderer.render() separately
}


export function handleSpeedChange(e, speedLabelElement) {
    if (!speedLabel) speedLabel = speedLabelElement;
    speed = e.target.value;
    speedLabel.textContent = speed;
}

export function handlePlanetsCheckbox(planetOrbitsCheckBoxElement) {
    if (!planetOrbitsCheckBox) planetOrbitsCheckBox = planetOrbitsCheckBoxElement;
    planetOribitVisible = planetOrbitsCheckBox.checked;
}

export function handleAsteroidsCheckbox(asteroidOrbitsCheckBoxElement) {
    if (!asteroidOrbitsCheckBox) asteroidOrbitsCheckBox = asteroidOrbitsCheckBoxElement;
    asteroidOribitVisible = asteroidOrbitsCheckBox.checked;
}
