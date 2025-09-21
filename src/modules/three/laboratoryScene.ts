import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

const STAR_COUNT = 1800
const STAR_SPREAD = 320
const STAR_DEPTH = 520
const STAR_SPEED = 72
const PLANET_COUNT = 56
const PLANET_SPREAD_X = 120
const PLANET_SPREAD_Y = 90
const PLANET_DEPTH = 560
const FORWARD_SPEED = 60
const LASER_LIFETIME = 0.4
const LASER_TRAVEL_DURATION = 0.25
const LASER_RADIUS_SCALE = 0.34
const LASER_LIGHT_INTENSITY = 3.6
const LASER_LIGHT_DISTANCE = 28

const ROCK_SCALE_MIN = 2.0
const ROCK_SCALE_MAX = 7.2
const RELIC_SCALE_MIN = 4.5
const RELIC_SCALE_MAX = 9.5
const ASTEROID_SCALE_MIN = ROCK_SCALE_MIN
const ASTEROID_SCALE_MAX = RELIC_SCALE_MAX
const ASTEROID_REWARD_MAX_MULTIPLIER = 5

const EXPLOSION_DURATION = 0.25
const EXPLOSION_BASE_OPACITY = 0.92
const EXPLOSION_LIGHT_DISTANCE = 26
const EXPLOSION_START_SCALE_MIN = 0.6
const EXPLOSION_START_SCALE_MAX = 1.4
const EXPLOSION_END_SCALE_MIN = 1.8
const EXPLOSION_END_SCALE_MAX = 4.6
const EXPLOSION_BASE_INTENSITY_ROCK = 3.6
const EXPLOSION_BASE_INTENSITY_RELIC = 4.8
const EXPLOSION_ROTATION_SPEED_MIN = 2.4
const EXPLOSION_ROTATION_SPEED_MAX = 4.5

interface LaboratorySceneHandle {
  cleanup: () => void
  shoot: (ndcX: number, ndcY: number) => LaboratoryShotResult | null
}

type AsteroidType = 'rock' | 'relic'

interface LaboratoryShotResult {
  type: AsteroidType
  rewardMultiplier: number
}

interface PlanetBody {
  group: THREE.Group
  core: THREE.Mesh
  ring?: THREE.Mesh
  ringSpin?: THREE.Vector3
  speed: number
  rotation: THREE.Vector3
  type: AsteroidType
  scale: number
  rewardMultiplier: number
}

interface LaserShot {
  mesh: THREE.Mesh
  material: THREE.MeshBasicMaterial
  ttl: number
  light: THREE.PointLight
  origin: THREE.Vector3
  direction: THREE.Vector3
  distance: number
  travelled: number
  elapsed: number
  hasReachedTarget: boolean
}

interface ExplosionEffect {
  mesh: THREE.Mesh
  material: THREE.MeshBasicMaterial
  light: THREE.PointLight
  elapsed: number
  duration: number
  startScale: number
  endScale: number
  baseOpacity: number
  lightIntensity: number
  rotationSpeed: THREE.Vector3
}

function randomSpread(range: number) {
  return THREE.MathUtils.randFloatSpread(range)
}

function randomPlanetColour(type: AsteroidType) {
  if (type === 'relic') {
    const color = new THREE.Color()
    color.setHSL(0.12 + Math.random() * 0.04, 0.72, 0.65)
    return color
  }
  const color = new THREE.Color()
  color.setHSL(THREE.MathUtils.randFloat(0, 1), THREE.MathUtils.randFloat(0.35, 0.6), THREE.MathUtils.randFloat(0.32, 0.55))
  return color
}

function computeRewardMultiplier(scale: number) {
  if (!Number.isFinite(scale))
    return 1

  const clampedScale = THREE.MathUtils.clamp(scale, ASTEROID_SCALE_MIN, ASTEROID_SCALE_MAX)
  const normalizedScale = (clampedScale - ASTEROID_SCALE_MIN) / (ASTEROID_SCALE_MAX - ASTEROID_SCALE_MIN)
  const inverted = 1 - normalizedScale
  const multiplier = 1 + Math.round(inverted * (ASTEROID_REWARD_MAX_MULTIPLIER - 1))
  return THREE.MathUtils.clamp(multiplier, 1, ASTEROID_REWARD_MAX_MULTIPLIER)
}

