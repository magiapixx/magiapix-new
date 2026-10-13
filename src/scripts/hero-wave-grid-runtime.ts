import * as THREE from 'three';

const GRID_SIZE = 40;
const CUBE_SIZE = 0.8;
const CUBE_HEIGHT = 2.4;
const MAX_TRAIL_POINTS = 32;
const CAMERA_RADIUS = 34 / (1.5 * 1.5 * 1.5);
const ANIMATION_SPEED = 0.7;
const CAMERA_LERP_PER_FRAME = 0.04;
const IDLE_DELAY = 4.5;
const AUTOMATIC_RIPPLE_INTERVAL = 2.25;

interface TrailPoint {
  x: number;
  z: number;
  age: number;
  strength: number;
}

export function initializeHeroWaveGrid(canvas: HTMLCanvasElement): () => void {
  const hero = canvas.closest<HTMLElement>('.home-hero');
  if (!hero) return () => {};

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: false,
      antialias: true,
      powerPreference: 'low-power',
    });
  } catch (error) {
    console.error('Unable to initialize the interactive hero background.', error);
    return () => {};
  }

  const scene = new THREE.Scene();
  const baseColor = new THREE.Color('#ffffff');
  scene.background = baseColor;

  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 200);
  camera.up.set(0, 0, -1);
  camera.position.set(0, CAMERA_RADIUS, 0);
  camera.lookAt(0, 0, 0);

  const trailPoints: TrailPoint[] = [];
  const trailUniforms = Array.from(
    { length: MAX_TRAIL_POINTS },
    () => new THREE.Vector4(),
  );
  const shaderUniforms = {
    uTrailCount: { value: 0 },
    uTrail: { value: trailUniforms },
  };
  const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_HEIGHT, CUBE_SIZE);
  geometry.setAttribute(
    'aOffset',
    new THREE.InstancedBufferAttribute(
      new Float32Array(GRID_SIZE * GRID_SIZE * 2),
      2,
    ),
  );

  const material = new THREE.MeshBasicMaterial({
    color: '#ffffff',
  });
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uTrail = shaderUniforms.uTrail;
    shader.uniforms.uTrailCount = shaderUniforms.uTrailCount;
    shader.uniforms.uWaveSpeed = { value: 5.4 };
    shader.uniforms.uWaveFrequency = { value: 1.2 };
    shader.uniforms.uWaveWidth = { value: 2.7 };
    shader.uniforms.uFadeTime = { value: 2.0 };
    shader.uniforms.uWaveAmplitude = { value: 0.4 };
    shader.uniforms.uJitter = { value: 0.2 };
    shader.uniforms.uMaxHeight = { value: 0.4 };
    shader.uniforms.uBaseColor = { value: new THREE.Color('#ffffff') };
    shader.uniforms.uWaveColor = { value: new THREE.Color('#8fc9f2') };

    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        `#include <common>
        attribute vec2 aOffset;
        varying float vWaveHeight;
        varying vec3 vLocalPosition;
        varying vec3 vLocalNormal;
        uniform vec4 uTrail[${MAX_TRAIL_POINTS}];
        uniform int uTrailCount;
        uniform float uWaveSpeed;
        uniform float uWaveFrequency;
        uniform float uWaveWidth;
        uniform float uFadeTime;
        uniform float uWaveAmplitude;
        uniform float uJitter;
        uniform float uMaxHeight;

        vec2 hash2(vec2 p) {
          p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
          return fract(sin(p) * 43758.5453123) - 0.5;
        }`,
      )
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        vWaveHeight = 0.0;
        vLocalPosition = position;
        vLocalNormal = normal;

        if (position.y > 0.0) {
          vec2 worldXZ = aOffset + hash2(aOffset) * uJitter;
          float waveHeight = 0.0;
          float totalWeight = 0.0;

          for (int i = 0; i < ${MAX_TRAIL_POINTS}; i++) {
            if (i >= uTrailCount) break;
            vec4 point = uTrail[i];
            float distanceToPoint = length(worldXZ - point.xy);
            float relativeDistance = distanceToPoint - uWaveSpeed * point.z;
            float envelope = exp(-(relativeDistance * relativeDistance) / (uWaveWidth * uWaveWidth));
            float fade = exp(-point.z / uFadeTime);
            float attenuation = 1.0 / (1.0 + distanceToPoint * 0.1);
            float weight = fade * envelope * attenuation * point.w;

            waveHeight += weight * cos(uWaveFrequency * relativeDistance);
            totalWeight += weight;
          }

          waveHeight /= max(totalWeight, 1.0);
          float displacement = clamp(waveHeight * uWaveAmplitude, -uMaxHeight, uMaxHeight);
          transformed.y += displacement;
          vWaveHeight = displacement;
        }`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        `#include <common>
        varying float vWaveHeight;
        varying vec3 vLocalPosition;
        varying vec3 vLocalNormal;
        uniform vec3 uBaseColor;
        uniform vec3 uWaveColor;
        uniform float uMaxHeight;`,
      )
      .replace(
        '#include <color_fragment>',
        `#include <color_fragment>
        float waveMix = clamp(vWaveHeight / uMaxHeight, 0.0, 1.0);
        diffuseColor.rgb = mix(uBaseColor, uWaveColor, waveMix);
        vec3 edgeDistance = vec3(${CUBE_SIZE / 2}, ${CUBE_HEIGHT / 2}, ${CUBE_SIZE / 2}) - abs(vLocalPosition);
        vec3 faceNormal = abs(normalize(vLocalNormal));
        vec3 tangentEdgeDistance = mix(edgeDistance, vec3(1.0), faceNormal);
        float distanceToEdge = min(tangentEdgeDistance.x, min(tangentEdgeDistance.y, tangentEdgeDistance.z));
        float insetShadow = 1.0 - (1.0 - smoothstep(0.02, 0.12, distanceToEdge)) * 0.05;
        float sideFace = 1.0 - smoothstep(0.85, 0.98, faceNormal.y);
        diffuseColor.rgb *= mix(1.0, insetShadow, sideFace);`,
      );
  };

  const instances = new THREE.InstancedMesh(
    geometry,
    material,
    GRID_SIZE * GRID_SIZE,
  );
  const offsetAttribute = geometry.getAttribute('aOffset') as THREE.InstancedBufferAttribute;
  const spacing = CUBE_SIZE + 0.015;
  const gridOffset = ((GRID_SIZE - 1) * spacing) / 2;
  const dummy = new THREE.Object3D();

  for (let row = 0; row < GRID_SIZE; row += 1) {
    for (let column = 0; column < GRID_SIZE; column += 1) {
      const index = row * GRID_SIZE + column;
      const x = row * spacing - gridOffset;
      const z = column * spacing - gridOffset;
      dummy.position.set(x, CUBE_HEIGHT / 2, z);
      dummy.updateMatrix();
      instances.setMatrixAt(index, dummy.matrix);
      offsetAttribute.setXY(index, x, z);
    }
  }

  offsetAttribute.needsUpdate = true;
  instances.instanceMatrix.needsUpdate = true;
  scene.add(instances);

  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  const pointerPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const pointerTarget = new THREE.Vector3();
  const pointerHit = new THREE.Vector3();
  const planeSize = GRID_SIZE * spacing;
  const clock = new THREE.Timer();
  clock.connect(document);
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const visible = { value: true };
  let idleTimer = 0;
  let randomPointTimer = 0;
  let isPlacingRandomPoints = true;
  let lastPoint: THREE.Vector2 | undefined;
  let animationFrame = 0;

  const updateSize = () => {
    const { width, height } = hero.getBoundingClientRect();
    if (width <= 0 || height <= 0) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  };

  const addPoint = (x: number, z: number, strength: number) => {
    if (trailPoints.length >= MAX_TRAIL_POINTS) trailPoints.shift();
    trailPoints.push({ x, z, age: 0, strength });
  };

  if (!reducedMotion.matches) addPoint(0, 0, 1);

  const onPointerMove = (event: PointerEvent) => {
    if (reducedMotion.matches) return;
    const rect = canvas.getBoundingClientRect();
    pointer.set(
      ((event.clientX - rect.left) / rect.width) * 2 - 1,
      -((event.clientY - rect.top) / rect.height) * 2 + 1,
    );
    raycaster.setFromCamera(pointer, camera);
    if (!raycaster.ray.intersectPlane(pointerPlane, pointerHit)) return;
    if (Math.abs(pointerHit.x) > planeSize / 2 || Math.abs(pointerHit.z) > planeSize / 2) return;

    const currentPoint = new THREE.Vector2(pointerHit.x, pointerHit.z);
    if (lastPoint && lastPoint.distanceTo(currentPoint) < 0.1) return;
    const distance = lastPoint ? lastPoint.distanceTo(currentPoint) : 0.8;
    addPoint(pointerHit.x, pointerHit.z, Math.min(distance, 1.2));
    lastPoint = currentPoint;
    idleTimer = 0;
    randomPointTimer = 0;
    isPlacingRandomPoints = false;
  };

  const onPointerLeave = () => {
    lastPoint = undefined;
  };

  const resizeObserver = new ResizeObserver(updateSize);
  resizeObserver.observe(hero);
  updateSize();
  hero.addEventListener('pointermove', onPointerMove);
  hero.addEventListener('pointerleave', onPointerLeave);

  const onMotionPreferenceChange = () => {
    if (reducedMotion.matches) {
      trailPoints.length = 0;
      shaderUniforms.uTrailCount.value = 0;
    }
  };

  reducedMotion.addEventListener('change', onMotionPreferenceChange);

  const renderFrame = () => {
    animationFrame = requestAnimationFrame(renderFrame);
    if (!visible.value) return;

    clock.update();
    const delta = Math.min(clock.getDelta(), 0.05) * ANIMATION_SPEED;
    idleTimer += delta;

    if (!reducedMotion.matches) {
      if (idleTimer >= IDLE_DELAY) isPlacingRandomPoints = true;
      if (isPlacingRandomPoints) {
        randomPointTimer += delta;
        if (randomPointTimer >= AUTOMATIC_RIPPLE_INTERVAL) {
          addPoint(
            (Math.random() - 0.5) * planeSize * 0.5,
            (Math.random() - 0.5) * planeSize * 0.5,
            0.8 + Math.random() * 0.2,
          );
          randomPointTimer = 0;
        }
      }

      for (let index = trailPoints.length - 1; index >= 0; index -= 1) {
        trailPoints[index].age += delta;
        if (trailPoints[index].age > 8) trailPoints.splice(index, 1);
      }
    }

    for (let index = 0; index < trailUniforms.length; index += 1) {
      const point = trailPoints[index];
      if (point) {
        trailUniforms[index].set(point.x, point.z, point.age, point.strength);
      } else {
        trailUniforms[index].set(0, 0, 0, 0);
      }
    }
    shaderUniforms.uTrailCount.value = reducedMotion.matches ? 0 : trailPoints.length;

    const normalizedX = pointer.x || 0;
    const normalizedY = pointer.y || 0;
    const alpha = normalizedY * Math.PI * 0.03;
    const beta = normalizedX * Math.PI * 0.05;
    pointerTarget.set(
      -CAMERA_RADIUS * Math.cos(alpha) * Math.sin(beta),
      CAMERA_RADIUS * Math.cos(alpha) * Math.cos(beta),
      CAMERA_RADIUS * Math.sin(alpha),
    );
    const cameraLerp = 1 - Math.pow(1 - CAMERA_LERP_PER_FRAME, delta * 60);
    camera.position.lerp(pointerTarget, reducedMotion.matches ? 1 : cameraLerp);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  const observer = new IntersectionObserver(([entry]) => {
    visible.value = entry.isIntersecting;
    if (entry.isIntersecting) clock.reset();
  });
  observer.observe(hero);
  animationFrame = requestAnimationFrame(renderFrame);

  return () => {
    cancelAnimationFrame(animationFrame);
    observer.disconnect();
    resizeObserver.disconnect();
    hero.removeEventListener('pointermove', onPointerMove);
    hero.removeEventListener('pointerleave', onPointerLeave);
    reducedMotion.removeEventListener('change', onMotionPreferenceChange);
    clock.disconnect();
    clock.dispose();
    geometry.dispose();
    material.dispose();
    renderer.dispose();
  };
}
