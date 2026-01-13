
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { ThreeDSceneData } from '../types';
import { Activity } from 'lucide-react';

interface ModelViewer3DProps {
  data: ThreeDSceneData;
  blenderScript?: string;
  isStreaming?: boolean;
  theme?: 'dark' | 'light';
}

const ModelViewer3D: React.FC<ModelViewer3DProps> = ({ data, blenderScript, isStreaming, theme = 'dark' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState({ polyCount: 0, vertexCount: 0 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!mountRef.current) return;

    const bgColor = theme === 'dark' ? '#020204' : '#f1f5f9';
    const gridColor = theme === 'dark' ? '#3b82f6' : '#2563eb';
    const gridLines = theme === 'dark' ? '#111111' : '#cbd5e1';

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(bgColor);
    
    // Performance: Disable Fog on Mobile
    if (theme === 'dark' && !isMobile) {
      scene.fog = new THREE.FogExp2(0x020204, 0.02);
    }

    const worldGroup = new THREE.Group();
    worldGroup.rotation.x = -Math.PI / 2; 
    scene.add(worldGroup);

    const viewerHeight = isMobile ? 350 : 600;
    const camera = new THREE.PerspectiveCamera(60, mountRef.current.clientWidth / viewerHeight, 0.1, 1000);
    
    // Performance: Disable Antialias on Mobile to save GPU
    const renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, viewerHeight);
    renderer.setPixelRatio(isMobile ? 1 : window.devicePixelRatio);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    mountRef.current.appendChild(renderer.domElement);

    // Cinematic 3-Point Lighting
    const keyLight = new THREE.DirectionalLight(0xffaa44, 1.5);
    keyLight.position.set(5, 5, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x00ffff, 2.0);
    rimLight.position.set(-5, 5, -5);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, isMobile ? 0.3 : 0.1);
    scene.add(ambientLight);
    
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    // Performance: Disable AutoRotate on Mobile to prevent background CPU drain
    controls.autoRotate = !isStreaming && !isMobile;
    controls.autoRotateSpeed = 0.8;

    const grid = new THREE.GridHelper(50, 50, new THREE.Color(gridColor), new THREE.Color(gridLines));
    grid.material.opacity = 0.05;
    grid.material.transparent = true;
    grid.rotation.x = Math.PI / 2;
    worldGroup.add(grid);

    let totalPolys = 0;
    let totalVerts = 0;

    data.objects.forEach((obj) => {
      let geometry: THREE.BufferGeometry | null = null;
      let hasVertexColors = false;

      if (obj.meshData && obj.meshData.vertices?.length > 0) {
        geometry = new THREE.BufferGeometry();
        const vertices = new Float32Array(obj.meshData.vertices.flat(Infinity));
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        
        if (obj.meshData.indices?.length) {
          geometry.setIndex(obj.meshData.indices);
          totalPolys += obj.meshData.indices.length / 3;
        } else {
          totalPolys += vertices.length / 9;
        }

        if (obj.meshData.colors && obj.meshData.colors.length > 0) {
          const colors = new Float32Array(obj.meshData.colors);
          geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
          hasVertexColors = true;
        }

        geometry.computeVertexNormals();
        totalVerts += vertices.length / 3;
      } else {
        geometry = new THREE.BoxGeometry(1, 1, 1);
      }

      const material = new THREE.MeshPhysicalMaterial({ 
        color: hasVertexColors ? 0xffffff : (obj.color || '#3b82f6'),
        metalness: isMobile ? 0.5 : 0.95, // Lower metalness on mobile for simpler shading
        roughness: 0.25,
        vertexColors: hasVertexColors,
        clearcoat: isMobile ? 0 : 0.5, // Disable clearcoat on mobile
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(...(obj.position || [0, 0, 0]));
      worldGroup.add(mesh);
    });

    setStats({ polyCount: Math.round(totalPolys), vertexCount: totalVerts });
    camera.position.set(10, 10, 10);
    camera.lookAt(0, 0, 0);
    
    let frameId: number;
    let time = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      time += 0.01;
      
      // Still apply subtle motion but throttle calculations
      if (!isMobile || (time % 0.04 < 0.02)) {
         const ease = Math.sin(time) * 0.5 + 0.5;
         const speed = 0.005 + (ease * 0.01);
         worldGroup.rotation.z += speed;
      }

      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const h = isMobile ? 350 : 600;
      camera.aspect = mountRef.current.clientWidth / h;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      scene.clear();
    };
  }, [data, isStreaming, theme, isMobile]);

  return (
    <div className={`w-full mt-6 md:mt-12 rounded-[2rem] md:rounded-[3.5rem] border overflow-hidden relative shadow-3xl transition-colors duration-500 ${theme === 'dark' ? 'bg-[#020204] border-blue-500/30' : 'bg-slate-100 border-slate-300'}`}>
      <div ref={mountRef} className={`w-full ${isMobile ? 'h-[350px]' : 'h-[600px]'} cursor-grab active:cursor-grabbing`} />
      
      <div className="absolute top-4 left-4 md:top-10 md:left-10 flex flex-col gap-2 md:gap-4">
        <div className={`px-4 py-2 md:px-8 md:py-3 border rounded-full backdrop-blur-3xl flex items-center gap-2 md:gap-4 shadow-xl transition-all ${theme === 'dark' ? 'bg-blue-600/20 border-blue-500/40' : 'bg-white/80 border-slate-200'}`}>
          <Activity size={isMobile ? 14 : 20} className={`text-blue-500 ${isStreaming ? 'animate-spin' : 'animate-pulse'}`} />
          <span className={`text-[10px] md:text-[14px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] ${theme === 'dark' ? 'text-blue-100' : 'text-slate-800'}`}>
            {isMobile ? 'MOBILE_OPTIMIZED' : 'STUDIO_MODE_ACTIVE'}
          </span>
        </div>
      </div>

      {!isMobile && (
        <div className={`absolute bottom-10 right-10 flex gap-12 p-10 rounded-[3rem] border backdrop-blur-3xl transition-all ${theme === 'dark' ? 'bg-black/90 border-white/5' : 'bg-white/90 border-slate-200'}`}>
          <div className="flex flex-col items-center">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Vertices</span>
            <span className={`text-xl font-mono font-black ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>{stats.vertexCount.toLocaleString()}</span>
          </div>
          <div className={`flex flex-col items-center border-l pl-12 ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Motion Profile</span>
            <span className={`text-xl font-mono font-black ${theme === 'dark' ? 'text-zinc-100' : 'text-slate-900'}`}>SLOW-FAST-SLOW</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModelViewer3D;
