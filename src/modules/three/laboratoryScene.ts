import * as THREE from 'three'

const STAR_COUNT = 2000
const STAR_SPREAD = 220
const STAR_DEPTH = 420
const STAR_SPEED = 48
const ASTEROID_COUNT = 140
const ASTEROID_SPREAD_X = 80
const ASTEROID_SPREAD_Y = 60
const ASTEROID_DEPTH = 380
const FORWARD_SPEED = 48

interface LaboratorySceneHandle {
  cleanup: () => void
}

interface AsteroidBody {
  mesh: THREE.Mesh
  speed: number
  rotation: THREE.Vector3
}

function randomSpread(range: number) {
  return THREE.MathUtils.randFloatSpread(range)
}

function randomAsteroidColour() {
  const color = new THREE.Color()
  color.setHSL(0.08 + Math.random() * 0.08, 0.55, 0.45 + Math.random() * 0.1)
  return color
}

function randomizeAsteroidPosition(mesh: THREE.Mesh, initial = false) {
  const scale = THREE.MathUtils.randFloat(0.18, 0.6)
  mesh.scale.set(scale * 0.7, scale, scale * 0.9)
  mesh.position.set(
    randomSpread(ASTEROID_SPREAD_X),
    randomSpread(ASTEROID_SPREAD_Y),
    (initial ? Math.random() : Math.random() + 0.5) * ASTEROID_DEPTH + 30,
  )
}

/**
 * Bootstraps the Laboratory space-travel Three.js scene inside the provided container.
 */
export function createLaboratoryScene(container: HTMLElement): LaboratorySceneHandle {
  const cleanupCallbacks: Array<() => void> = []

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x03040D)
  scene.fog = new THREE.FogExp2(0x03040D, 0.012)

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000)
  camera.position.set(0, 0, 6)
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.shadowMap.enabled = true
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.setPixelRatio(window.devicePixelRatio)

  container.appendChild(renderer.domElement)

  const hemiLight = new THREE.HemisphereLight(0x5870FF, 0x060606, 0.55)
  scene.add(hemiLight)

  const keyLight = new THREE.DirectionalLight(0xFFFFFF, 1.1)
  keyLight.position.set(18, 14, 22)
  keyLight.castShadow = true
  scene.add(keyLight)

  const rimLight = new THREE.DirectionalLight(0x60A5FA, 0.75)
  rimLight.position.set(-12, -6, -4)
  scene.add(rimLight)

  const starPositions = new Float32Array(STAR_COUNT * 3)
  for (let i = 0; i < STAR_COUNT; i++) {
    const idx = i * 3
    starPositions[idx] = randomSpread(STAR_SPREAD)
    starPositions[idx + 1] = randomSpread(STAR_SPREAD)
    starPositions[idx + 2] = Math.random() * STAR_DEPTH
  }

  const starGeometry = new THREE.BufferGeometry()
  starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3))
  const starMaterial = new THREE.PointsMaterial({
    color: 0xBBDFFF,
    size: 0.65,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const starField = new THREE.Points(starGeometry, starMaterial)
  scene.add(starField)

  cleanupCallbacks.push(() => {
    scene.remove(starField)
    starGeometry.dispose()
    starMaterial.dispose()
  })

  const asteroids: AsteroidBody[] = []
  const baseAsteroidGeometry = new THREE.DodecahedronGeometry(1, 1)
  cleanupCallbacks.push(() => {
    baseAsteroidGeometry.dispose()
  })

  for (let i = 0; i < ASTEROID_COUNT; i++) {
    const material = new THREE.MeshStandardMaterial({
      color: randomAsteroidColour(),
      metalness: 0.25,
      roughness: 0.8,
      emissive: 0x201f2b,
      emissiveIntensity: 0.1,
    })

    const mesh = new THREE.Mesh(baseAsteroidGeometry, material)
    mesh.castShadow = true
    mesh.receiveShadow = true
    randomizeAsteroidPosition(mesh, true)
    scene.add(mesh)

    asteroids.push({
      mesh,
      speed: THREE.MathUtils.randFloat(22, 55),
      rotation: new THREE.Vector3(
        THREE.MathUtils.randFloat(0.2, 0.7),
        THREE.MathUtils.randFloat(0.15, 0.6),
        THREE.MathUtils.randFloat(0.05, 0.3),
      ),
    })

    cleanupCallbacks.push(() => {
      scene.remove(mesh)
      material.dispose()
    })
  }

  const cameraBasePosition = camera.position.clone()

  function resize() {
    const { clientWidth, clientHeight } = container
    if (clientWidth === 0 || clientHeight === 0)
      return

    camera.aspect = clientWidth / clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(clientWidth, clientHeight)
  }

  resize()

  let animationFrame = 0
  const clock = new THREE.Clock()

  function animate() {
    const delta = clock.getDelta()
    const elapsed = clock.elapsedTime

    camera.position.x = cameraBasePosition.x + Math.sin(elapsed * 0.22) * 0.6
    camera.position.y = cameraBasePosition.y + Math.sin(elapsed * 0.31) * 0.4
    camera.position.z += FORWARD_SPEED * delta
    if (camera.position.z > 120)
      camera.position.z = 6
    camera.lookAt(0, 0, 0)

    for (let i = 0; i < STAR_COUNT; i++) {
      const ix = i * 3
      const iy = ix + 1
      const iz = ix + 2
      starPositions[iz] -= STAR_SPEED * delta

      if (starPositions[iz] < -20) {
        starPositions[ix] = randomSpread(STAR_SPREAD)
        starPositions[iy] = randomSpread(STAR_SPREAD)
        starPositions[iz] = STAR_DEPTH
      }
    }
    starGeometry.attributes.position.needsUpdate = true

    for (const asteroid of asteroids) {
      const { mesh, speed, rotation } = asteroid
      mesh.position.z -= speed * delta
      mesh.rotation.x += rotation.x * delta
      mesh.rotation.y += rotation.y * delta
      mesh.rotation.z += rotation.z * delta

      if (mesh.position.z < -25) {
        randomizeAsteroidPosition(mesh, false)
      }
    }

    renderer.render(scene, camera)
    animationFrame = requestAnimationFrame(animate)
  }

  animate()

  const resizeObserver = new ResizeObserver(() => resize())
  resizeObserver.observe(container)

  function cleanup() {
    cancelAnimationFrame(animationFrame)
    resizeObserver.disconnect()

    cleanupCallbacks.forEach(fn => fn())

    renderer.dispose()

    if (renderer.domElement.parentElement === container)
      container.removeChild(renderer.domElement)
  }

  return { cleanup }
}
