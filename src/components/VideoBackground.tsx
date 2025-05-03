'use client';

import { useRef, useEffect, useState } from 'react';

export default function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Detecta dispositivo móvel
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Observer para carregar o vídeo apenas quando visível
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                } else {
                    // Pausa o vídeo quando não estiver visível
                    if (videoRef.current) {
                        videoRef.current.pause();
                    }
                    setIsVisible(false);
                }
            });
        }, options);

        const videoElement = videoRef.current;

        if (videoElement) {
            observer.observe(videoElement);
        }

        return () => {
            if (videoElement) {
                observer.unobserve(videoElement);
            }
        };
    }, []);

    // Reproduz o vídeo quando estiver visível
    useEffect(() => {
        if (videoRef.current && isVisible) {
            videoRef.current.play().catch(error => {
                console.error("Video playback failed:", error);
            });
        }
    }, [isVisible]);

    // Escolhe a versão do vídeo com base no dispositivo
    const videoSrc = isMobile
        ? "/videos/bg-hero-video-mobile.mp4"
        : "/videos/bg-hero-video-optimized.mp4";

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="metadata"
                disablePictureInPicture
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    opacity: 0.4,
                    filter: "saturate(0.6) contrast(1.1)",
                    objectFit: "cover",
                    width: "100%"
                }}
                aria-hidden="true"
            >
                <source src={videoSrc} type="video/mp4" />
            </video>
        </div>
    );
} 