import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Move3d, Compass, Layers, Sparkles, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '../data/content';

interface ScenePerspective {
  id: string;
  title: string;
  location: string;
  specs: string;
  layers: {
    bg: string;
    mid: string;
  };
}

const PERSPECTIVES: ScenePerspective[] = [
  {
    id: 'cantilever-villa',
    title: 'The Monolith Cantilever',
    location: 'Sector 9, Chandigarh',
    specs: 'Span: 12.8m · Clear Height: 7.2m · Post-Tensioned RCC',
    layers: {
      bg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80',
      mid: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=80',
    },
  },
  {
    id: 'glass-pavilion',
    title: 'The Glass Courtyard',
    location: 'Wave Estate, Mohali',
    specs: 'Floor-to-Ceiling Glazing: 4.2m · Schüco Slimline · Reflection Pool',
    layers: {
      bg: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80',
      mid: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=2000&q=80',
    },
  },
  {
    id: 'great-salon',
    title: 'Double-Height Salon',
    location: 'Eco City 1, New Chandigarh',
    specs: 'Volume: 420m³ · Statuario Marble · Architectural Acoustic Louvers',
    layers: {
      bg: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=80',
      mid: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2000&q=80',
    },
  },
];

export const SpatialDepthViewer: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activePerspectiveIndex, setActivePerspectiveIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [depthSeparation, setDepthSeparation] = useState(1.4);
  const [isHovered, setIsHovered] = useState(false);

  // Three.js internal references
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshBgRef = useRef<THREE.Mesh | null>(null);
  const meshMidRef = useRef<THREE.Mesh | null>(null);
  const gridHelperRef = useRef<THREE.LineSegments | null>(null);
  const targetCamPos = useRef(new THREE.Vector3(0, 0, 5));
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 5));

  const activePerspective = PERSPECTIVES[activePerspectiveIndex];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0c0d10);
    scene.fog = new THREE.FogExp2(0x0c0d10, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);
    cameraRef.current = camera;

    // 2. High-Performance Renderer
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 3. Ambient & Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfef3c7, 1.0);
    dirLight.position.set(3, 4, 5);
    scene.add(dirLight);

    // 4. Subtle Architectural Coordinate Grid (Floor plane)
    const gridGeometry = new THREE.BufferGeometry();
    const gridPoints: number[] = [];
    const size = 6;
    const step = 0.5;
    for (let i = -size; i <= size; i += step) {
      gridPoints.push(-size, -1.6, i, size, -1.6, i);
      gridPoints.push(i, -1.6, -size, i, -1.6, size);
    }
    gridGeometry.setAttribute('position', new THREE.Float32BufferAttribute(gridPoints, 3));
    const gridMaterial = new THREE.LineBasicMaterial({
      color: 0x333b47,
      transparent: true,
      opacity: 0.25,
    });
    const gridLines = new THREE.LineSegments(gridGeometry, gridMaterial);
    scene.add(gridLines);
    gridHelperRef.current = gridLines;

    // 5. Plane Geometries with Real Architectural Photography Textures
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin('anonymous');

    const planeGeo = new THREE.PlaneGeometry(4.4, 2.7, 32, 32);

    // Background Layer Plane
    const bgTexture = textureLoader.load(activePerspective.layers.bg);
    bgTexture.colorSpace = THREE.SRGBColorSpace;
    const bgMaterial = new THREE.MeshBasicMaterial({
      map: bgTexture,
      transparent: true,
      opacity: 0.85,
    });
    const bgMesh = new THREE.Mesh(planeGeo, bgMaterial);
    bgMesh.position.set(0, 0, -1.8);
    bgMesh.scale.set(1.25, 1.25, 1);
    scene.add(bgMesh);
    meshBgRef.current = bgMesh;

    // Midground Detail Plane (Forward Layer with Depth Offset)
    const midTexture = textureLoader.load(activePerspective.layers.mid);
    midTexture.colorSpace = THREE.SRGBColorSpace;
    const midMaterial = new THREE.MeshBasicMaterial({
      map: midTexture,
      transparent: true,
      opacity: 0.95,
      blending: THREE.NormalBlending,
    });
    const midMesh = new THREE.Mesh(planeGeo, midMaterial);
    midMesh.position.set(0, 0, 0);
    scene.add(midMesh);
    meshMidRef.current = midMesh;

    // 6. Animation Loop with Silky Exponential Damping
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.1);

      // Smooth camera interpolation towards target
      currentCamPos.current.x = THREE.MathUtils.damp(
        currentCamPos.current.x,
        targetCamPos.current.x,
        4.0,
        delta
      );
      currentCamPos.current.y = THREE.MathUtils.damp(
        currentCamPos.current.y,
        targetCamPos.current.y,
        4.0,
        delta
      );
      currentCamPos.current.z = THREE.MathUtils.damp(
        currentCamPos.current.z,
        targetCamPos.current.z,
        4.0,
        delta
      );

      if (cameraRef.current) {
        cameraRef.current.position.copy(currentCamPos.current);
        cameraRef.current.lookAt(0, 0, -0.5);
      }

      // Layer parallax rotation
      if (meshBgRef.current) {
        meshBgRef.current.rotation.y = THREE.MathUtils.damp(
          meshBgRef.current.rotation.y,
          -currentCamPos.current.x * 0.04,
          3.0,
          delta
        );
        meshBgRef.current.rotation.x = THREE.MathUtils.damp(
          meshBgRef.current.rotation.x,
          currentCamPos.current.y * 0.04,
          3.0,
          delta
        );
      }

      if (meshMidRef.current) {
        meshMidRef.current.rotation.y = THREE.MathUtils.damp(
          meshMidRef.current.rotation.y,
          -currentCamPos.current.x * 0.08,
          4.0,
          delta
        );
        meshMidRef.current.rotation.x = THREE.MathUtils.damp(
          meshMidRef.current.rotation.x,
          currentCamPos.current.y * 0.08,
          4.0,
          delta
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    // 7. Resize Observer
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      cameraRef.current.aspect = newW / newH;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      gridGeometry.dispose();
      gridMaterial.dispose();
      planeGeo.dispose();
      bgMaterial.dispose();
      midMaterial.dispose();
      bgTexture.dispose();
      midTexture.dispose();
      renderer.dispose();
    };
  }, [activePerspectiveIndex]);

  // Update textures when active perspective changes
  useEffect(() => {
    if (!meshBgRef.current || !meshMidRef.current) return;
    const loader = new THREE.TextureLoader();
    loader.setCrossOrigin('anonymous');

    loader.load(activePerspective.layers.bg, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      if (meshBgRef.current) {
        (meshBgRef.current.material as THREE.MeshBasicMaterial).map = tex;
        (meshBgRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
      }
    });

    loader.load(activePerspective.layers.mid, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      if (meshMidRef.current) {
        (meshMidRef.current.material as THREE.MeshBasicMaterial).map = tex;
        (meshMidRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
      }
    });
  }, [activePerspectiveIndex]);

  // Adjust depth separation
  useEffect(() => {
    if (meshBgRef.current) {
      meshBgRef.current.position.z = -depthSeparation;
    }
  }, [depthSeparation]);

  // Mouse / Pointer handler for parallax camera tilt
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });

    targetCamPos.current.x = x * 0.85;
    targetCamPos.current.y = y * 0.55;
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    targetCamPos.current.set(0, 0, 5.2);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section className="relative py-20 md:py-28 bg-[#090a0c] border-t border-neutral-800 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-amber-200/90 font-mono mb-2">
              <Move3d className="w-3.5 h-3.5" />
              <span>3D Spatial Depth Studio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              Spatial Depth & <br />
              <span className="font-editorial italic font-normal text-amber-100">Architectural Planes.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
            Move your cursor across the viewport to observe multi-plane parallax depth across real architectural photography—demonstrating structural layering, sightlines, and cantilevered volumes.
          </p>
        </div>

        {/* Perspective Selector Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          {PERSPECTIVES.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setActivePerspectiveIndex(idx)}
              className={`px-4 py-2.5 text-xs font-mono tracking-wider uppercase transition-all duration-200 border ${
                activePerspectiveIndex === idx
                  ? 'bg-amber-100 text-neutral-950 font-semibold border-amber-200'
                  : 'bg-neutral-900/60 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              <span className="text-[10px] opacity-70 mr-2">0{idx + 1}</span>
              <span>{p.title}</span>
            </button>
          ))}
        </div>

        {/* Main Interactive Three.js WebGL Container */}
        <div
          className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px] bg-[#0c0d10] border border-neutral-800 overflow-hidden group select-none cursor-grab active:cursor-grabbing touch-pan-y"
          onPointerMove={handlePointerMove}
          onPointerEnter={() => setIsHovered(true)}
          onPointerLeave={handlePointerLeave}
        >
          {/* WebGL Canvas Mount */}
          <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />

          {/* Architectural HUD Overlay: Top Left Spec Pill */}
          <div className="absolute top-5 left-5 z-10 pointer-events-none bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 p-3 max-w-xs font-mono text-xs">
            <div className="flex items-center gap-2 text-amber-200 text-[11px] mb-1">
              <Compass className="w-3.5 h-3.5" />
              <span className="uppercase tracking-widest">{activePerspective.location}</span>
            </div>
            <p className="text-white text-sm font-light font-sans">{activePerspective.title}</p>
            <p className="text-neutral-400 text-[11px] mt-1 font-mono">{activePerspective.specs}</p>
          </div>

          {/* Top Right Live Telemetry */}
          <div className="absolute top-5 right-5 z-10 pointer-events-none bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80 px-3 py-2 font-mono text-[11px] text-neutral-400 flex items-center gap-4">
            <div>
              <span>CAM X: </span>
              <span className="text-amber-200 tabular-nums">
                {(mousePos.x * 0.85).toFixed(2)}m
              </span>
            </div>
            <div>
              <span>CAM Y: </span>
              <span className="text-amber-200 tabular-nums">
                {(mousePos.y * 0.55).toFixed(2)}m
              </span>
            </div>
            <div>
              <span>Z-GAP: </span>
              <span className="text-neutral-200 tabular-nums">{depthSeparation.toFixed(1)}m</span>
            </div>
          </div>

          {/* Center Crosshairs Overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-8 h-[1px] bg-white/40" />
            <div className="h-8 w-[1px] bg-white/40" />
          </div>

          {/* Unified Bottom Control Dock (Three.js Skill Compliant) */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 bg-neutral-950/90 backdrop-blur-md border border-neutral-800 px-5 py-3 max-w-xl w-[92%] sm:w-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-xs font-mono text-neutral-400">
              <Layers className="w-4 h-4 text-amber-200" />
              <span>Spatial Z-Separation:</span>
              <input
                type="range"
                min="0.6"
                max="2.5"
                step="0.1"
                value={depthSeparation}
                onChange={(e) => setDepthSeparation(parseFloat(e.target.value))}
                className="w-24 sm:w-32 accent-amber-200 cursor-pointer"
              />
              <span className="text-white tabular-nums w-8">{depthSeparation.toFixed(1)}m</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-neutral-500 hidden sm:inline">
                {isHovered ? 'Active Parallax View' : 'Move cursor to explore depth'}
              </span>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(
                  `Hello Archia Constructions, I viewed "${activePerspective.title}" on your 3D spatial depth explorer and would like to discuss structural designs for our residence.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-neutral-950 text-[11px] font-semibold uppercase tracking-wider transition-colors shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-800" />
                <span>Inquire</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
