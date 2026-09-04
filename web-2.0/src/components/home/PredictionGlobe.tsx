import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useRouter } from '../../context/RouterContext';
import { useTheme } from '../../context/ThemeContext';
import { createEarthCanvasTexture } from './globeTexture';
import { MARKETS } from '../../data/markets';
import { Play, Pause } from 'lucide-react';

interface MarketNode {
  id: string;
  category: string;
  question: string;
  shortTitle: string;
  yesPercent: number;
  noPercent: number;
  lat: number;
  lon: number;
  color: string;
  isYesDominant: boolean;
}

const RAW_NODE_COORDINATES: Array<{
  id: string;
  lat: number;
  lon: number;
  shortTitle: string;
  fallbackQuestion: string;
  category: string;
}> = [
  {
    id: 'us-fed-rate-cut-before-july-2026',
    lat: 38.9,
    lon: -77.0, // Washington DC
    shortTitle: 'Fed Rate Cut Before July 2026?',
    fallbackQuestion: 'Will the US Federal Reserve cut the benchmark interest rate by at least 25 bps before July 2026?',
    category: 'Macro & Politics',
  },
  {
    id: 'will-gta-vi-release-before-december-2026',
    lat: 55.95,
    lon: -3.19, // Edinburgh / UK
    shortTitle: 'GTA VI Launch Before Dec 2026?',
    fallbackQuestion: 'Will Grand Theft Auto VI officially release worldwide before December 1, 2026?',
    category: 'Entertainment',
  },
  {
    id: 'spacex-starship-orbital-catch-2026',
    lat: 25.99,
    lon: -97.15, // Starbase, Texas
    shortTitle: 'Starship Mechazilla Catch 2026?',
    fallbackQuestion: 'Will SpaceX successfully catch a Starship upper stage with the Mechazilla launch tower before December 2026?',
    category: 'Technology',
  },
  {
    id: 'ethereum-l1-gas-sub-10-gwei-q3-2026',
    lat: 47.37,
    lon: 8.54, // Zurich Crypto Valley
    shortTitle: 'ETH L1 Gas Below 10 Gwei?',
    fallbackQuestion: 'Will Ethereum Layer-1 average daily base gas fee remain below 10 Gwei throughout Q3 2026?',
    category: 'Crypto',
  },
  {
    id: 'apple-vision-air-consumer-headset-2026',
    lat: 37.33,
    lon: -122.03, // Cupertino
    shortTitle: 'Apple Consumer Vision Headset?',
    fallbackQuestion: 'Will Apple announce a lower-cost consumer Vision headset before November 2026?',
    category: 'Technology',
  },
  {
    id: 'who-will-win-india-vs-brazil',
    lat: 28.61,
    lon: 77.20, // New Delhi
    shortTitle: 'India vs Brazil Football Match?',
    fallbackQuestion: 'Who will win the India vs Brazil exhibition football match in December 2026?',
    category: 'Sports',
  },
];

const MARKET_NODES: MarketNode[] = RAW_NODE_COORDINATES.map((coord) => {
  const m = MARKETS.find((item) => item.id === coord.id);
  const yesPercent = m ? m.impliedProbabilityYes : 50;
  const noPercent = m ? m.impliedProbabilityNo : 50;
  const isYesDominant = yesPercent >= 50;
  return {
    id: coord.id,
    category: m ? m.category : coord.category,
    question: m ? m.question : coord.fallbackQuestion,
    shortTitle: coord.shortTitle,
    yesPercent,
    noPercent,
    lat: coord.lat,
    lon: coord.lon,
    color: isYesDominant ? '#10b981' : '#f43f5e',
    isYesDominant,
  };
});

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

