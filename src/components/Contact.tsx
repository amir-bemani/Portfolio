import { Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} scale={2.5}>
      <MeshDistortMaterial
        color="#915eff"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.5}
      />
    </Sphere>
  );
};

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop='demand'
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={null}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={1} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export const Contact = () => {
  return (
    <section id="contact" className="py-28 px-6 md:px-16 bg-primary relative z-10">
      <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='flex-[0.75] bg-black-100 p-8 rounded-3xl border border-white/5'
        >
          <p className="font-mono text-secondary text-[14px] tracking-widest uppercase mb-2">Get in touch</p>
          <h3 className="text-white font-black md:text-[80px] sm:text-[60px] xs:text-[50px] text-[40px] tracking-tightest leading-tight">Contact.</h3>

          <div className="mt-8 flex flex-wrap gap-6">
            <a href="mailto:amir@bemani.me" className="hover-target flex items-center gap-3 text-white/60 hover:text-[#915eff] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-tertiary flex justify-center items-center group-hover:scale-110 transition-transform">
                <FaEnvelope size={18} />
              </div>
              <span className="font-mono text-sm tracking-wider">amir@bemani.me</span>
            </a>
            <a href="tel:+4915755709315" className="hover-target flex items-center gap-3 text-white/60 hover:text-[#915eff] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-tertiary flex justify-center items-center group-hover:scale-110 transition-transform">
                <FaPhone size={18} />
              </div>
              <span className="font-mono text-sm tracking-wider">+49 157 5570 9315</span>
            </a>
            <a href="https://wa.me/4915755709315" target="_blank" rel="noreferrer" className="hover-target flex items-center gap-3 text-white/60 hover:text-[#915eff] transition-colors group">
              <div className="w-10 h-10 rounded-full bg-tertiary flex justify-center items-center group-hover:scale-110 transition-transform">
                <FaWhatsapp size={18} />
              </div>
              <span className="font-mono text-sm tracking-wider">WhatsApp</span>
            </a>
          </div>

          <div className='mt-12 flex flex-col gap-6'>
            <p className='text-white/70'>
              If you'd like to reach out, feel free to click one of the links above. The contact form has been removed to keep the page lightweight and fast.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]'
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </section>
  );
};
