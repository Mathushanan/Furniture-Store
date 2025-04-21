import React, { useRef, useEffect, forwardRef } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ChairModel = forwardRef((props, ref) => {
  const { color, size = [1, 1, 1] } = props;
  const { scene } = useGLTF("/assets/chair.glb");
  const modelRef = useRef();

  // Clone scene so each instance is separate
  const clonedScene = scene.clone(true);

  // Apply color
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({ color });
        }
      });
    }
  }, [clonedScene, color]);

  useEffect(() => {
    if (!clonedScene) return;

    const box = new THREE.Box3().setFromObject(clonedScene);
    const originalSize = new THREE.Vector3();
    box.getSize(originalSize);

    const [targetX, targetY, targetZ] = size;

    const scaleX = targetX / originalSize.x;
    const scaleY = targetY / originalSize.y;
    const scaleZ = targetZ / originalSize.z;

    clonedScene.scale.set(scaleX, scaleY, scaleZ);

    console.log("Original size:", originalSize);
    console.log("Target size:", size);
    console.log("Applied scale:", clonedScene.scale);
  }, [clonedScene, size]);

  return <primitive ref={modelRef} object={clonedScene} {...props} />;
});

export default ChairModel;
