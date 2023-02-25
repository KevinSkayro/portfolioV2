import './header.css'
import * as THREE from 'three'

let scene, renderer, camera

const colors = {
    red: 0xf25346,
    yellow: 0xedeb27,
    white: 0xd8d0d1,
    brown: 0x59332e,
    pink: 0xF5986E,
    brownDark: 0x23190f,
    blue: 0x68c3c0,
    green: 0x458248,
    purple: 0x551A8B,
    lightgreen: 0x629265,
}

function createScene() {
    scene = new THREE.Scene()

    // Add FOV Fog effect to the scene. Same colour as the BG int he stylesheet.
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.setZ(1200)
    camera.position.setX(0)
    camera.position.setY(300)

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: document.querySelector('#bg'),
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    //RESPONSIVE LISTENER
    window.addEventListener('resize', handleWindowResize, false);
}


//RESPONSIVE FUNCTION
function handleWindowResize() {
    const height = window.innerHeight
    const width = window.innerWidth
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
}


function createLand() {
    // radius top, radius bottom, height, number of segments on the radius, number of segments vertically
    const geometry = new THREE.CylinderGeometry(1000, 1000, 1200, 40, 10);
    // rotate the geometry on the x axis
    geometry.rotateX(-Math.PI / 2);
    const material = new THREE.MeshPhongMaterial({
        color: colors.blue,
        transparent: true,
        opacity: .6,
        flatShading: true,
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.y = -600;
    // sphere.position.y = -12.00;
    scene.add(sphere);


    const pointLight = new THREE.PointLight(colors.white)
    pointLight.position.set(10, 10, 10);

    const ambientLight = new THREE.AmbientLight(colors.white)
    scene.add(pointLight, ambientLight);
}





function animate() {
    requestAnimationFrame(animate);
    // sphere.rotation.x += 0.01;
    // sphere.rotation.y += 0.01;
    console.log('animate')
    renderer.render(scene, camera)
}


function init() {
    createScene()
    createLand()
    animate()

}
init()