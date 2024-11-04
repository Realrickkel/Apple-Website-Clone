import gsap from "gsap"

import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);

export const animateWithGsap = (target, animationProps, scrollProps) => {
    gsap.to(target, {
        ...animationProps,
        scrollTrigger: {
            trigger: target,
            //dit handelt de verschillende manieren hoe een blokje in beeld komt af, 1: First enter, 2: leave 3: enter back 4: leave back
            toggleActions: 'restart none none none',
            //startpositie van de animatie
            start: 'bottom 80%',
            ...scrollProps,
        }
    })
}

export const animateWithGsapTimeline = (timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps) => {
    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: 'power2.inOut'
    })

    timeline.to(
        firstTarget,
        {
            ...animationProps,
            ease: 'power2.inOut'
        },
        //symbolizes to insert animation at the start of the previous animation
        '<'
    )

    timeline.to(
        secondTarget,
        {
            ...animationProps,
            ease: 'power2.inOut'
        },
        //symbolizes to insert animation at the start of the previous animation
        '<'
    )
}