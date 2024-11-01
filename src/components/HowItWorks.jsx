import React, { useRef } from 'react'
import { chipImg, frameImg, frameVideo } from '../utils'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { ScrollTrigger } from "gsap/all";
import { animateWithGsap } from '../utils/animations';
gsap.registerPlugin(ScrollTrigger)

const HowItWorks = () => {
    const videoRef = useRef();
    useGSAP(() => {
        gsap.to('#hiwVideo', {
            scrollTrigger: {
                trigger: '#hiwVideo',
                //dit handelt de verschillende manieren hoe een blokje in beeld komt af, 1: First enter, 2: leave 3: enter back 4: leave back
                toggleActions: 'play pause resume reset',
                //startpositie van de animatie
                start: '-10% bottom',
            },
            onComplete: () => {
                videoRef.current.play();
            }
        })
        gsap.from('#chip', {
            scrollTrigger: {
                trigger: '#chip',
                start: '20% bottom'
            },
            opacity: 0,
            scale: 2,
            duration: 2,
            ease: 'power2.inOut', 
        })

        

    animateWithGsap('.g_fadeIn', {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power2.inOut'
    })
    },[])

//Heel simpel eigenlijk, we hebben een afbeelding van een telefoon die zetten we relative op de pagina, dmv de video dan absolute te maken plaatsen we die daar precies op.
  return (
    <section id='how-it-works' className="common-padding">
        <div className='screen-max-width'>
            <div id='chip' className='flex-center w-full my-20'>
                <img src={chipImg} alt='chip' width={180} height={180}/>
            </div>
            <div className='flex flex-col items-center'>
                <h2 className='hiw-title'>
                    A17 Pro chip.
                    <br/> A monster win for gaming.
                </h2>

                <p className='hiw-subtitle'>
                    It's here. The biggest redesign in the history of Apple GPUs.
                </p>
            </div>
            <div className='mt-10 md:mt-20 mb-14'>
                <div className='relative h-full flex-center'>
                    <div className='overflow-hidden'>
                        <img src={frameImg} alt='frame' className='bg-transparent relative z-10'/>
                    </div>
                    <div className='hiw-video'>
                        <video id='hiwVideo' className='pointer-events-none' playsInline preload='none' muted autoPlay ref={videoRef}>
                            <source src={frameVideo} type="video/mp4"/>
                        </video>
                    </div>
                </div>
                <p className='text-gray font-semibold text-center mt-3'>Honkai: Star Rail</p>
                    <h2 className='flex flex-col text-center font-bold md:text-7xl text-5xl mt-2'>
                        <span className='shadow-text'>Game</span>
                        with great precision.
                    </h2>
                </div>

                <div className='hiw-text-container'>
                            <div className='flex flex-1 justify-center flex-col'>
                                <p className='hiw-text g_fadeIn'> A17 Pro is an entirely new class of iPhone chip that delivers our {' '}
                                <span className='text-white'>
                                    best graphic performance by far
                                </span>,
                                </p>
                                <p className='hiw-text g_fadeIn'> Mobile{' '}
                                <span className='text-white'>
                                    games will look and feel so immersive
                                </span>,
                                    with incredibly detailed environments and characters.
                                </p>
                            </div>
                
                
                <div className='flex-1 flex justify-center flex-col g_fadeIn'>
                    <p className='hiw-text'>New</p>
                    <p className='hiw-bigtext'>Pro-class GPU</p>
                    <p className='hiw-text'>with 6 cores</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default HowItWorks