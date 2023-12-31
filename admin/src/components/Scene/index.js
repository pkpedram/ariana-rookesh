import { Canvas } from '@react-three/fiber'
import React, { Suspense, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import {CameraControls, useGLTF} from '@react-three/drei'


const Scene = ({
  obj
}) => {
  
const sceneRef = useRef()

  useEffect(() => {
    sceneRef.current.addEventListener('loadstart', () => {
      console.log('ad')
    })
  }, [sceneRef])
  
  return (
    <Suspense fallback={<></>}>
    <div className='w-full h-full bg-dark-tint rounded-lg' ref={sceneRef}>
        <Canvas shadows camera={{ position: [-6, 3, -10], fov: 10,}} >
          <ambientLight intensity={1} />
          <spotLight castShadow={true} position={[6,3,-10]} lookAt={ [0,0.5,0]} intensity={1} />
          <CameraControls  maxZoom={2} /> 
        <SceneObj object={obj} />

        </Canvas>
    </div>
    </Suspense>
  )
}

const SceneObj = ({object}) => {
  const obj = useGLTF(object)

  useEffect(() => {
      if(obj){
        obj.scene.position.set(0,-.65,0)
        obj.scene.castShadow = true
        obj.scene.receiveShadow = true
        obj.scene.children.map(item => {item.castShadow = true; item.receiveShadow = true})
      }
  }, [obj])
return <primitive object={obj.scene} />

}

const mapStateToProps = state => ({

})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Scene)