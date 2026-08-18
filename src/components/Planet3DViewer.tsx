import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Planet } from "../types";
import { RotateCw, ZoomIn, ZoomOut, Sparkles, Compass } from "lucide-react";
import { sounds } from "../utils/audio";

interface Planet3DViewerProps {
  planet: Planet;
  className?: string;
}

// Generate procedural procedural textures for high quality 3D planet rendering without external assets
function createPlanetTexture(planet: Planet): { map: THREE.CanvasTexture; bump?: THREE.CanvasTexture; clouds?: THREE.CanvasTexture } {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  const primary = planet.visualConfig.primaryColor;
  const secondary = planet.visualConfig.secondaryColor;

  // Base background
  ctx.fillStyle = primary;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const pattern = planet.visualConfig.surfacePattern;

  if (pattern === "gas_stripes" || pattern === "toxic_swirls") {
    // Gas giant banded stripes and storms
    for (let y = 0; y < canvas.height; y += 4) {
      const freq = Math.sin(y * 0.05) * 0.5 + Math.cos(y * 0.02) * 0.5;
      const blend = Math.abs(freq);
      ctx.fillStyle = blend > 0.4 ? secondary : primary;
      ctx.globalAlpha = 0.6 + blend * 0.4;
      ctx.fillRect(0, y, canvas.width, 4);
    }
    // Great storm spots
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = secondary;
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.4, canvas.height * 0.6, 90, 45, 0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(canvas.width * 0.7, canvas.height * 0.35, 60, 25, -0.1, 0, Math.PI * 2);
    ctx.fill();
  } else if (pattern === "lava_cracks") {
    // Magma & lava fissures
    ctx.fillStyle = "#1a0d00";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = planet.visualConfig.emissiveColor || "#ff4757";
    ctx.lineWidth = 4;
    ctx.shadowColor = "#ff793f";
    ctx.shadowBlur = 12;

    for (let i = 0; i < 40; i++) {
      ctx.beginPath();
      let sx = Math.random() * canvas.width;
      let sy = Math.random() * canvas.height;
      ctx.moveTo(sx, sy);
      for (let step = 0; step < 8; step++) {
        sx += (Math.random() - 0.5) * 90;
        sy += (Math.random() - 0.5) * 90;
        ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
  } else if (pattern === "ice_crystals") {
    // Glacial cracks and icy plains
    ctx.fillStyle = "#c7ecee";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = secondary;
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 40 + Math.random() * 80, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2;
    for (let i = 0; i < 25; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.stroke();
    }
  } else {
    // Terrestrial / Oceanic continents
    ctx.fillStyle = primary; // Ocean
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Continents
    ctx.fillStyle = secondary;
    for (let i = 0; i < 16; i++) {
      ctx.beginPath();
      const cx = Math.random() * canvas.width;
      const cy = Math.random() * canvas.height;
      const rad = 60 + Math.random() * 110;
      ctx.arc(cx, cy, rad, 0, Math.PI * 2);
      ctx.fill();

      // Island clusters
      for (let j = 0; j < 5; j++) {
        ctx.beginPath();
        ctx.arc(cx + (Math.random() - 0.5) * 140, cy + (Math.random() - 0.5) * 140, 20 + Math.random() * 30, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.ClampToEdgeWrapping;

  // Cloud Texture Layer
  let clouds: THREE.CanvasTexture | undefined;
  if (planet.visualConfig.cloudLayer) {
    const cloudCanvas = document.createElement("canvas");
    cloudCanvas.width = 1024;
    cloudCanvas.height = 512;
    const cCtx = cloudCanvas.getContext("2d")!;
    cCtx.clearRect(0, 0, cloudCanvas.width, cloudCanvas.height);
    cCtx.fillStyle = "rgba(255, 255, 255, 0.75)";

    for (let i = 0; i < 45; i++) {
      cCtx.beginPath();
      const cx = Math.random() * cloudCanvas.width;
      const cy = Math.random() * cloudCanvas.height;
      const rx = 50 + Math.random() * 100;
      const ry = 15 + Math.random() * 35;
      cCtx.ellipse(cx, cy, rx, ry, (Math.random() - 0.5) * 0.4, 0, Math.PI * 2);
      cCtx.fill();
    }
    clouds = new THREE.CanvasTexture(cloudCanvas);
    clouds.wrapS = THREE.RepeatWrapping;
  }

  return { map, clouds };
}

export const Planet3DViewer: React.FC<Planet3DViewerProps> = ({ planet, className = "w-full h-full" }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isRotating, setIsRotating] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planetMeshRef = useRef<THREE.Mesh | null>(null);
  const cloudsMeshRef = useRef<THREE.Mesh | null>(null);
  const ringsMeshRef = useRef<THREE.Mesh | null>(null);
  const atmosphereMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    setIsLoading(true);

    // Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 3.6;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;

    container.innerHTML = "";
    container.appendChild(renderer.domElement);

    // Lighting
    const sunLight = new THREE.DirectionalLight(0xffffff, 2.4);
    sunLight.position.set(5, 3, 4);
    scene.add(sunLight);

    const backLight = new THREE.DirectionalLight(0x70a1ff, 0.6);
    backLight.position.set(-5, -2, -3);
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0x161338, 1.2);
    scene.add(ambientLight);

    // Dynamic Procedural Textures
    const { map, clouds } = createPlanetTexture(planet);

    // Planet Sphere Geometry
    const geometry = new THREE.SphereGeometry(1.2, 64, 64);
    const material = new THREE.MeshStandardMaterial({
      map: map,
      roughness: planet.visualConfig.roughness,
      metalness: 0.1,
      emissive: new THREE.Color(planet.visualConfig.emissiveColor || "#000000"),
      emissiveIntensity: planet.visualConfig.emissiveIntensity || 0
    });

    const planetMesh = new THREE.Mesh(geometry, material);
    planetMeshRef.current = planetMesh;
    scene.add(planetMesh);

    // Cloud Layer
    if (clouds) {
      const cloudGeo = new THREE.SphereGeometry(1.22, 64, 64);
      const cloudMat = new THREE.MeshStandardMaterial({
        map: clouds,
        transparent: true,
        opacity: 0.65,
        blending: THREE.NormalBlending,
        roughness: 1
      });
      const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
      cloudsMeshRef.current = cloudMesh;
      scene.add(cloudMesh);
    }

    // Atmospheric Glow Halo Shader
    const atmosphereGeo = new THREE.SphereGeometry(1.28, 48, 48);
    const atmosphereMat = new THREE.ShaderMaterial({
      vertexShader: `
        varying vec3 vNormal;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec3 vNormal;
        uniform vec3 uColor;
        void main() {
          float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
          gl_FragColor = vec4(uColor, intensity * 0.85);
        }
      `,
      uniforms: {
        uColor: { value: new THREE.Color(planet.visualConfig.atmosphereColor) }
      },
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      transparent: true
    });
    const atmosphereMesh = new THREE.Mesh(atmosphereGeo, atmosphereMat);
    atmosphereMeshRef.current = atmosphereMesh;
    scene.add(atmosphereMesh);

    // Optional Rings (Gliese 667Cc, K2-18b)
    if (planet.visualConfig.hasRings) {
      const inner = planet.visualConfig.ringInnerRadius || 1.5;
      const outer = planet.visualConfig.ringOuterRadius || 2.2;
      const ringGeo = new THREE.RingGeometry(inner, outer, 64);
      
      // Position ring horizontally and tilted
      const ringMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(planet.visualConfig.ringColor || "#ffffff"),
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8,
        roughness: 0.4
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.rotation.x = Math.PI / 2.3;
      ringMesh.rotation.y = 0.2;
      ringsMeshRef.current = ringMesh;
      scene.add(ringMesh);
    }

    // Mouse / Touch Drag Interaction State
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging || !planetMeshRef.current) return;
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      planetMeshRef.current.rotation.y += deltaX * 0.008;
      planetMeshRef.current.rotation.x += deltaY * 0.008;

      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += deltaX * 0.008;
        cloudsMeshRef.current.rotation.x += deltaY * 0.008;
      }
      if (ringsMeshRef.current) {
        ringsMeshRef.current.rotation.z += deltaX * 0.005;
      }

      previousMousePosition = { x: clientX, y: clientY };
    };

    const handlePointerUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    domElement.addEventListener("touchstart", handlePointerDown, { passive: true });
    window.addEventListener("touchmove", handlePointerMove, { passive: true });
    window.addEventListener("touchend", handlePointerUp);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (isRotating && planetMeshRef.current) {
        planetMeshRef.current.rotation.y += 0.003;
      }
      if (cloudsMeshRef.current) {
        cloudsMeshRef.current.rotation.y += 0.0045;
      }

      renderer.render(scene, camera);
    };

    animate();
    setIsLoading(false);

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      domElement.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("mousemove", handlePointerMove);
      window.removeEventListener("mouseup", handlePointerUp);
      domElement.removeEventListener("touchstart", handlePointerDown);
      window.removeEventListener("touchmove", handlePointerMove);
      window.removeEventListener("touchend", handlePointerUp);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [planet]);

  const handleZoom = (direction: "in" | "out") => {
    sounds.playClick();
    if (!cameraRef.current) return;
    const step = direction === "in" ? -0.5 : 0.5;
    const newZ = Math.min(Math.max(cameraRef.current.position.z + step, 2.0), 5.5);
    cameraRef.current.position.z = newZ;
    setZoomLevel(Number((3.6 / newZ).toFixed(1)));
  };

  const toggleRotation = () => {
    sounds.playClick();
    setIsRotating(!isRotating);
  };

  const resetView = () => {
    sounds.playClick();
    if (planetMeshRef.current && cameraRef.current) {
      planetMeshRef.current.rotation.set(0, 0, 0);
      if (cloudsMeshRef.current) cloudsMeshRef.current.rotation.set(0, 0, 0);
      cameraRef.current.position.z = 3.6;
      setZoomLevel(1);
    }
  };

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Background radial glow matching the planet's atmosphere */}
      <div
        className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full blur-3xl opacity-40 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: planet.visualConfig.atmosphereColor }}
      />

      {/* Central 3D Canvas Mount */}
      <div
        ref={mountRef}
        className="w-full h-full min-h-[320px] md:min-h-[440px] cursor-grab active:cursor-grabbing flex items-center justify-center"
      />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xs rounded-full">
          <Sparkles className="w-8 h-8 text-pink-400 animate-spin" />
          <p className="text-xs text-white/70 mt-2 font-mono">Synthesizing 3D Holo-Mesh...</p>
        </div>
      )}

      {/* Interactive Controls Overlay */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-[#1a1438]/80 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-full shadow-lg z-20">
        <button
          onClick={toggleRotation}
          title={isRotating ? "Pause Orbit" : "Resume Orbit"}
          className={`p-1.5 rounded-full text-xs font-mono transition-all ${
            isRotating ? "bg-pink-500/30 text-pink-300" : "bg-white/10 text-white/70 hover:text-white"
          }`}
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRotating ? "animate-spin" : ""}`} />
        </button>

        <div className="w-px h-3 bg-white/20" />

        <button
          onClick={() => handleZoom("in")}
          title="Zoom In"
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <span className="text-[11px] font-mono text-white/60 min-w-6 text-center">{zoomLevel}x</span>

        <button
          onClick={() => handleZoom("out")}
          title="Zoom Out"
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-3 bg-white/20" />

        <button
          onClick={resetView}
          title="Reset Orientation"
          className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 transition"
        >
          <Compass className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
