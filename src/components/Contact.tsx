import { useRef, useState, Suspense, type ChangeEvent, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";
import { FaEnvelope, FaPhone, FaWhatsapp } from 'react-icons/fa';
import { MagneticButton } from "./MagneticButton";

const Earth = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  return (
    <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.5}>
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
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    // Simulation
    setTimeout(() => {
      setLoading(false);
      alert("Thank you. I will get back to you as soon as possible.");
      setForm({ name: "", email: "", message: "" });
    }, 2000);
  };

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

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className='mt-12 flex flex-col gap-8'
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Name</span>
              <input
                type='text'
                name='name'
                value={form.name}
                onChange={handleChange}
                placeholder="What's your good name?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                required
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your email</span>
              <input
                type='email'
                name='email'
                value={form.email}
                onChange={handleChange}
                placeholder="What's your web address?"
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                required
              />
            </label>
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Your Message</span>
              <textarea
                rows={7}
                name='message'
                value={form.message}
                onChange={handleChange}
                placeholder='What you want to say?'
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium'
                required
              />
            </label>

            <MagneticButton>
              <button
                type='submit'
                className='bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary hover-target'
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </MagneticButton>
          </form>
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
