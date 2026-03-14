import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Wave() {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `
          uniform float uTime;
          varying float vElevation;
          void main() {
            vec3 pos = position;
            float wave = sin(pos.x * 1.5 + uTime * 0.6) * 0.06
                       + sin(pos.y * 2.0 + uTime * 0.4) * 0.04;
            pos.z += wave;
            vElevation = wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying float vElevation;
          void main() {
            vec3 teal = vec3(0.122, 0.420, 0.408);
            vec3 cream = vec3(0.914, 0.871, 0.835);
            float t = smoothstep(-0.08, 0.08, vElevation);
            vec3 color = mix(teal, cream, t);
            gl_FragColor = vec4(color, 0.12);
          }
        `,
        transparent: true,
        wireframe: true,
        side: THREE.DoubleSide,
      }),
    []
  );

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(8, 6, 48, 48);
    geo.rotateX(-Math.PI / 2.5);
    return geo;
  }, []);

  useFrame(({ clock }) => {
    material.uniforms.uTime.value = clock.getElapsedTime();
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
}

export default function WavePlane() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 3, 4], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Wave />
      </Canvas>
    </div>
  );
}
