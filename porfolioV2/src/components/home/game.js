import './game.css'
import * as THREE from 'three'

let scene,
    renderer,
    camera,
    offSet = -600,
    earthGeometry,
    forestGeometry,
    skyGeometry,
    airplane,
    game = {
        status: 'playing',
        speed: 0.00035,
        baseSpeed: 0.00035,
    },
    newTime = new Date().getTime(),
    oldTime = new Date().getTime()


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

const world = {
    initSpeed: 0.00035,
    incrementSpeedByTime: 0.0000025,
    incrementSpeedByLevel: 0.000005,
    distanceForSpeedUpdate: 100,
    ratioSpeedDistance: 50,

    simpleGunLevelDrop: 1.1,
    doubleGunLevelDrop: 2.3,
    betterGunLevelDrop: 3.5,

    maxLifes: 3,
    pauseLifeSpawn: 400,

    levelCount: 6,
    distanceForLevelUpdate: 500,

    planeDefaultHeight: 150,
    planeAmpHeight: 80,
    planeAmpWidth: 75,
    planeMoveSensivity: 0.005,
    planeRotXSensivity: 0.0008,
    planeRotZSensivity: 0.0004,
    planeMinSpeed: 1.2,
    planeMaxSpeed: 1.6,

    seaRadius: 600,
    seaLength: 800,
    wavesMinAmp: 5,
    wavesMaxAmp: 20,
    wavesMinSpeed: 0.001,
    wavesMaxSpeed: 0.003,

    cameraSensivity: 0.002,
    cameraDistance: 150,

    coinDistanceTolerance: 15,
    coinsSpeed: 0.5,
    distanceForCoinsSpawn: 50,

    collectibleDistanceTolerance: 15,
    collectiblesSpeed: 0.6,

    enemyDistanceTolerance: 10,
    enemiesSpeed: 0.6,
    distanceForEnemiesSpawn: 50,
}

const utils = {
    normalize: function (v, vmin, vmax, tmin, tmax) {
        const nv = Math.max(Math.min(v, vmax), vmin)
        const dv = vmax - vmin
        const pc = (nv - vmin) / dv
        const dt = tmax - tmin
        const tv = tmin + (pc * dt)
        return tv
    },

    findWhere: function (list, properties) {
        for (const elem of list) {
            let all = true
            for (const key in properties) {
                if (elem[key] !== properties[key]) {
                    all = false
                    break
                }
            }
            if (all) {
                return elem
            }
        }
        return null
    },

    randomOneOf: function (choices) {
        return choices[Math.floor(Math.random() * choices.length)]
    },

    randomFromRange: function (min, max) {
        return min + Math.random() * (max - min)
    },

    collide: function (mesh1, mesh2, tolerance) {
        const diffPos = mesh1.position.clone().sub(mesh2.position.clone())
        const d = diffPos.length()
        return d < tolerance
    },

    makeTetrahedron: function (a, b, c, d) {
        return [
            a[0], a[1], a[2],
            b[0], b[1], b[2],
            c[0], c[1], c[2],
            b[0], b[1], b[2],
            c[0], c[1], c[2],
            d[0], d[1], d[2],
        ]
    }
}

function createScene() {
    scene = new THREE.Scene()
    // Add FOV Fog effect to the scene. Same colour as the BG int he stylesheet.
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000)
    camera.position.setZ(world.cameraDistance)
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

function createPlane() {
    airplane = new Airplane()
    airplane.mesh.scale.set(.25, .25, .25)
    airplane.mesh.position.y = world.planeDefaultHeight
    scene.add(airplane.mesh)
}

class Airplane {
    constructor() {
        const [mesh, propeller, pilot] = createAirplaneMesh()
        this.mesh = mesh
        this.propeller = propeller
        this.pilot = pilot
    }
}

