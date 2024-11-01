import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import Modelview from "./Modelview"
import { useEffect, useRef, useState } from "react"
import { yellowImg}  from "../utils"

//three.js voor 3d models
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { models, sizes } from "../constants"
import { animateWithGsapTimeline } from "../utils/animations"
//scrolltrigger plugin
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

const Model = () => {

    //size is om te kijken welke we op het moment bekijken, 6.1 of 6.7 inch
    const [size, setSize] = useState('small');
    //standaard model details, die passen we aan aan de hand van user input
    const [model, setModel] = useState({
        title: 'iPhone 15 Pro in Natural Titanium',
        // kleuren van de verschillende meshes in het eerste 3d model
        color: ['#8F8a81', '#FFE7B9', '#6F6C64'],
        //texture die we gebruiken
        img: yellowImg,
    })

    // Camera control voor de modelview moet nog gebouwd worden
    const cameraControlSmall = useRef();
    const cameraControlLarge = useRef();

    // Constant om de properties van het model bij te houden wanneer het animeert
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    //rotation value van elk model
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    //timeline animatie
    const tl = gsap.timeline();

    useEffect(() => {
        // als het model large is willen we naar small animeren en andersom vandaar dat we bij large small gebruiken en andersom
        if (size === 'large'){
            animateWithGsapTimeline(tl, small, smallRotation, '#view1','#view2', {
                transform: 'translateX(-100vw)',
                duration: 2
            })
        } 
        
        if (size === 'small'){
            animateWithGsapTimeline(tl, large, largeRotation, '#view2','#view1', {
                transform: 'translateX(0)',
                duration: 2
            })
        }
            
    },[size])

useGSAP(() => {
    gsap.to('#heading',{
        opacity: 1,
        y: 0,

        scrollTrigger: {
        trigger: '#heading',
        start: 'top 100%',
        },
    })
},[])

  return (
    <section id='model' className='common-padding'>
        <div className='screen-max-width'>
            <h1 id='heading' className='section-heading'>
                Take a closer look.
            </h1>


            <div className="flex flex-col items-center mt-5">
                <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                    <Modelview
                    index={1}
                    groupRef={small}
                    gsapType="view1"
                    controlRef={cameraControlSmall}
                    setRotationState={setSmallRotation}
                    item={model}
                    size={size}
                    />
                    <Modelview
                    index={2}
                    groupRef={large}
                    gsapType="view2"
                    controlRef={cameraControlLarge}
                    setRotationState={setLargeRotation}
                    item={model}
                    size={size}
                    />
                    {/*Het Canvas is waar het 3d-model wordt geplaatst, met view.port wordt het dan gerenderd*/}
                    {/* eventSource={document.getElementById('root')} is useful om te kunnen interacten met het model waarmee je werkt */}
                    
                    <Canvas
                    className="w-full h-full"
                    style={{
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        overflow: 'hidden',
                    }}
                    eventSource={document.getElementById('root')}
                    >
                        <View.Port/>
                    </Canvas>
                </div>
                {/* hier gebeurt alles eigenlijk, hieronder is het bovenste deel is het uitlezen van de array models uit constants index. Die maakt een nieuwe array met de map functie, en daardoor weten we dat er 4 models in model zijn en deze krijgen allemaal een bolletje in de navigatie op de website met hun eigen kleur, setModel wordt ook meteen aangeroepen en de waardes van deze objecten worden naar modelview gestuurd waar deze ook weer gebruikt worden*/}
                {/* button werkt door te kijken naar de constant size(small of large) en of die overeen komt met de value(uit constants(small of large)). Wanneer die overheen komt wordt die wit en de ander transparant en de tekst zwart en de ander wit. Als je op een van de twee labels klikt gaat de functie setSize lopen en die kijkt welke value(small of large) het label had en zo wordt setSize aangepast naar small of large en veranderd gelijk alle css mee*/}
                <div className="mx-auto, w-full">
                    <p className="text-sm font-light text-center mb-5">{model.title}</p>
                    <div className="flex-center">
                        <ul className="color-container">
                            {models.map((item,i) => (
                                <li key={i} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{backgroundColor: item.color[0]}} onClick ={() => setModel(item)}/>
                            ))}
                        </ul>

                        <button className="size-btn-container">
                            {sizes.map(({ label, value }) => (
                                <span key={label} className="size-btn"
                                style={{backgroundColor: size === value ? "white" : "transparent", color: size === value ? 'black' : 'white'}} onClick={() => setSize(value)}>
                                {label}
                            </span>
                            ))}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Model