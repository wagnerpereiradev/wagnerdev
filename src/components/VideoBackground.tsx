'use client';

import { useRef, useEffect, useState, memo } from 'react';

// Utilizando memo para evitar re-renderizações desnecessárias
const VideoBackground = memo(function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [supportsWebm, setSupportsWebm] = useState(false);

    // Detecta dispositivo móvel e suporte a WebM
    useEffect(() => {
        // Verifica suporte a WebM (mais eficiente que MP4)
        const checkWebMSupport = () => {
            const video = document.createElement('video');
            return video.canPlayType('video/webm; codecs="vp9"').replace(/no/, '');
        };

        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        setSupportsWebm(!!checkWebMSupport());
        checkMobile();

        const handleResize = () => checkMobile();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Observer para carregar o vídeo apenas quando visível
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') {
            // Fallback para navegadores que não suportam IntersectionObserver
            setIsVisible(true);
            return;
        }

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
            // Utilizando setTimeout para garantir que o play seja chamado após a renderização completa
            const timer = setTimeout(() => {
                const playPromise = videoRef.current?.play();

                // Tratando erro silenciosamente para evitar console errors
                if (playPromise !== undefined) {
                    playPromise.catch(() => { });
                }
            }, 100);

            return () => clearTimeout(timer);
        }
    }, [isVisible]);

    // Escolhe o formato de vídeo mais apropriado
    const videoSources = () => {
        if (isMobile) {
            return supportsWebm
                ? [{ src: "/videos/bg-hero-video-mobile.webm", type: "video/webm" },
                { src: "/videos/bg-hero-video-mobile.mp4", type: "video/mp4" }]
                : [{ src: "/videos/bg-hero-video-mobile.mp4", type: "video/mp4" }];
        } else {
            return supportsWebm
                ? [{ src: "/videos/bg-hero-video-optimized.webm", type: "video/webm" },
                { src: "/videos/bg-hero-video-optimized.mp4", type: "video/mp4" }]
                : [{ src: "/videos/bg-hero-video-optimized.mp4", type: "video/mp4" }];
        }
    };

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
                {videoSources().map((source, index) => (
                    <source key={index} src={source.src} type={source.type} />
                ))}
            </video>
        </div>
    );
});

export default VideoBackground; 