function createAirplaneMesh() {
    const mesh = new THREE.Object3D()

    // Cabin
    const matCabin = new THREE.MeshPhongMaterial({ color: colors.red, flatShading: true, side: THREE.DoubleSide })

    const frontUR = [40, 25, -25]
    const frontUL = [40, 25, 25]
    const frontLR = [40, -25, -25]
    const frontLL = [40, -25, 25]
    const backUR = [-40, 15, -5]
    const backUL = [-40, 15, 5]
    const backLR = [-40, 5, -5]
    const backLL = [-40, 5, 5]

    const vertices = new Float32Array(
        utils.makeTetrahedron(frontUL, frontUR, frontLL, frontLR).concat(   // front
            utils.makeTetrahedron(backUL, backUR, backLL, backLR)).concat(      // back
                utils.makeTetrahedron(backUR, backLR, frontUR, frontLR)).concat(    // side
                    utils.makeTetrahedron(backUL, backLL, frontUL, frontLL)).concat(    // side
                        utils.makeTetrahedron(frontUL, backUL, frontUR, backUR)).concat(    // top
                            utils.makeTetrahedron(frontLL, backLL, frontLR, backLR))            // bottom
    )
    const geomCabin = new THREE.BufferGeometry()
    geomCabin.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

    const cabin = new THREE.Mesh(geomCabin, matCabin)
    cabin.castShadow = true
    cabin.receiveShadow = true
    mesh.add(cabin)

    // Engine

    const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    const matEngine = new THREE.MeshPhongMaterial({ color: colors.white, flatShading: true, });
    const engine = new THREE.Mesh(geomEngine, matEngine);

    engine.position.x = 50;
    engine.castShadow = true;
    engine.receiveShadow = true;
    mesh.add(engine);

    // Tail Plane
    const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    const matTailPlane = new THREE.MeshPhongMaterial({ color: colors.red, flatShading: true, });
    const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);

    tailPlane.position.set(-40, 20, 0);
    tailPlane.castShadow = true;
    tailPlane.receiveShadow = true;
    mesh.add(tailPlane);

    // Wings

    const geomSideWing = new THREE.BoxGeometry(30, 5, 120, 1, 1, 1);
    const matSideWing = new THREE.MeshPhongMaterial({ color: colors.red, flatShading: true, });
    const sideWing = new THREE.Mesh(geomSideWing, matSideWing);

    sideWing.position.set(0, 15, 0);
    sideWing.castShadow = true;
    sideWing.receiveShadow = true;
    mesh.add(sideWing);

    const geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1);
    const matWindshield = new THREE.MeshPhongMaterial({ color: colors.white, transparent: true, opacity: .3, flatShading: true, });;
    const windshield = new THREE.Mesh(geomWindshield, matWindshield);
    windshield.position.set(20, 27, 0);

    windshield.castShadow = true;
    windshield.receiveShadow = true;

    mesh.add(windshield);

    const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    geomPropeller.attributes.position.array[4 * 3 + 1] -= 5
    geomPropeller.attributes.position.array[4 * 3 + 2] += 5
    geomPropeller.attributes.position.array[5 * 3 + 1] -= 5
    geomPropeller.attributes.position.array[5 * 3 + 2] -= 5
    geomPropeller.attributes.position.array[6 * 3 + 1] += 5
    geomPropeller.attributes.position.array[6 * 3 + 2] += 5
    geomPropeller.attributes.position.array[7 * 3 + 1] += 5
    geomPropeller.attributes.position.array[7 * 3 + 2] -= 5
    const matPropeller = new THREE.MeshPhongMaterial({ color: colors.brown, flatShading: true, });
    const propeller = new THREE.Mesh(geomPropeller, matPropeller);

    propeller.castShadow = true;
    propeller.receiveShadow = true;

    const geomBlade = new THREE.BoxGeometry(1, 80, 10, 1, 1, 1);
    const matBlade = new THREE.MeshPhongMaterial({ color: colors.brownDark, flatShading: true, });
    const blade1 = new THREE.Mesh(geomBlade, matBlade);

    blade1.position.set(8, 0, 0);

    blade1.castShadow = true;
    blade1.receiveShadow = true;

    const blade2 = blade1.clone();
    blade2.rotation.x = Math.PI / 2;

    blade2.castShadow = true;
    blade2.receiveShadow = true;

    propeller.add(blade1);
    propeller.add(blade2);
    propeller.position.set(60, 0, 0);
    mesh.add(propeller);

    const wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
    const wheelProtecMat = new THREE.MeshPhongMaterial({ color: colors.red, flatShading: true, });
    const wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);

    wheelProtecR.position.set(25, -20, 25);
    mesh.add(wheelProtecR);

    const wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
    const wheelTireMat = new THREE.MeshPhongMaterial({ color: colors.brownDark, flatShading: true, });
    const wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);

    wheelTireR.position.set(25, -28, 25);

    const wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
    const wheelAxisMat = new THREE.MeshPhongMaterial({ color: colors.brown, flatShading: true, });
    const wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
    wheelTireR.add(wheelAxis);

    mesh.add(wheelTireR);

    const wheelProtecL = wheelProtecR.clone();
    wheelProtecL.position.z = -wheelProtecR.position.z;
    mesh.add(wheelProtecL);

    const wheelTireL = wheelTireR.clone();
    wheelTireL.position.z = -wheelTireR.position.z;
    mesh.add(wheelTireL);

    const wheelTireB = wheelTireR.clone();
    wheelTireB.scale.set(.5, .5, .5);

    wheelTireB.position.set(-35, -5, 0);
    mesh.add(wheelTireB);

    const suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
    suspensionGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 10, 0))
    const suspensionMat = new THREE.MeshPhongMaterial({ color: colors.red, flatShading: true, });
    const suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
    suspension.position.set(-35, -5, 0);
    suspension.rotation.z = -.3;
    mesh.add(suspension)

    const pilot = new Pilot()
    pilot.mesh.position.set(5, 27, 0)
    mesh.add(pilot.mesh)

    mesh.castShadow = true
    mesh.receiveShadow = true

    return [mesh, propeller, pilot]
}

