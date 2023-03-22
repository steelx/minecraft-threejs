import { useSphere } from "@react-three/cannon";
import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three/src/math/Vector3";

export default function Player() {
	/// useThree allows us to access state model
	/**
     * const {
        gl, // WebGL renderer
        scene, // Default scene
        camera, // Default camera
        raycaster, // Default raycaster
        size, // Bounds of the view (which stretches 100% and auto-adjusts)
        viewport, // Bounds of the viewport in 3d units + factor (size/viewport)
        aspect, // Aspect ratio (size.width / size.height)
        mouse, // Current, centered, normalized 2D mouse coordinates
        raycaster, // Intternal raycaster instance
        clock, // THREE.Clock (useful for useFrame deltas)
        invalidate, // Invalidates a single frame (for <Canvas invalidateFrameloop />)
        intersect, // Calls onMouseMove handlers for objects underneath the cursor
        setDefaultCamera, // Sets the default camera
        }
    */
	const { camera } = useThree();
	const [ref, api] = useSphere(() => {
		return {
			mass: 1,
			type: "Dynamic",
			position: [0, 0, 0],
		};
	});
	const velo = useRef([0, 0, 0]);
	const pos = useRef([0, 0, 0]);

	api.position.subscribe((p) => {
		pos.current = p;
	});
	api.velocity.subscribe((v) => {
		velo.current = v;
	});

	useFrame(() => {
		camera.position.copy(new Vector3(...pos.current));
		api.velocity.set(0, 1, 0);
	});

	return <mesh ref={ref} />;
}
