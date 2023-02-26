import './header.css'
import * as THREE from 'three'

let scene,
    renderer,
    camera,
    offSet = -600,
    earthGeometry,
    forestGeometry

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
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.setZ(100)
    camera.position.setX(0)
    camera.position.setY(150)

    renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: document.querySelector('#bg'),
    })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)

    //RESPONSIVE LISTENER
    window.addEventListener('resize', handleWindowResize, false)
}


//RESPONSIVE FUNCTION
function handleWindowResize() {
    const height = window.innerHeight
    const width = window.innerWidth
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
}

function createLights() {

    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)
    const shadowLight = new THREE.DirectionalLight(0xffffff, .9);

    shadowLight.position.set(0, 350, 350)
    shadowLight.castShadow = true

    // define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -650
    shadowLight.shadow.camera.right = 650
    shadowLight.shadow.camera.top = 650
    shadowLight.shadow.camera.bottom = -650
    shadowLight.shadow.camera.near = 1
    shadowLight.shadow.camera.far = 1000

    // Shadow map size
    shadowLight.shadow.mapSize.width = 2048
    shadowLight.shadow.mapSize.height = 2048
    scene.add(hemisphereLight, shadowLight)
}

function createLand() {
    // radius top, radius bottom, height, number of segments on the radius, number of segments vertically
    const landGeometry = new THREE.CylinderGeometry(600, 600, 1700, 40, 10)
    // rotate the geometry on the x axis
    landGeometry.rotateX(-Math.PI / 2)
    const material = new THREE.MeshPhongMaterial({
        color: colors.lightgreen,
        flatShading: true
    })
    earthGeometry = new THREE.Mesh(landGeometry, material)
    earthGeometry.position.y = offSet;
    scene.add(earthGeometry)
}

function createOrbit() {
    // new Object3D
    const orbitGeometry = new THREE.Object3D()
    orbitGeometry.position.y = offSet;
    orbitGeometry.rotation.z = -Math.PI / 6
    scene.add(orbitGeometry)
}

function createForest() {
    forestGeometry = new THREE.Object3D()
    const treesNumber = 300
    const spreadTrees = Math.PI * 2 / treesNumber

    for (let i = 0; i < treesNumber; i++) {

        const tree = createTree()
        const angle = spreadTrees * i
        const radius = 605
        tree.position.y = Math.sin(angle) * radius
        tree.position.x = Math.cos(angle) * radius


        // rotate the tree acording to its position
        tree.rotation.z = angle + (Math.PI / 2) * 3
        tree.position.z = 0 - Math.random() * 600

        const scale = .3 + Math.random() * .75
        tree.scale.set(scale, scale, scale)

        console.log(tree)
        forestGeometry.add(tree)

    }
    forestGeometry.position.y = offSet
    scene.add(forestGeometry)
}

function createTree() {
    const treeGeometry = new THREE.Object3D()

    const geomTreeBase = new THREE.BoxGeometry(10, 20, 10)
    const matTreeBase = new THREE.MeshBasicMaterial({ color: colors.brown })
    const treeBase = new THREE.Mesh(geomTreeBase, matTreeBase)
    treeBase.castShadow = true
    treeBase.receiveShadow = true
    treeGeometry.add(treeBase)

    const matTreeLeaves = new THREE.MeshPhongMaterial({
        color: colors.green,
        flatShading: true
    })

    const geomTreeLeaves1 = new THREE.CylinderGeometry(1, 12 * 3, 12 * 3, 4)
    const treeLeaves1 = new THREE.Mesh(geomTreeLeaves1, matTreeLeaves)
    treeLeaves1.castShadow = true
    treeLeaves1.receiveShadow = true
    treeLeaves1.position.y = 20
    treeGeometry.add(treeLeaves1)

    const geomTreeLeaves2 = new THREE.CylinderGeometry(1, 9 * 3, 9 * 3, 4)
    const treeLeaves2 = new THREE.Mesh(geomTreeLeaves2, matTreeLeaves)
    treeLeaves2.castShadow = true
    treeLeaves2.position.y = 40
    treeLeaves2.receiveShadow = true
    treeGeometry.add(treeLeaves2)

    const geomTreeLeaves3 = new THREE.CylinderGeometry(1, 6 * 3, 6 * 3, 4);
    const treeLeaves3 = new THREE.Mesh(geomTreeLeaves3, matTreeLeaves);
    treeLeaves3.castShadow = true;
    treeLeaves3.position.y = 55;
    treeLeaves3.receiveShadow = true;
    treeGeometry.add(treeLeaves3)

    return treeGeometry
}




function animate() {
    requestAnimationFrame(animate)
    // sphere.rotation.x += 0.01
    // sphere.rotation.y += 0.01
    earthGeometry.rotation.z += 0.005
    forestGeometry.rotation.z += 0.005
    renderer.render(scene, camera)
}


function init() {
    createScene()
    createLights()
    createOrbit()
    createLand()
    createForest()
    animate()

}
init()