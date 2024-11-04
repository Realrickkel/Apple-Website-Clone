import { useGSAP } from '@gsap/react'
import React, { useRef } from 'react'
import { animateWithGsap } from '../utils/animations'
import { explore1Img, explore2Img, exploreVideo } from '../utils'
import gsap from 'gsap'

import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger)

const Features = () => {
    const videoRef = useRef();

    useGSAP(() => {
        gsap.to('#exploreVideo', {
            scrollTrigger: {
                trigger: '#exploreVideo',
                //dit handelt de verschillende manieren hoe een blokje in beeld komt af, 1: First enter, 2: leave 3: enter back 4: leave back
                toggleActions: 'play none none none',
                //startpositie van de animatie
                start: '-10% bottom',
            },
            onComplete: () => {
                videoRef.current.play();
            }
        })
        //we roepen ons al gedefinieerde animatie in animation.js aan, dan hoeven we niet telkens alles uit te typen. We hoeven nu alleen een target aan te wijzen, in dit geval features_title en daarna in de properties? geven we aan wat we willen animeren
        animateWithGsap('#features_title', {
            y: 0,
            opacity: 1,
        })
        animateWithGsap('.g_grow', {
            scale: 1,
            opacity: 1,
            ease: 'power1',
        },{ 
            scrub: 5.5 
        });
        animateWithGsap('.g_text', {
            y: 0,
            opacity: 1,
            ease: 'power2.inOut',
            duration: 1,
        })

        gsap.fromTo("#highlights-glow-feat",{
            opacity: 0,
          },
          {
            opacity: 1,
            color:"white",
            duration: 1,
            scrollTrigger: {
              trigger: '#highlights-glow-feat',
              start: 'bottom bottom',
              end: 'top 50%',
              scrub: true,
            },
          })
      
          gsap.fromTo("#glow-layer-feat",{
            opacity: 0,
            textShadow: "0 0 10px #fff",
          },
          {
          opacity: 0.7,
          textShadow: "0 0px 10px #fff, 0 -10px 20px #E66D32, 0 0px 20px #E66D32, 0 10px 40px #E66D32, 0 30px 50px #E66D32",
      
          scrollTrigger: {
            trigger: '#glow-layer-feat',
            start: 'bottom 80%',
            end: 'bottom 30%',
            scrub: true,
          },
      
          })

    },[])

//De video wil ik reversen wanneer deze klaar is met afspelen
  return (
    <section id='features' className='h-full common-padding bg-zinc relative overflow-hidden'>
        <div className='screen-max-width'>
            <div className='mb-12 w-full'>
                <h1 id="features_title" className='section-heading'>Explore the full story.</h1>
            </div>

            <div className='flex flex-col justify-center items-center overflow-hidden'>
                <div className='text-center mt-32 mb-24 relative'>
                    <div id="base-text-feat" className="">
                        <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone.</h2>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>Forged in titanium.</h2>
                    </div>
                    <div id="glow-mid-feat" className="absolute top-0">
                        <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone.</h2>
                        <h2 className='text-5xl lg:text-7xl font-semibold'>Forged in <span id='glow-layer-feat'>titanium.</span></h2>
                    </div>
                    <div id="glow-text-feat" className="absolute top-0">
                        <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone.</h2>    
                        <h2 className='text-5xl lg:text-7xl font-semibold'>Forged in <span id='highlights-glow-feat'>titanium.</span></h2>
                    </div>
                </div>

                <div className='flex-center flex-col sm:px-10'>
                    <div className='relative h-[50vh] w-full flex items-center overflow-hidden'>
                        <video playsInline id='exploreVideo' className='w-full h-full object-cover object-center g_grow scale-125' preload='none' muted autoPlay ref={videoRef}>
                            <source src={exploreVideo} type='video/mp4'/>
                        </video>
                    </div>

                    <div className='flex flex-col w-full relative mt-5'>
                        <div className='feature-video-container'>
                            <div className='overflow-hidden flex-1 h-[50vh]'>
                                <img src={explore1Img} alt="titanium" className='feature-video g_grow'/>
                            </div>
                            <div className='overflow-hidden flex-1 h-[50vh]'>
                                <img src={explore2Img} alt="titanium 2" className='feature-video g_grow'/>
                            </div>
                        </div>
                        <div className='feature-text-container g_text'>
                            <div className='flex-1 flex-center'>
                                <p className='feature-text'> iPhone 15 Pro is {' '}
                                <span className='text-white'>
                                    the first iPhone to feature an aerospace-grade titanium design
                                </span>,
                                using the same alloy that spacecrafts use for missions to Mars.
                                </p>
                            </div>
                            <div className='flex-1 flex-center'>
                                <p className='feature-text'> Titanium has one of the best strength-to-weight ratios of any metal, making these our{' '}
                                <span className='text-white'>
                                    lightest Pro models ever.
                                </span>,
                                    You'll notice the difference the moment you pick one up.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}

export default Features