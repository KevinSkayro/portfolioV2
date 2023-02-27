import './header.css'
import * as THREE from 'three'

let scene,
    renderer,
    camera,
    offSet = -600,
    earthGeometry,
    forestGeometry,
    skyGeometry

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
    renderer.shadowMap.enabled = true


    //RESPONSIVE LISTENER
    window.addEventListener('resize', handleWindowResize, false)
}

function handleWindowResize() {
    const height = window.innerHeight
    const width = window.innerWidth
    renderer.setSize(width, height)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
}

function createLights() {

    const hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, .9)
    const shadowLight = new THREE.DirectionalLight(0xffffff, .9)

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
        flatShading: true,

    })
    earthGeometry = new THREE.Mesh(landGeometry, material)
    earthGeometry.receiveShadow = true
    earthGeometry.position.y = offSet

    scene.add(earthGeometry)
}

function createOrbit() {
    // new Object3D
    const orbitGeometry = new THREE.Object3D()
    orbitGeometry.position.y = offSet
    orbitGeometry.rotation.z = -Math.PI / 6
    scene.add(orbitGeometry)
}

function createForest() {
    forestGeometry = new THREE.Object3D()
    const treesQty = 300
    const spreadTrees = Math.PI * 2 / treesQty

    for (let i = 0; i < treesQty; i++) {

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
        tree.clastShadow = true
        forestGeometry.add(tree)
    }


    const flowerQty = 350
    const spreadFlowers = Math.PI * 2 / flowerQty

    for (let i = 0; i < flowerQty; i++) {

        const flower = createFlower()
        const angle = spreadFlowers * i
        const radius = 605
        flower.position.y = Math.sin(angle) * radius
        flower.position.x = Math.cos(angle) * radius

        // rotate the tree acording to its position
        flower.rotation.z = angle + (Math.PI / 2) * 3
        flower.position.z = 0 - Math.random() * 600

        const scale = .1 + Math.random() * .3
        flower.scale.set(scale, scale, scale)

        forestGeometry.add(flower)
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

    const geomTreeLeaves3 = new THREE.CylinderGeometry(1, 6 * 3, 6 * 3, 4)
    const treeLeaves3 = new THREE.Mesh(geomTreeLeaves3, matTreeLeaves)
    treeLeaves3.castShadow = true
    treeLeaves3.position.y = 55
    treeLeaves3.receiveShadow = true
    treeGeometry.add(treeLeaves3)

    return treeGeometry
}

function createFlower() {
    const flowerGeometry = new THREE.Object3D()
    const stemGeometry = new THREE.BoxGeometry(5, 50, 5, 1, 1, 1)
    const stemMaterial = new THREE.MeshPhongMaterial({
        color: colors.green,
        flatShading: true
    })
    const stem = new THREE.Mesh(stemGeometry, stemMaterial)
    stem.castShadow = true
    stem.receiveShadow = true
    flowerGeometry.add(stem)

    const petalCoreGeometry = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1)
    const petalCoreMaterial = new THREE.MeshPhongMaterial({
        color: colors.yellow,
        flatShading: true
    })
    const petalCore = new THREE.Mesh(petalCoreGeometry, petalCoreMaterial)
    petalCore.castShadow = true
    petalCore.receiveShadow = true

    const petalColors = [colors.red, colors.yellow, colors.blue]
    const petalColor = petalColors[Math.floor(Math.random() * 3)]

    const petalGeometry = new THREE.BoxGeometry(15, 20, 5, 1, 3, 1)
    const petalMaterial = new THREE.MeshBasicMaterial({
        color: petalColor
    })
    let positionAttribute = petalGeometry.attributes.position

    // Modify the y-coordinates of some vertices by updating the position attribute
    positionAttribute.setY(5, positionAttribute.getY(5) - 4)
    positionAttribute.setY(4, positionAttribute.getY(4) - 4)
    positionAttribute.setY(7, positionAttribute.getY(7) + 4)
    positionAttribute.setY(6, positionAttribute.getY(6) + 4)

    // Mark the position attribute as needing an update
    positionAttribute.needsUpdate = true


    petalGeometry.translate(12.5, 0, 3)

    let petals = []
    for (let i = 0; i < 4; i++) {
        petals[i] = new THREE.Mesh(petalGeometry, petalMaterial)
        petals[i].rotation.z = i * Math.PI / 2
        petals[i].castShadow = true
        petals[i].receiveShadow = true
    }

    petalCore.add(petals[0], petals[1], petals[2], petals[3])
    petalCore.position.y = 25
    petalCore.position.z = 3
    flowerGeometry.add(petalCore)

    return flowerGeometry
}

function createSun() {
    const sunGeometry = new THREE.SphereGeometry(400, 20, 10)
    const sunMaterial = new THREE.MeshPhongMaterial({
        color: colors.yellow,
        flatShading: true
    })
    const sun = new THREE.Mesh(sunGeometry, sunMaterial)
    sun.castShadow = false
    sun.receiveShadow = false
    sun.scale.set(1, 1, .3)
    sun.position.set(0, -30, -850)
    // scene.add(sunGeometry)
    scene.add(sun)
}

function createSky() {
    skyGeometry = new THREE.Object3D()

    const cloudNumber = 25
    const spreadClouds = Math.PI * 2 / cloudNumber

    for (let i = 0; i < cloudNumber; i++) {
        const cloud = createCloud()

        const cloudRotation = spreadClouds * i
        const cloudRadius = 800 + Math.random() * 200

        cloud.position.x = Math.cos(cloudRotation) * cloudRadius
        cloud.position.y = Math.sin(cloudRotation) * cloudRadius

        cloud.position.z = -400 - Math.random() * 400
        cloud.rotation.z = cloudRotation * i + Math.PI / 2

        const scale = 1 + Math.random() * 2
        cloud.scale.set(scale, scale, scale)

        skyGeometry.add(cloud)
    }

    skyGeometry.position.y = offSet
    scene.add(skyGeometry)
}

function createCloud() {
    const cloudGeometry = new THREE.Object3D()
    const cloudGeom = new THREE.DodecahedronGeometry(20, 0)
    const cloudMaterial = new THREE.MeshPhongMaterial({
        color: colors.white,
    })

    const cloudBlocks = 3 + Math.floor(Math.random() * 3)

    for (let i = 0; i < cloudBlocks; i++) {
        const cloud = new THREE.Mesh(cloudGeom, cloudMaterial)
        cloud.position.x = i * 15
        cloud.position.y = Math.random() * 10
        cloud.position.z = Math.random() * 10
        cloud.rotation.z = Math.random() * Math.PI * 2
        cloud.rotation.y = Math.random() * Math.PI * 2
        const scale = .1 + Math.random() * .9
        cloud.scale.set(scale, scale, scale)
        cloud.castShadow = true
        cloud.receiveShadow = true
        cloudGeometry.add(cloud)
    }
    return cloudGeometry
}

function animate() {
    requestAnimationFrame(animate)

    earthGeometry.rotation.z += 0.005
    forestGeometry.rotation.z += 0.005
    skyGeometry.rotation.z += 0.003
    renderer.render(scene, camera)
}


function init() {
    createScene()
    createLights()
    createOrbit()
    createSun()
    createLand()
    createForest()
    createSky()


    animate()

}
init()