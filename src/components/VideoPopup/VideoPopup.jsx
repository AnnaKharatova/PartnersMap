import './VideoPopup.css'
import React from 'react'
import { useState, useEffect } from 'react'

function VideoPopup({ setOpenVideo }) {

    const [showCloseButton, setShowCloseButton] = useState(false)
    const [vidoeWidth, setVidoeWidth] = useState();
    const [vidoeHeight, setVidoeHeight] = useState();


    const handleResize = () => {
        if (window.innerWidth > 960) {
            setVidoeWidth('830')
            setVidoeHeight('470')
        } else if (window.innerWidth > 760) {
            setVidoeWidth('660')
            setVidoeHeight('370')
        } else if (window.innerWidth > 480) {
            setVidoeWidth('400')
            setVidoeHeight('230')
         } else if (window.innerWidth > 370) {
            setVidoeWidth('350')
            setVidoeHeight('195')
        } else {
            setVidoeWidth('auto')
            setVidoeHeight('auto')
        }
    };
    window.addEventListener("resize", handleResize);

    useEffect(() => {
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [window.innerWidth]);

    setTimeout(() => {
        setShowCloseButton(true)
    }, 6000)

    return (
        <section className="video-popup">
            <div className="video-popup__content">
                {showCloseButton && <button className='video-popup__close' onClick={() => setOpenVideo(false)}></button>}
                <iframe src="https://vk.com/video_ext.php?oid=-213808955&id=456239020&hd=2&autoplay=1" width={vidoeWidth} height={vidoeHeight} allow="autoplay; encrypted-media; fullscreen; picture-in-picture; screen-wake-lock;" frameborder="0" allowfullscreen></iframe>
            </div>
        </section >
    )
}

export default VideoPopup