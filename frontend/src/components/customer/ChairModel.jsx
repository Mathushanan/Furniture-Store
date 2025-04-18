import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const ChairModel = forwardRef((props, ref) => {
  const gltf = useGLTF("/assets/chair.glb"); // assuming public/assets
  const modelRef = useRef();

  useImperativeHandle(ref, () => ({
    getSize: () => {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const size = new THREE.Vector3();
      box.getSize(size);
      return [size.x, size.y, size.z];
    },
  }));

  return <primitive ref={modelRef} object={gltf.scene} {...props} />;
});

export default ChairModel;
