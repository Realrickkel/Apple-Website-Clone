import { useEffect, useRef, useState } from 'react'
import { hightlightsSlides } from '../constants'
import { pauseImg, playImg, replayImg } from '../utils';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

const VideoCarousel = () => {
    // we declareren de anims hier omdat we de animatie willen resetten nadat een useState variabele veranderd. Als je dat niet zo globaal doet is het nogal buggy
    const anim = useRef(gsap.timeline());
    const anim2 = useRef(gsap.timeline());
    //const progress = useRef();
    // De array waar de elementen uit highlightSlides worden opgeslagen om ze te displayen en mappen
    const videoRef = useRef([]);
    // De witte lijn die de progress laat zien
    const videoSpanRef = useRef([]);
    // De grijze bolletjes voor het navigeren(hier ligt de videoSpanRef in als die specifieke video afspeelt)
    const videoDivRef = useRef([]);

    const [video, setVideo] = useState({
        isEnd: false,
        startPlay: false,
        oldVideoId: 1,
        videoId: 0,
        isLastVideo: false,
        isPlaying: false,
    })

    const [loadedData, setLoadedData] = useState([]);

    //destruct the above values, we hoeven dan niet de hele tijd video.??? video.??? te zetten
    const {isEnd, isLastVideo, startPlay, videoId, isPlaying, oldVideoId,} = video;

    useGSAP(() => {
        //We animeren de positie van de slider aan de hand van welke video afspeelt
        gsap.to('#slider', {
            transform: `translateX(${-100 * videoId}%)`,
            //Deze duration iets sneller laten lopen want nu mis je de 3e video volledig
            duration: 2,
            ease: 'power2.inOut' 
        })


        gsap.to('#video',{
            scrollTrigger: {
                //wanneer #video in beeld komt restart de video, verder gebeurt er niks
                trigger: '#video',
                toggleActions: 'restart none none none'
            },
            onComplete: () => {
                setVideo((pre) => ({
                    //...pre spreads the previous state, dus alle checks(isEnd, isLastVideo, startPlay, videoId, isPlaying) in het object video en geeft deze aan de nieuwe video. Verder zetten we startPlay en isPlaying aan
                    ...pre,
                    startPlay: true,
                    isPlaying: true,
                }))
            }
        })
    },[isEnd, videoId])

    // Eerst checken we of alle video's zijn geladen dus als het er 4 zijn is het goed, daarna wordt deze functie gebruikt voor pauze en weer afspelen, als de video is gepauzeerd begint hij te spelen en als deze niet is gepauzeerd, dan pauzeert hij
    useEffect(() => {
        if(loadedData.length > 3){
            if(!isPlaying) {
                videoRef.current[videoId].pause();
            }
            else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    },[startPlay, videoId, isPlaying, loadedData])

    //Deze functie gebruiken we om te checken of alle video's zijn ingeladen
    const handleLoadedMetadata = (i, e) => setLoadedData((pre) => [...pre, e])


        //hier ergens moet de oude video gepauzeerd worden
        useEffect(() => {
            // video begint altijd bij 0 als je van video verandert
            videoRef.current[videoId].currentTime = 0
            //videoRef.current[oldVideoId].currentTime = 0
            let span = videoSpanRef.current;
    
            //We checken hier eerst of alle video's er zijn, als die nog niet zijn ingeladen doet deze functie niks, je krijgt anders waarschuwingen van gsap
            if(span[videoId]){
                //We starten met alle vooropgeslagen info weg te gooiien, het issue is anders dat als je bijvoorbeeld naar een andere video klikt de oude timeline animatie eerst nog wordt afgemaakt, dat willen we niet, we willen direct een nieuwe animatie starten voor de nieuwe tijdlijn en de oude tijdlijn weer naar een bolletje veranderen.
                anim.current.clear();
                anim.current.restart();
                anim2.current.clear();
                anim2.current.restart();
                //bepaald de breedte van het bolletje als er iets afspeelt. op mobile en tablets is dit groter dan op desktops
                gsap.to(videoDivRef.current[videoId],{
                    width: window.innerWidth < 760
                    ? '10vw'
                    : window.innerWidth < 1200
                        ? '10vw'
                        : '4vw' 
                })
                //de oude timelijn onderlayer wordt weer een bolletje gemaakt
                gsap.to(videoDivRef.current[oldVideoId], {
                    width: '12px',
                })
                //dit is de code van de nieuwe tijdlijn, hij start op 0 en verandert naar wit en daarna vult het balkje tot 100% voor de lengte van de video
                anim.current.to(span[videoId], {
                    width: 0,
                    backgroundColor: '#afafaf',
                    duration: 0,
                })
                anim.current.to(span[videoId], {
                    backgroundColor: 'white',
                    duration: 0,
                })
                anim.current.to(span[videoId],{
                    width: '100%',
                    backgroundColor: 'white',
                    duration: hightlightsSlides[videoId].videoDuration
                })

                //de witte tijdlijn wordt hier weer teruggezet naar zijn startpositie wanneer je naar een andere video gaat
                anim2.current.to(span[oldVideoId], {
                    width: 0,
                    duration: 0,
                })

                anim2.current.to(span[oldVideoId], {
                    backgroundColor: '#afafaf',
                })

            }
        },[videoId, startPlay])

        // animatie pauzeert en start wanneer je op start en stop klikt
        useEffect(() => {
            if(isPlaying && startPlay == true){
                anim.current.play();
            } else if (!isPlaying && startPlay == true) {
                anim.current.pause();
            }
        }, [isPlaying])

        //oude video wordt gepauzeerd wanneer je wegklikt.
        useEffect(() => {
            videoRef.current[oldVideoId].pause();
            //de nieuwe video begint altijd bij 0
        }, [oldVideoId])
        
        

    // handles het play en pause geval, als de video afloopt wordt isEnd op true gezet, en als de laatste video is gespeeld wordt de functie veranderd in video-reset, wanneer de video wordt gereset worden ook de waarden gereset, en natuurlijk pause/play
    const handleProcess = (type,i) => {
        switch (type) {
            case 'video-end':
                setVideo((pre) => ({...pre, isEnd: true, videoId: i+1, oldVideoId: i}))
                break;
            case 'video-last':
                setVideo((pre) => ({...pre, isLastVideo: true, oldVideoId: 3}))
                break;
            case 'video-reset':
                setVideo((pre) => ({...pre, isLastVideo: false, videoId: 0}))
                break;
            case 'playswitch':
                setVideo((pre) => ({...pre, oldVideoId: videoId}))
                setVideo((pre) => ({...pre, videoId: i, isLastVideo: false}))
                break;
            case 'play':
                setVideo((pre) => ({...pre, isPlaying: !pre.isPlaying}))
                break;
            case 'pause':
                setVideo((pre) => ({...pre, isPlaying: !pre.isPlaying}))
                break;
            default:
                return video;
        }
    }

  return (
    <>
    <div className='flex items-center w-full m-auto video-carousel-div'>
        {/* we hebben hier geen {} na de => maar () omdat we automatisch iets returnen*/}
        {/*pr zodat in de carousel de volgende video nog niet te zien is*/}
        {/*In essentie kijken we hier naar de array highlightSlides uit constants, aan de hand daarvan creeëren we een list, en voor elk item in die list renderen we dan een zwart blokje uit waarin de video te zien is*/}
        {/*preload auto = dat de video laadt wanneer de pagina laadt*/}
        {hightlightsSlides.map((list,i) => (
            <div key={list.id} id="slider" className='sm:pr-20 pr-10'>
                <div className='video-carousel_container overflow-hidden'>
                    <div className='w-full h-full flex-center rounded-3xl overflow-hidden bg-black'>
                        <video
                        id="video"
                        playsInline={true}
                        preload='auto'
                        muted
                        //ik weet niet wat dit nu precies doet lol
                        className={`${
                            list.id === 2 && 'translate-x-44'}
                            pointer-events-none
                            `}
                        //we vinden een index in de videoRef array en zetten die op het video element
                        ref={(el) => (videoRef.current[i] = el)}
                        onEnded={() => (
                            //ik weet niet waar de i !== 3 vandaan komt 1:53 ongeveer in de video, ik snap hem er zijn 4 video's met id 0, 1, 2, 3 dus als de index 3 is is dat de laatste video in de rij en moet niet video-end maar video-last in handleProcess worden aangehaald.
                            i !== 3
                            ? handleProcess('video-end', i)
                            : handleProcess('video-last')
                        )}
                        onPlay={() => {
                            //we krijgen de spread van de previous video en we zetten isPlaying naar true
                            setVideo((prevVideo) => ({
                                ...prevVideo, isPlaying: true
                            }))
                        }}
                        //deze is in combinatie met boven handleLoadedMetadata, voor zover ik het begrijp krijg je hier alle data van de video die je boven in handleLoadedMetadata naar loadedData doorsluist. Als loadedData daarna veranderd gaat de useEffect in werking en begint de video te spelen
                        onLoadedMetadata={(e) => handleLoadedMetadata(i, e)}
                        >
                            <source src={list.video} type="video/mp4" />
                        </video>
                    </div>
                    {/*deze div met tekst willen we absolute plaatsen boven op onze video*/}
                    <div className='absolute top-12 left-[5%] z-10'>
                        {list.textLists.map((text) => (
                           <p key={text} className='md:text-2xl text-xl font-medium'>
                            {text}
                           </p> 
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>
    {/* dit is de navigatie van de videocarousel, dit zijn de bolletjes je kijkt hier eigenlijk naar hoeveel filmpjes er in de videoRef array zitten en dat map je naar de bolletjes(videoDivRef) en de progressbar(videoSpanRef)*/}
    <div className='relative flex-center mt-10'>
        <div className='flex-center py-5 px-7 bg-gray-300 backdrop-blur rounded-full' >
            {/*we zetten een _ omdat we verder niks met de video's doen buiten ze uitlezen dan zet je altijd een _ neer*/}
            {videoRef.current.map((_,i) => (
                <span
                id='bol'
                key={i}
                ref={(el) => (videoDivRef.current[i] = el)}
                className='mx-2 w-3 h-3 bg-gray-200 rounded-full relative cursor-pointer'
                onClick={() => {
                    handleProcess('playswitch', i)
                }}>
                    <span className='absolute h-full w-full rounded-full' 
                    ref={(el) => (videoSpanRef.current[i] = el)}/>
                </span>
            ))}
        </div>
        
        {/* dit is de pause en play button, als het de laatste video is die is afgelopen dan wordt de video gereset dmv de handleProcess functie */}
        <button className='control-btn'>
            <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? 'replay' : !isPlaying ? 'play' : 'pause'}
            onClick={isLastVideo
                ? () => handleProcess('video-reset') 
                : !isPlaying
                    ? () => handleProcess('play')
                    : () => handleProcess('pause')
            }
            />
        </button>
    </div>
    </>
  )
}

export default VideoCarousel