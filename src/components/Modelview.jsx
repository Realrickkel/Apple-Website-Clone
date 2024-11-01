import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"

import * as THREE from 'three';
import Lights from './Lights';
import IPhone from './IPhone';
import { Suspense } from "react";
import Loader from "./Loader";


// importereren alle properties uit Model.jsx hier
const Modelview = ({index, groupRef, gsapType, controlRef, setRotationState, size, item}) => {
  return (
    <View
    index={index}
    id={gsapType}
    //'bij right- is misschien niet goed, ff checken waarom we hier index === 2 checken, uitgezocht, als de index 2 is(large view) verplaatst deze 100% om in de view te komen
    className={`w-full h-full absolute ${index === 2 ? 'right-[-100vw]' : ''} `}
    >
      {/*Sources of light*/}
      {/*Ambient Light*/}
      <ambientLight intensity={0.3}/>
      {/*De camera staat dus 4(Z-index) van het midden af, 0,0,0 is de position van de iPhone die we in group benoemen hieronder*/}
      <PerspectiveCamera makeDefault position={[0,0,4]} />

      <Lights />

      {/*De control properties voor het besturen van je 3d-model*/}
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom= {false}
        enablePan= {false}
        rotateSpeed= {0.4}
        target={new THREE.Vector3(0,0,0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />

      {/*de positie van het 3d model bepalen we op 0,0,0*/}
      <group ref={groupRef} name={`${index === 1} ? 'small' : 'large'`} position={[0,0,0]}>
        {/*Suspense heeft de nare bijwerking dat wanneer hij voor het eerst de ingeladen inhoudt laat zien de site lagged en dit ineens in beeld springt. Laat loading zien wanneer het 3d model nog niet is ingeladen, scale hier is, als index 1 is dan 15,15,15 en anders 17,17,17(nep doen alsof hij groter is)*/}
        <Suspense fallback={<Loader/>}>
            <IPhone 
            scale= {index === 1 ? [15,15,15] : [17,17,17]}
            item = {item}
            size = {size}
            />
        </Suspense>
      </group>

    </View>
  )
}

export default Modelview