export const PredictionGlobe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigate } = useRouter();
  const { theme } = useTheme();
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const hoveredNodeIdRef = useRef<string | null>(null);
  const isPausedRef = useRef<boolean>(false);

  useEffect(() => {
    hoveredNodeIdRef.current = hoveredNodeId;
  }, [hoveredNodeId]);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear any previous canvas
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const width = container.clientWidth || 560;
    const height = container.clientHeight || 560;
    const isMobile = width < 640;

    // 1. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0.2, isMobile ? 5.6 : 4.4);

    // 2. WebGL Renderer with performance bounds (low poly, capped dpr, preserveDrawingBuffer for tests)
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    // 3. Cinematic Lighting System
    const ambientLight = new THREE.AmbientLight(0xffffff, theme === 'dark' ? 1.6 : 1.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffffff, theme === 'dark' ? 2.4 : 1.8);
    dirLight1.position.set(5, 5, 6);
    scene.add(dirLight1);

    const rimLight = new THREE.DirectionalLight(theme === 'dark' ? 0x818cf8 : 0x6366f1, theme === 'dark' ? 1.8 : 1.2);
    rimLight.position.set(-6, -3, -5);
    scene.add(rimLight);

    // 4. Globe Master Hierarchy with Realistic Axial Tilt
    const globeGroup = new THREE.Group();
    globeGroup.rotation.z = THREE.MathUtils.degToRad(14);
    globeGroup.rotation.x = THREE.MathUtils.degToRad(8);
    scene.add(globeGroup);

    // 5. Earth Sphere with High-Fidelity Digital Vector Texture (Optimized 36x28 Geometry)
    const globeRadius = 1.55;
    const earthGeometry = new THREE.SphereGeometry(globeRadius, 36, 28);
    const earthTexture = createEarthCanvasTexture(theme === 'dark');
    const earthMaterial = new THREE.MeshStandardMaterial({
      map: earthTexture,
      roughness: 0.65,
      metalness: 0.2,
    });
    const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
    globeGroup.add(earthMesh);

    // 6. Ethereal Multi-Layer Atmospheric Aura (Optimized 24x18 Geometry)
    const atmosGeometry = new THREE.SphereGeometry(globeRadius * 1.035, 24, 18);
    const atmosMaterial = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x6366f1 : 0x4f46e5,
      transparent: true,
      opacity: theme === 'dark' ? 0.16 : 0.08,
      side: THREE.BackSide,
      blending: theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    const atmosMesh = new THREE.Mesh(atmosGeometry, atmosMaterial);
    globeGroup.add(atmosMesh);

    // 7. Delicate 3D Graticule Latitude/Longitude Wire Cage (Optimized 24x16 Geometry)
    const graticuleGeometry = new THREE.SphereGeometry(globeRadius * 1.004, 24, 16);
    const graticuleMaterial = new THREE.MeshBasicMaterial({
      color: theme === 'dark' ? 0x818cf8 : 0x94a3b8,
      wireframe: true,
      transparent: true,
      opacity: theme === 'dark' ? 0.12 : 0.07,
    });
    const graticuleMesh = new THREE.Mesh(graticuleGeometry, graticuleMaterial);
    globeGroup.add(graticuleMesh);

    // 8. Interactive Prediction Node Pins & Radar Wave Ripples
    interface NodeMeshGroup {
      nodeId: string;
      basePos: THREE.Vector3;
      beaconMesh: THREE.Mesh;
      pinStem: THREE.Line;
      radarRings: THREE.Mesh[];
    }

    const nodeMeshGroups: NodeMeshGroup[] = [];
    const interactiveRaycastObjects: THREE.Object3D[] = [];

    MARKET_NODES.forEach((node) => {
      const surfacePos = latLonToVector3(node.lat, node.lon, globeRadius + 0.005);
      const elevatedPos = latLonToVector3(node.lat, node.lon, globeRadius + 0.15);

      // Pin Stem (Vertical Laser Light Beam from Surface)
      const stemGeo = new THREE.BufferGeometry().setFromPoints([surfacePos, elevatedPos]);
      const stemMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(node.color),
        transparent: true,
        opacity: 0.8,
      });
      const pinStem = new THREE.Line(stemGeo, stemMat);
      globeGroup.add(pinStem);

      // Floating Beacon Jewel
      const beaconGeo = new THREE.SphereGeometry(0.042, 12, 12);
      const beaconMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(node.color),
      });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      beaconMesh.position.copy(elevatedPos);
      beaconMesh.userData = { nodeId: node.id };
      globeGroup.add(beaconMesh);
      interactiveRaycastObjects.push(beaconMesh);

      // Concentric Radar Waves (Expanding Surface Ripples)
      const radarRings: THREE.Mesh[] = [];
      for (let r = 0; r < 2; r++) {
        const ringGeo = new THREE.RingGeometry(0.035, 0.07, 20);
        const ringMat = new THREE.MeshBasicMaterial({
          color: new THREE.Color(node.color),
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.5,
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        ringMesh.position.copy(surfacePos);
        ringMesh.lookAt(new THREE.Vector3(0, 0, 0));
        globeGroup.add(ringMesh);
        radarRings.push(ringMesh);
      }

      nodeMeshGroups.push({
        nodeId: node.id,
        basePos: elevatedPos,
        beaconMesh,
        pinStem,
        radarRings,
      });
    });

    // 9. Great-Circle Inter-Hub Predictive Flow Arcs
    const ARCS: Array<{ from: [number, number]; to: [number, number]; elevation: number; color: string }> = [
      { from: [38.9, -77.0], to: [55.95, -3.19], elevation: 0.35, color: '#6366f1' }, // DC -> Edinburgh
      { from: [25.99, -97.15], to: [37.33, -122.03], elevation: 0.28, color: '#10b981' }, // Starbase -> Cupertino
      { from: [47.37, 8.54], to: [28.61, 77.20], elevation: 0.42, color: '#38bdf8' }, // Zurich -> New Delhi
    ];

    interface AnimatedArc {
      curve: THREE.QuadraticBezierCurve3;
      pulseMesh: THREE.Mesh;
      progress: number;
      speed: number;
    }

    const animatedArcs: AnimatedArc[] = [];

    ARCS.forEach((arcData) => {
      const p1 = latLonToVector3(arcData.from[0], arcData.from[1], globeRadius + 0.01);
      const p2 = latLonToVector3(arcData.to[0], arcData.to[1], globeRadius + 0.01);
      const mid = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(globeRadius + arcData.elevation);

      const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
      const curvePoints = curve.getPoints(32); // Low poly smooth curve

      // Arc Trajectory Line
      const arcGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);
      const arcMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(arcData.color),
        transparent: true,
        opacity: theme === 'dark' ? 0.5 : 0.35,
      });
      const arcLine = new THREE.Line(arcGeo, arcMat);
      globeGroup.add(arcLine);

      // Traveling Probability Comet Head
      const cometGeo = new THREE.SphereGeometry(0.032, 10, 10);
      const cometMat = new THREE.MeshBasicMaterial({
        color: new THREE.Color(arcData.color),
        transparent: true,
        opacity: 0.95,
      });
      const cometMesh = new THREE.Mesh(cometGeo, cometMat);
      globeGroup.add(cometMesh);

      animatedArcs.push({
        curve,
        pulseMesh: cometMesh,
        progress: Math.random(),
        speed: 0.004,
      });
    });

    // 10. Pointer Drag-to-Spin & Direct Raycasting
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;
    let dragVelocityX = 0;
    let dragVelocityY = 0;
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      dragVelocityX = 0;
      dragVelocityY = 0;
      container.style.cursor = 'grabbing';
    };

    const onPointerMove = (e: PointerEvent) => {
      // Calculate normalized mouse coordinate for raycasting
      const rect = container.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!isDragging) {
        // Direct Raycasting on 3D Beacon Jewels
        raycaster.setFromCamera(mouseCoord, camera);
        const intersects = raycaster.intersectObjects(interactiveRaycastObjects, false);
        if (intersects.length > 0) {
          const hoveredId = intersects[0].object.userData.nodeId;
          setHoveredNodeId(hoveredId);
          container.style.cursor = 'pointer';
        } else {
          setHoveredNodeId(null);
          container.style.cursor = 'grab';
        }
        return;
      }

      const deltaX = e.clientX - prevPointerX;
      const deltaY = e.clientY - prevPointerY;
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;

      globeGroup.rotation.y += deltaX * 0.006;
      globeGroup.rotation.x = THREE.MathUtils.clamp(
        globeGroup.rotation.x + deltaY * 0.0045,
        -0.45,
        0.45
      );

      dragVelocityX = deltaX * 0.005;
      dragVelocityY = deltaY * 0.004;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      container.style.cursor = 'grab';

      // If user clicked directly without significant drag, trigger node navigation
      if (Math.abs(dragVelocityX) < 0.002 && Math.abs(dragVelocityY) < 0.002) {
        const rect = container.getBoundingClientRect();
        mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        raycaster.setFromCamera(mouseCoord, camera);
        const intersects = raycaster.intersectObjects(interactiveRaycastObjects, false);
        if (intersects.length > 0) {
          const clickedId = intersects[0].object.userData.nodeId;
          navigate(`/markets/${clickedId}`);
        }
      }
    };

    container.style.cursor = 'grab';
    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // 11. High-Performance Animation Loop with Off-Screen Pause
    let animationFrameId: number;
    let isVisible = true;
    let lastTime = performance.now();
    let totalElapsedTime = 0;

    // IntersectionObserver to pause rendering when off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        // Only pause when genuinely outside viewport
        if (entry.boundingClientRect.height > 0) {
          isVisible = entry.isIntersecting;
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Definitively fast, majestic, visible idle auto-rotation
    // Standard: 0.18 rad/s (~35s per rotation).
    // Reduced motion variant: 0.06 rad/s (gentle, calm, but visibly alive).
    const baseRotationSpeed = prefersReducedMotion ? 0.06 : 0.18;

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible) return; // Zero render cost when off-screen

      const deltaMs = currentTime - lastTime;
      lastTime = currentTime;
      const delta = Math.min(deltaMs / 1000, 0.1);
      totalElapsedTime += delta;

      // Auto-rotation & Momentum damping
      if (!isDragging && !isPausedRef.current) {
        if (Math.abs(dragVelocityX) > 0.0001) {
          globeGroup.rotation.y += dragVelocityX;
          dragVelocityX *= 0.94; // Smooth inertia damping
        } else {
          globeGroup.rotation.y += delta * baseRotationSpeed;
        }

        if (Math.abs(dragVelocityY) > 0.0001) {
          globeGroup.rotation.x = THREE.MathUtils.clamp(
            globeGroup.rotation.x + dragVelocityY,
            -0.45,
            0.45
          );
          dragVelocityY *= 0.94;
        }
      }

      // Animate Beacon Nodes & Expanding Concentric Radar Ripples
      const activeHoverId = hoveredNodeIdRef.current;

      nodeMeshGroups.forEach((group, idx) => {
        const isHovered = group.nodeId === activeHoverId;
        const timeOffset = totalElapsedTime * 2.4 + idx;

        // Radar wave ripple expansion
        group.radarRings.forEach((ring, rIdx) => {
          const phase = (timeOffset + rIdx * 0.55) % 1.5;
          const scale = 1 + phase * 2.0;
          ring.scale.set(scale, scale, 1);
          const mat = ring.material as THREE.MeshBasicMaterial;
          mat.opacity = Math.max(0, (1 - phase / 1.5) * (isHovered ? 0.95 : 0.55));
        });

        // Elevated Beacon pulse / scale
        if (isHovered) {
          group.beaconMesh.scale.set(1.4, 1.4, 1.4);
          const stemMat = group.pinStem.material as THREE.LineBasicMaterial;
          stemMat.opacity = 1.0;
        } else {
          const beaconPulse = 1 + Math.sin(timeOffset * 2.2) * 0.14;
          group.beaconMesh.scale.set(beaconPulse, beaconPulse, beaconPulse);
          const stemMat = group.pinStem.material as THREE.LineBasicMaterial;
          stemMat.opacity = 0.7;
        }
      });

      // Animate Probability Flow Arc Comets
      animatedArcs.forEach((arc) => {
        arc.progress = (arc.progress + arc.speed) % 1;
        const point = arc.curve.getPointAt(arc.progress);
        if (point) {
          arc.pulseMesh.position.copy(point);
        }
      });

      renderer.render(scene, camera);
    };

    // Render first frame immediately, then launch continuous rAF loop
    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(animate);

    // 12. Dynamic ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.position.set(0, 0.2, w < 640 ? 5.6 : 4.4);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.render(scene, camera);
    });
    resizeObserver.observe(container);

    // 13. Complete Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      intersectionObserver.disconnect();
      resizeObserver.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
      renderer.dispose();
      earthGeometry.dispose();
      earthMaterial.dispose();
      earthTexture.dispose();
      atmosGeometry.dispose();
      atmosMaterial.dispose();
      graticuleGeometry.dispose();
      graticuleMaterial.dispose();
    };
  }, [theme]);

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none overflow-visible">
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        className="w-full h-[360px] sm:h-[520px] lg:h-[640px] cursor-grab active:cursor-grabbing flex items-center justify-center relative touch-none"
        aria-label="Interactive 3D Prediction Globe showing live real-world event nodes"
        role="img"
      />

      {/* Manual Spin Control Bar (Pause / Resume & Rotation Hint) */}
      <div className="absolute bottom-2 sm:bottom-4 left-4 z-20 flex items-center space-x-2 rounded-full border border-omx-border-strong/70 bg-omx-card/90 px-3 py-1.5 backdrop-blur-md text-[11px] font-sora font-semibold text-omx-text-secondary shadow-sm">
        <button
          type="button"
          onClick={() => setIsPaused(!isPaused)}
          className="flex items-center space-x-1.5 hover:text-omx-text transition-colors focus:outline-none cursor-pointer"
          aria-label={isPaused ? 'Resume globe auto-rotation' : 'Pause globe auto-rotation'}
          title={isPaused ? 'Resume rotation' : 'Pause rotation'}
        >
          {isPaused ? <Play className="h-3 w-3 text-emerald-500 fill-emerald-500" /> : <Pause className="h-3 w-3 text-omx-text-muted" />}
          <span>{isPaused ? 'Paused' : 'Auto-Rotating'}</span>
        </button>
        <span className="text-omx-border">|</span>
        <span className="text-omx-text-muted hidden sm:inline">Drag to spin</span>
      </div>

      {/* Floating Quiet Market Callouts (Desktop & Tablet) */}
      <div className="hidden sm:block absolute inset-0 pointer-events-none">
        {/* Callout 1: Top-Left (Macro & Policy - Washington DC) */}
        {(() => {
          const fedMarket = MARKETS.find((m) => m.id === 'us-fed-rate-cut-before-july-2026') || MARKETS[1];
          return (
            <div
              onClick={() => navigate(`/markets/${fedMarket.id}`)}
              onMouseEnter={() => setHoveredNodeId(fedMarket.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`absolute top-4 left-0 sm:left-2 z-20 pointer-events-auto max-w-[210px] lg:max-w-[240px] rounded-2xl border ${
                hoveredNodeId === fedMarket.id
                  ? 'border-indigo-500 shadow-lg scale-102 ring-1 ring-indigo-500/30'
                  : 'border-omx-border-strong/80 shadow-sm'
              } bg-omx-card/95 p-3.5 backdrop-blur-md transition-all cursor-pointer space-y-1.5`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-omx-text-muted uppercase tracking-wider">
                  {fedMarket.category}
                </span>
                <span className="font-mono text-[9px] text-omx-text-secondary font-medium">
                  $1.00 Rule
                </span>
              </div>
              <p className="font-sora font-semibold text-xs text-omx-text line-clamp-2 leading-snug">
                Fed rate cut before July 2026?
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                <span className="px-2 py-0.5 rounded bg-omx-yes-bg text-omx-yes font-bold">
                  YES {fedMarket.impliedProbabilityYes}%
                </span>
                <span className="px-2 py-0.5 rounded bg-omx-no-bg text-omx-no font-bold">
                  NO {fedMarket.impliedProbabilityNo}%
                </span>
              </div>
            </div>
          );
        })()}

        {/* Callout 2: Top-Right (Entertainment - Edinburgh / GTA VI) */}
        {(() => {
          const gtaMarket = MARKETS.find((m) => m.id === 'will-gta-vi-release-before-december-2026') || MARKETS[1];
          return (
            <div
              onClick={() => navigate(`/markets/${gtaMarket.id}`)}
              onMouseEnter={() => setHoveredNodeId(gtaMarket.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`absolute top-10 right-0 sm:right-2 z-20 pointer-events-auto max-w-[210px] lg:max-w-[240px] rounded-2xl border ${
                hoveredNodeId === gtaMarket.id
                  ? 'border-indigo-500 shadow-lg scale-102 ring-1 ring-indigo-500/30'
                  : 'border-omx-border-strong/80 shadow-sm'
              } bg-omx-card/95 p-3.5 backdrop-blur-md transition-all cursor-pointer space-y-1.5`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-omx-text-muted uppercase tracking-wider">
                  {gtaMarket.category}
                </span>
                <span className="font-mono text-[9px] text-omx-text-secondary font-medium">
                  $1.00 Rule
                </span>
              </div>
              <p className="font-sora font-semibold text-xs text-omx-text line-clamp-2 leading-snug">
                GTA VI launch before Dec 2026?
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                <span className="px-2 py-0.5 rounded bg-omx-yes-bg text-omx-yes font-bold">
                  YES {gtaMarket.impliedProbabilityYes}%
                </span>
                <span className="px-2 py-0.5 rounded bg-omx-no-bg text-omx-no font-bold">
                  NO {gtaMarket.impliedProbabilityNo}%
                </span>
              </div>
            </div>
          );
        })()}

        {/* Callout 3: Bottom-Left (Technology - Starbase TX / SpaceX) */}
        {(() => {
          const spaceMarket = MARKETS.find((m) => m.id === 'spacex-starship-orbital-catch-2026') || MARKETS[2];
          return (
            <div
              onClick={() => navigate(`/markets/${spaceMarket.id}`)}
              onMouseEnter={() => setHoveredNodeId(spaceMarket.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`absolute bottom-6 left-0 sm:left-4 z-20 pointer-events-auto max-w-[210px] lg:max-w-[240px] rounded-2xl border ${
                hoveredNodeId === spaceMarket.id
                  ? 'border-indigo-500 shadow-lg scale-102 ring-1 ring-indigo-500/30'
                  : 'border-omx-border-strong/80 shadow-sm'
              } bg-omx-card/95 p-3.5 backdrop-blur-md transition-all cursor-pointer space-y-1.5`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-omx-text-muted uppercase tracking-wider">
                  {spaceMarket.category}
                </span>
                <span className="font-mono text-[9px] text-omx-text-secondary font-medium">
                  $1.00 Rule
                </span>
              </div>
              <p className="font-sora font-semibold text-xs text-omx-text line-clamp-2 leading-snug">
                Starship stage catch in 2026?
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                <span className="px-2 py-0.5 rounded bg-omx-yes-bg text-omx-yes font-bold">
                  YES {spaceMarket.impliedProbabilityYes}%
                </span>
                <span className="px-2 py-0.5 rounded bg-omx-no-bg text-omx-no font-bold">
                  NO {spaceMarket.impliedProbabilityNo}%
                </span>
              </div>
            </div>
          );
        })()}

        {/* Callout 4: Bottom-Right (Crypto - Zurich / ETH Gas) */}
        {(() => {
          const ethMarket = MARKETS.find((m) => m.id === 'ethereum-l1-gas-sub-10-gwei-q3-2026') || MARKETS[3];
          return (
            <div
              onClick={() => navigate(`/markets/${ethMarket.id}`)}
              onMouseEnter={() => setHoveredNodeId(ethMarket.id)}
              onMouseLeave={() => setHoveredNodeId(null)}
              className={`absolute bottom-8 right-0 sm:right-4 z-20 pointer-events-auto max-w-[210px] lg:max-w-[240px] rounded-2xl border ${
                hoveredNodeId === ethMarket.id
                  ? 'border-indigo-500 shadow-lg scale-102 ring-1 ring-indigo-500/30'
                  : 'border-omx-border-strong/80 shadow-sm'
              } bg-omx-card/95 p-3.5 backdrop-blur-md transition-all cursor-pointer space-y-1.5`}
            >
              <div className="flex items-center justify-between text-[10px]">
                <span className="font-semibold text-omx-text-muted uppercase tracking-wider">
                  {ethMarket.category}
                </span>
                <span className="font-mono text-[9px] text-omx-text-secondary font-medium">
                  $1.00 Rule
                </span>
              </div>
              <p className="font-sora font-semibold text-xs text-omx-text line-clamp-2 leading-snug">
                ETH L1 gas sub-10 Gwei Q3 2026?
              </p>
              <div className="flex items-center justify-between text-[11px] font-mono pt-1">
                <span className="px-2 py-0.5 rounded bg-omx-yes-bg text-omx-yes font-bold">
                  YES {ethMarket.impliedProbabilityYes}%
                </span>
                <span className="px-2 py-0.5 rounded bg-omx-no-bg text-omx-no font-bold">
                  NO {ethMarket.impliedProbabilityNo}%
                </span>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
