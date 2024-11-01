import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { rightImg, watchImg } from "../utils"
import VideoCarousel from "./VideoCarousel"
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

const Highlights = () => {
  // deze animatie onscroll laten starten, plugin installeren
  useGSAP(() => {
    gsap.to("#title",{
      opacity: 1,
      y: 0,

      scrollTrigger: {
        trigger: '#title',
        start: 'bottom bottom',
      },

    })
    gsap.to(".link",{
      opacity: 1,
      y:0,
      duration: 1,
      stagger: 0.25,

      scrollTrigger: {
        trigger: '.link',
        start: 'bottom bottom',
      },
    })
    gsap.fromTo("#highlights-glow",{
      opacity: 0,
    },
    {
      opacity: 1,
      color:"white",
      duration: 1,
      scrollTrigger: {
        trigger: '#highlights-glow',
        start: 'bottom bottom',
        end: 'top 50%',
        scrub: true,
      },
    })

    gsap.fromTo("#glow-layer",{
      opacity: 0,
      textShadow: "0 0 10px #fff",
    },
    {
    opacity: 0.7,
    textShadow: "0 0px 10px #fff, 0 -10px 20px #E66D32, 0 0px 20px #E66D32, 0 10px 40px #E66D32, 0 30px 50px #E66D32",

    scrollTrigger: {
      trigger: '#glow-layer',
      start: 'bottom bottom',
      end: 'top 50%',
      scrub: true,
    },

    })
    
  },[])
  
  
  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        {/* mb=margin-bottom */}
        <div className="mb-16 w-full md:flex items-end justify-between">
          <h1 id="title" className="section-heading">
          
          <div id="base-text">
              Get the&nbsp;highlights.
            </div>
            <div id="glow-mid" className="absolute top-0 left-0">
              Get the&nbsp;  
              <span id="glow-layer">
                highlights.
              </span>
            </div>
            <div id="glow-text" className="absolute top-0 left-0">
              Get the&nbsp;  
              <span id="highlights-glow">
                highlights.
              </span>
            </div>
          
          </h1>

          <div className="flex flex-wrap items-end gap-5">
            <p className="link">
              Watch the film
              <img src={watchImg} alt="watch" className="ml-2"/>
            </p>
            <p className="link">
              Watch the event
              <img src={rightImg} alt="right" className="ml-2"/>
            </p>
          </div>
        </div>
      </div>
      <div className="md:w-3/4 w-full justify-center m-auto items-center video-carousel-div">
        <VideoCarousel/>
      </div>
    </section>
  )
}

export default Highlights