import gsap from "gsap";
import { useGSAP } from "@gsap/react";
//video wordt uit utils gehaald
import { heroVideo, smallHeroVideo } from "../utils";
import { useState } from "react";
import { useEffect } from "react";

const Hero = () => {
  //als de breedte van het scherm kleiner is dan 760 pixels(ongeveer gelijk aan md) dan is videoSrc = smallHeroVideo else heroVideo
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

  //dynamically modify video based on width of screen
  const handleVideoSrcSet = () => {
    if(window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo)
    }else{
      setVideoSrc(heroVideo)
    }
  }

  //kijkt of de window wordt geresized
  useEffect(() => {
    window.addEventListener('resize', handleVideoSrcSet);

  //cleanup
    return () => {
      window.removeEventListener('resize', handleVideoSrcSet);
    }
  },[])

  //gsap handelt alle animatie af, hier zie je to dus to een new state
  useGSAP(() =>{
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
    })
    gsap.to(".stagger-box",{
      opacity: 1,
      y: -50,
      delay: 2,
      stagger: {
        amount: 0.1,
      }
    })
  },[])


  return (
    //nav-height= placing below the nav bar h-5/6 gives it full height of the page, flex-center = ???, flex-col = flex column dus alles staat onder elkaar, md= medium devices
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-center flex-col">
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
        {/* Video speelt automatisch muted af, playsInline = speelt de video af waar hij is inplaats van de default een fullscreen video, key = altijd uniek bij React, pointer-events-none betekent dat je er niet op kan klikken of slepen of iets dergelijks */}
          <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
            <source src={videoSrc} type="video/mp4"/>
          </video>
        </div>
      </div>
      <div
      id="cta"
      className="flex flex-col items-center"
      >
        <a href="#highlights" className="btn opacity-0 translate-y-20 stagger-box">Buy</a>
        <p className="font-normal text-xl opacity-0 translate-y-20 stagger-box">From $199/month or $999</p>
      </div>
    </section>
  )
}

export default Hero