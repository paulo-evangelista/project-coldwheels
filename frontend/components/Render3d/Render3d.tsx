import { Suspense, useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Loader, useGLTF } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
    path: string;
    mouse: { x: number; y: number };
    sensitivity: number;
    scale: number;
}

const Model = ({ path, mouse, sensitivity, scale }: ModelProps) => {
    const { scene }: any = useGLTF(path);
    const modelRef = useRef<THREE.Object3D>(null);
    const { size, camera } = useThree();

    useEffect(() => {
        if (modelRef.current) {
            const initialX = 0; // Center of the screen in normalized device coordinates
            const initialY = 0; // Center of the screen in normalized device coordinates
            const vector = new THREE.Vector3(
                initialX * sensitivity,
                initialY * sensitivity,
                0.5
            ).unproject(camera as unknown as THREE.Camera);
            modelRef.current.lookAt(vector);
        }
    }, [camera, sensitivity]);

    useFrame(() => {
        if (modelRef.current) {
            // Convert mouse coordinates to normalized device coordinates and apply sensitivity
            const mouseX = (mouse.x / size.width) * 2 - 7.7;
            const mouseY = -(mouse.y / size.height) * 2 + 7.7;

            // Calculate the 3D position from the mouse coordinates with sensitivity
            const vector = new THREE.Vector3(
                mouseX * sensitivity,
                mouseY * sensitivity,
                0.5
            ).unproject(camera as unknown as THREE.Camera);

            // Set the model to look at the calculated position
            modelRef.current.lookAt(vector);
        }
    });

    return <primitive object={scene} scale={scale} ref={modelRef} />;
};

interface GLBViewerProps {
    glbPath: string;
    sensitivity: number;
    scale: number;
}

const GLBViewer = ({ glbPath, sensitivity, scale }: GLBViewerProps) => {
    const [mouse, setMouse] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (event: MouseEvent) => {
            setMouse({ x: event.clientX, y: event.clientY });
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    return (
        <>
            <Canvas
                style={{
                    height: "100%",
                    borderRadius: "15px",
                }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[0, 0, 5]} />
                <Suspense fallback={null}>
                    <Model
                        path={glbPath}
                        mouse={mouse}
                        sensitivity={sensitivity}
                        scale={scale}
                    />
                </Suspense>
                <OrbitControls />
            </Canvas>
            <Loader />
        </>
    );
};

export default GLBViewer;
