import React, {
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ChairModel = forwardRef((props, ref) => {
  const { scene } = useGLTF("/assets/chair.glb");
  const modelRef = useRef();

  // Clone scene so each instance is separate
  const clonedScene = scene.clone(true);

  // Apply color
  useEffect(() => {
    if (clonedScene) {
      clonedScene.traverse((child) => {
        if (child.isMesh) {
          child.material = new THREE.MeshStandardMaterial({
            color: props.color,
          });
        }
      });
    }
  }, [clonedScene, props.color]);

  // Adjust pivot (center and place on ground)
  useEffect(() => {
    if (!modelRef.current) return;

    const box = new THREE.Box3().setFromObject(modelRef.current);
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);

    modelRef.current.position.x -= center.x;
    modelRef.current.position.z -= center.z;
    modelRef.current.position.y -= box.min.y;
  }, []);

  // Apply scaling from props.size
  useEffect(() => {
    if (!modelRef.current || !props.size) return;

    const box = new THREE.Box3().setFromObject(modelRef.current);
    const currentSize = new THREE.Vector3();
    box.getSize(currentSize);

    const [targetX, targetY, targetZ] = props.size;

    const scaleX = targetX / currentSize.x;
    const scaleY = targetY / currentSize.y;
    const scaleZ = targetZ / currentSize.z;

    modelRef.current.scale.set(scaleX, scaleY, scaleZ);
    console.log(currentSize);
  }, [props.size]);

  // Expose getSize to parent
  useImperativeHandle(ref, () => ({
    getSize: () => {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);
      return [size.x, size.y, size.z];
    },
  }));

  return <primitive ref={modelRef} object={clonedScene} {...props} />;
});

export default ChairModel;