class Pilot {
    constructor() {
        this.mesh = new THREE.Object3D()
        this.angleHairs = 0

        const bodyGeom = new THREE.BoxGeometry(15, 15, 15)
        const bodyMat = new THREE.MeshPhongMaterial({
            color: colors.brown,
            flatShading: true,
        })
        const body = new THREE.Mesh(bodyGeom, bodyMat)
        body.position.set(2, -12, 0)
        this.mesh.add(body)

        const faceGeom = new THREE.BoxGeometry(10, 10, 10)
        const faceMat = new THREE.MeshLambertMaterial({ color: colors.pink })
        const face = new THREE.Mesh(faceGeom, faceMat)
        this.mesh.add(face)

        const hairGeom = new THREE.BoxGeometry(4, 4, 4)
        const hairMat = new THREE.MeshLambertMaterial({ color: colors.brown })
        const hair = new THREE.Mesh(hairGeom, hairMat)
        hair.geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 2, 0))
        const hairs = new THREE.Object3D()

        this.hairsTop = new THREE.Object3D()

        for (let i = 0; i < 12; i++) {
            const h = hair.clone();
            const col = i % 3;
            const row = Math.floor(i / 3);
            const startPosZ = -4;
            const startPosX = -4;
            h.position.set(startPosX + row * 4, 0, startPosZ + col * 4);
            h.geometry.applyMatrix4(new THREE.Matrix4().makeScale(1, 1, 1));
            this.hairsTop.add(h);
        }
        hairs.add(this.hairsTop);

        const hairSideGeom = new THREE.BoxGeometry(12, 4, 2);
        hairSideGeom.applyMatrix4(new THREE.Matrix4().makeTranslation(-6, 0, 0));
        const hairSideR = new THREE.Mesh(hairSideGeom, hairMat);
        const hairSideL = hairSideR.clone();
        hairSideR.position.set(8, -2, 6);
        hairSideL.position.set(8, -2, -6);
        hairs.add(hairSideR);
        hairs.add(hairSideL);

        const hairBackGeom = new THREE.BoxGeometry(2, 8, 10);
        const hairBack = new THREE.Mesh(hairBackGeom, hairMat);
        hairBack.position.set(-1, -4, 0)
        hairs.add(hairBack);
        hairs.position.set(-5, 5, 0);

        this.mesh.add(hairs);

        const glassGeom = new THREE.BoxGeometry(5, 5, 5);
        const glassMat = new THREE.MeshLambertMaterial({ color: colors.brown });
        const glassR = new THREE.Mesh(glassGeom, glassMat);
        glassR.position.set(6, 0, 3);
        const glassL = glassR.clone();
        glassL.position.z = -glassR.position.z

        const glassAGeom = new THREE.BoxGeometry(11, 1, 11);
        const glassA = new THREE.Mesh(glassAGeom, glassMat);
        this.mesh.add(glassR);
        this.mesh.add(glassL);
        this.mesh.add(glassA);

        const earGeom = new THREE.BoxGeometry(2, 3, 2);
        const earL = new THREE.Mesh(earGeom, faceMat);
        earL.position.set(0, 0, -6);
        const earR = earL.clone();
        earR.position.set(0, 0, 6);
        this.mesh.add(earL);
        this.mesh.add(earR);
    }


    updateHairs(deltaTime) {
        const hairs = this.hairsTop.children
        const l = hairs.length
        for (let i = 0; i < l; i++) {
            const h = hairs[i]
            h.scale.y = .75 + Math.cos(this.angleHairs + i / 3) * .25
        }
        this.angleHairs += game.speed * deltaTime * 40

    }
}

function animate() {
    requestAnimationFrame(animate)
    airplane.propeller.rotation.x += 0.3;
    earthGeometry.rotation.z += 0.005
    forestGeometry.rotation.z += 0.005
    skyGeometry.rotation.z += 0.003
    newTime = new Date().getTime()
    const deltaTime = newTime - oldTime
    oldTime = newTime
    const pilot = new Pilot()
    pilot.updateHairs(deltaTime)
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
    createPlane()

    animate()

}
init()