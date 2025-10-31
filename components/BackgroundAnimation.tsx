
import React, { useEffect, useRef } from 'react';

// Declare THREE to satisfy TypeScript since it's loaded from a CDN script tag
declare const THREE: any;

export const BackgroundAnimation: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current || typeof THREE === 'undefined') return;

        const currentMount = mountRef.current;
        
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 50;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        currentMount.appendChild(renderer.domElement);
        
        // --- Particle Creation ---
        const particleCount = 2000;
        const positions = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount * 3; i++) {
            positions[i] = (Math.random() - 0.5) * 100;
        }

        const particlesGeometry = new THREE.BufferGeometry();
        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        
        const particlesMaterial = new THREE.PointsMaterial({
            color: 0x00aaff,
            size: 0.05,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
        });
        
        const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particleSystem);
        
        // --- Faint connecting lines ---
        const linesGeometry = new THREE.BufferGeometry();
        const linePositions = [];
        const connections = 150;
        for (let i = 0; i < connections; i++) {
            const startIndex = Math.floor(Math.random() * particleCount) * 3;
            const endIndex = Math.floor(Math.random() * particleCount) * 3;
            linePositions.push(positions[startIndex], positions[startIndex + 1], positions[startIndex + 2]);
            linePositions.push(positions[endIndex], positions[endIndex + 1], positions[endIndex + 2]);
        }
        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.05
        });
        const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
        scene.add(lines);

        let mouseX = 0;
        let mouseY = 0;
        const onMouseMove = (event: MouseEvent) => {
            mouseX = (event.clientX - window.innerWidth / 2) / 100;
            mouseY = (event.clientY - window.innerHeight / 2) / 100;
        };
        document.addEventListener('mousemove', onMouseMove);

        const animate = () => {
            requestAnimationFrame(animate);

            particleSystem.rotation.y += 0.0003;
            lines.rotation.y += 0.0002;
            
            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);
        };
        animate();

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize);

        return () => {
            window.removeEventListener('resize', onWindowResize);
            document.removeEventListener('mousemove', onMouseMove);
            if (currentMount) {
                currentMount.removeChild(renderer.domElement);
            }
        };
    }, []);

    return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }} />;
};