function selectExplosionColor(type: AsteroidType) {
  if (type === 'relic')
    return new THREE.Color(0xFDE68A)

  return new THREE.Color(0x7DD3FC)
}

function computeExplosionScaleRange(asteroidScale: number) {
  const defaultScale = Number.isFinite(asteroidScale) ? asteroidScale : ASTEROID_SCALE_MIN
  const sanitized = THREE.MathUtils.clamp(defaultScale, ASTEROID_SCALE_MIN, ASTEROID_SCALE_MAX)
  const startScale = THREE.MathUtils.clamp(sanitized * 0.28, EXPLOSION_START_SCALE_MIN, EXPLOSION_START_SCALE_MAX)
  const endScale = THREE.MathUtils.clamp(sanitized * 0.95, EXPLOSION_END_SCALE_MIN, EXPLOSION_END_SCALE_MAX)
  return { startScale, endScale }
}

function easeOutCubic(value: number) {
  const clamped = THREE.MathUtils.clamp(value, 0, 1)
  const inverted = 1 - clamped
  return 1 - inverted * inverted * inverted
}

export function createLaboratoryScene(container: HTMLElement): LaboratorySceneHandle {
  const cleanupCallbacks: Array<() => void> = []
  const reduceMotionQuery = typeof window !== 'undefined' && 'matchMedia' in window
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : undefined

  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0x03040D)
  scene.fog = new THREE.FogExp2(0x03040D, 0.012)

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1200)
  camera.position.set(0, 0, 0)
  camera.lookAt(new THREE.Vector3(0, 0, -10))

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.shadowMap.enabled = true
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  const composer = new EffectComposer(renderer)
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 1.25, 0.68, 0.38)
  composer.addPass(bloomPass)

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
    starPositions[idx + 2] = -(Math.random() * STAR_DEPTH + 40)
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

  const sphereGeometry = new THREE.SphereGeometry(1, 22, 20)
  const torusGeometry = new THREE.TorusGeometry(1, 0.35, 14, 40)
  cleanupCallbacks.push(() => {
    sphereGeometry.dispose()
    torusGeometry.dispose()
  })

  const planets: PlanetBody[] = []
  const colliderMap = new Map<THREE.Object3D, PlanetBody>()

  function randomizePlanet(body: PlanetBody, initial: boolean) {
    const isRelic = Math.random() < 0.06
    body.type = isRelic ? 'relic' : 'rock'

    const coreMaterial = body.core.material as THREE.MeshStandardMaterial
    coreMaterial.color.copy(randomPlanetColour(body.type))
    coreMaterial.emissive.setHex(body.type === 'relic' ? 0x2768FF : 0x050505)
    coreMaterial.emissiveIntensity = body.type === 'relic' ? 0.4 : 0.1

    if (body.ring) {
      body.ring.visible = isRelic
      const ringMaterial = body.ring.material as THREE.MeshStandardMaterial
      ringMaterial.color.copy(isRelic ? new THREE.Color(0xFDE68A) : new THREE.Color(0x0D0D16))
      ringMaterial.emissiveIntensity = isRelic ? 0.25 : 0.05
      body.ring.rotation.set(Math.PI / 2, 0, 0)
      if (body.ringSpin) {
        do {
          body.ringSpin.set(
            THREE.MathUtils.randFloatSpread(1.2),
            THREE.MathUtils.randFloatSpread(1.2),
            THREE.MathUtils.randFloatSpread(2.2),
          )
        } while (body.ringSpin.lengthSq() < 0.12)
      }
    }

    const scale = isRelic
      ? THREE.MathUtils.randFloat(RELIC_SCALE_MIN, RELIC_SCALE_MAX)
      : THREE.MathUtils.randFloat(ROCK_SCALE_MIN, ROCK_SCALE_MAX)

    body.scale = scale
    body.rewardMultiplier = computeRewardMultiplier(scale)
    body.group.scale.setScalar(scale)
    if (body.ring)
      body.ring.scale.setScalar(isRelic ? THREE.MathUtils.randFloat(1.6, 2.1) : THREE.MathUtils.randFloat(1.2, 1.4))

    body.group.position.set(
      randomSpread(PLANET_SPREAD_X),
      randomSpread(PLANET_SPREAD_Y),
      -(Math.random() * PLANET_DEPTH + (initial ? 260 : 220)),
    )

    body.speed = THREE.MathUtils.randFloat(28, 56)
    body.rotation.set(
      THREE.MathUtils.randFloat(0.05, 0.2),
      THREE.MathUtils.randFloat(0.04, 0.18),
      THREE.MathUtils.randFloat(0.02, 0.12),
    )
  }

  for (let i = 0; i < PLANET_COUNT; i++) {
    const material = new THREE.MeshStandardMaterial({
      color: randomPlanetColour('rock'),
      metalness: 0.35,
      roughness: 0.75,
      emissive: 0x050505,
      emissiveIntensity: 0.1,
    })

    const core = new THREE.Mesh(sphereGeometry, material)
    core.castShadow = true
    core.receiveShadow = true

    const group = new THREE.Group()
    group.add(core)

    let ringMesh: THREE.Mesh | undefined
    if (Math.random() < 0.5) {
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xFDE68A,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.68,
        emissive: 0xFACC15,
        emissiveIntensity: 0.22,
      })
      ringMesh = new THREE.Mesh(torusGeometry, ringMaterial)
      ringMesh.rotation.x = Math.PI / 2
      ringMesh.castShadow = false
      ringMesh.receiveShadow = false
      group.add(ringMesh)
      cleanupCallbacks.push(() => {
        ringMaterial.dispose()
      })
    }

    scene.add(group)

    const body: PlanetBody = {
      group,
      core,
      ring: ringMesh,
      ringSpin: ringMesh ? new THREE.Vector3() : undefined,
      speed: 0,
      rotation: new THREE.Vector3(),
      type: 'rock',
      scale: 1,
      rewardMultiplier: 1,
    }

    randomizePlanet(body, true)
    planets.push(body)
    colliderMap.set(core, body)

    cleanupCallbacks.push(() => {
      scene.remove(group)
      material.dispose()
    })
  }

  const laserGeometry = new THREE.CylinderGeometry(0.05, 0.015, 1, 12)
  cleanupCallbacks.push(() => {
    laserGeometry.dispose()
  })
  const lasers: LaserShot[] = []

  const explosionGeometry = new THREE.IcosahedronGeometry(1, 3)
  cleanupCallbacks.push(() => {
    explosionGeometry.dispose()
  })
  const explosions: ExplosionEffect[] = []

  const raycaster = new THREE.Raycaster()
  const pointer = new THREE.Vector2()

  const laserUpAxis = new THREE.Vector3(0, 1, 0)
  const laserEmitterOffset = new THREE.Vector3(0, -0.75, -0.6)
  const laserMidpoint = new THREE.Vector3()
  const laserTip = new THREE.Vector3()

  const cameraBasePosition = camera.position.clone()

  function resize() {
    const { clientWidth, clientHeight } = container
    if (clientWidth === 0 || clientHeight === 0)
      return

    camera.aspect = clientWidth / clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(clientWidth, clientHeight)
    composer.setSize(clientWidth, clientHeight)
    bloomPass.setSize(clientWidth, clientHeight)
  }

  resize()

  let animationFrame = 0
  const clock = new THREE.Clock()

  function spawnLaser(target: THREE.Vector3) {
    const origin = camera.localToWorld(laserEmitterOffset.clone())
    const direction = new THREE.Vector3().subVectors(target, origin).normalize()
    const distance = origin.distanceTo(target)
    if (distance <= 0.01)
      return

    const material = new THREE.MeshBasicMaterial({
      color: 0x7DD3FC,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    material.toneMapped = false
    const mesh = new THREE.Mesh(laserGeometry, material)
    mesh.visible = false
    mesh.scale.set(LASER_RADIUS_SCALE, 0.001, LASER_RADIUS_SCALE)
    mesh.position.copy(origin)
    mesh.quaternion.setFromUnitVectors(laserUpAxis, direction)
    scene.add(mesh)
    const light = new THREE.PointLight(0x7DD3FC, LASER_LIGHT_INTENSITY * 0.65, LASER_LIGHT_DISTANCE, 1.8)
    light.castShadow = false
    light.position.copy(origin)
    scene.add(light)
    lasers.push({
      mesh,
      material,
      ttl: LASER_LIFETIME,
      light,
      origin,
      direction,
      distance,
      travelled: 0,
      elapsed: 0,
      hasReachedTarget: false,
    })
  }

  function spawnExplosion(position: THREE.Vector3, type: AsteroidType, asteroidScale: number) {
    if (reduceMotionQuery?.matches)
      return

    const color = selectExplosionColor(type)
    const { startScale, endScale } = computeExplosionScaleRange(asteroidScale)
    const material = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: EXPLOSION_BASE_OPACITY,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    material.toneMapped = false

    const mesh = new THREE.Mesh(explosionGeometry, material)
    mesh.position.copy(position)
    mesh.scale.setScalar(startScale)
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI)
    scene.add(mesh)

    const lightIntensity = type === 'relic' ? EXPLOSION_BASE_INTENSITY_RELIC : EXPLOSION_BASE_INTENSITY_ROCK
    const light = new THREE.PointLight(color, lightIntensity, EXPLOSION_LIGHT_DISTANCE, 2.2)
    light.castShadow = false
    light.position.copy(position)
    scene.add(light)

    const rotationAxis = new THREE.Vector3(
      THREE.MathUtils.randFloatSpread(1),
      THREE.MathUtils.randFloatSpread(1),
      THREE.MathUtils.randFloatSpread(1),
    )
    if (rotationAxis.lengthSq() < 1e-3)
      rotationAxis.set(1, 0, 0)
    rotationAxis.normalize()
    const rotationMagnitude = THREE.MathUtils.randFloat(EXPLOSION_ROTATION_SPEED_MIN, EXPLOSION_ROTATION_SPEED_MAX)
    const rotationSpeed = rotationAxis.multiplyScalar(rotationMagnitude)

    explosions.push({
      mesh,
      material,
      light,
      elapsed: 0,
      duration: EXPLOSION_DURATION,
      startScale,
      endScale,
      baseOpacity: EXPLOSION_BASE_OPACITY,
      lightIntensity,
      rotationSpeed,
    })
  }

  function animate() {
    const delta = clock.getDelta()
    const elapsed = clock.elapsedTime

    camera.position.x = cameraBasePosition.x + Math.sin(elapsed * 0.22) * 0.7
    camera.position.y = cameraBasePosition.y + Math.sin(elapsed * 0.31) * 0.5
    camera.lookAt(camera.position.x * 0.15, camera.position.y * 0.15, -12)

    for (let i = 0; i < STAR_COUNT; i++) {
      const idx = i * 3
      starPositions[idx + 2] += (STAR_SPEED + FORWARD_SPEED) * delta
      if (starPositions[idx + 2] > 25) {
        starPositions[idx] = randomSpread(STAR_SPREAD)
        starPositions[idx + 1] = randomSpread(STAR_SPREAD)
        starPositions[idx + 2] = -(Math.random() * STAR_DEPTH + 40)
      }
    }
    starGeometry.attributes.position.needsUpdate = true

    for (const planet of planets) {
      const { group, speed, rotation, ring } = planet
      group.position.z += (speed + FORWARD_SPEED) * delta
      group.rotation.x += rotation.x * delta
      group.rotation.y += rotation.y * delta
      group.rotation.z += rotation.z * delta
      if (ring && planet.ringSpin) {
        ring.rotation.x += planet.ringSpin.x * delta
        ring.rotation.y += planet.ringSpin.y * delta
        ring.rotation.z += planet.ringSpin.z * delta
      }

      if (group.position.z > 30)
        randomizePlanet(planet, false)
    }

    for (let i = explosions.length - 1; i >= 0; i--) {
      const explosion = explosions[i]
      explosion.elapsed += delta
      const progress = explosion.duration === 0 ? 1 : explosion.elapsed / explosion.duration
      const eased = easeOutCubic(progress)
      const currentScale = THREE.MathUtils.lerp(explosion.startScale, explosion.endScale, eased)
      explosion.mesh.scale.setScalar(currentScale)
      explosion.mesh.rotation.x += explosion.rotationSpeed.x * delta
      explosion.mesh.rotation.y += explosion.rotationSpeed.y * delta
      explosion.mesh.rotation.z += explosion.rotationSpeed.z * delta
      const remainingEnergy = Math.max(0, 1 - eased)
      explosion.material.opacity = explosion.baseOpacity * remainingEnergy
      explosion.light.intensity = explosion.lightIntensity * remainingEnergy

      if (progress >= 1) {
        scene.remove(explosion.mesh)
        scene.remove(explosion.light)
        explosion.material.dispose()
        explosion.light.dispose()
        explosions.splice(i, 1)
      }
    }

    for (let i = lasers.length - 1; i >= 0; i--) {
      const shot = lasers[i]
      if (!shot.hasReachedTarget) {
        shot.elapsed = Math.min(LASER_TRAVEL_DURATION, shot.elapsed + delta)
        const progress = LASER_TRAVEL_DURATION === 0 ? 1 : shot.elapsed / LASER_TRAVEL_DURATION
        shot.travelled = shot.distance * progress
        const length = Math.max(shot.travelled, 0.001)
        shot.mesh.visible = true
        shot.mesh.scale.set(LASER_RADIUS_SCALE, length, LASER_RADIUS_SCALE)
        laserMidpoint.copy(shot.origin).addScaledVector(shot.direction, length * 0.5)
        shot.mesh.position.copy(laserMidpoint)
        laserTip.copy(shot.origin).addScaledVector(shot.direction, length)
        shot.light.position.copy(laserTip)
        shot.light.intensity = LASER_LIGHT_INTENSITY * Math.max(0.4, progress)
        if (progress >= 1) {
          shot.hasReachedTarget = true
          shot.ttl = LASER_LIFETIME
        }
        continue
      }

      shot.ttl -= delta
      const lifeRatio = Math.max(0, shot.ttl / LASER_LIFETIME)
      shot.material.opacity = lifeRatio
      shot.light.intensity = LASER_LIGHT_INTENSITY * lifeRatio
      if (lifeRatio <= 0) {
        scene.remove(shot.mesh)
        scene.remove(shot.light)
        shot.material.dispose()
        shot.light.dispose()
        lasers.splice(i, 1)
      }
    }

    composer.render()
    animationFrame = requestAnimationFrame(animate)
  }

  animate()

  const resizeObserver = new ResizeObserver(() => resize())
  resizeObserver.observe(container)

  function shoot(ndcX: number, ndcY: number): LaboratoryShotResult | null {
    pointer.set(ndcX, ndcY)
    raycaster.setFromCamera(pointer, camera)
    const objects = planets.map(p => p.core)
    const hits = raycaster.intersectObjects(objects, false)
    const hitPoint = hits.length ? hits[0].point.clone() : null
    const targetPoint = hitPoint
      ?? camera.position.clone().add(raycaster.ray.direction.clone().multiplyScalar(160))
    spawnLaser(targetPoint)

    if (!hits.length)
      return null

    const hit = hits[0].object
    const body = colliderMap.get(hit)
    if (!body)
      return null

    const destroyedType = body.type
    const rewardMultiplier = body.rewardMultiplier
    if (hitPoint)
      spawnExplosion(hitPoint, destroyedType, body.scale)
    randomizePlanet(body, false)
    return { type: destroyedType, rewardMultiplier }
  }

  function cleanup() {
    cancelAnimationFrame(animationFrame)
    resizeObserver.disconnect()

    lasers.forEach((shot) => {
      scene.remove(shot.mesh)
      scene.remove(shot.light)
      shot.material.dispose()
      shot.light.dispose()
    })
    lasers.length = 0

    explosions.forEach((explosion) => {
      scene.remove(explosion.mesh)
      scene.remove(explosion.light)
      explosion.material.dispose()
      explosion.light.dispose()
    })
    explosions.length = 0

    cleanupCallbacks.forEach(fn => fn())
    composer.dispose()
    renderer.dispose()

    if (renderer.domElement.parentElement === container)
      container.removeChild(renderer.domElement)
  }

  return { cleanup, shoot }
}
