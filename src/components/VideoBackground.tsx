'use client';

import { useRef } from 'react';

export default function VideoBackground() {
    const videoRef = useRef<HTMLVideoElement>(null);

    return (
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                disablePictureInPicture
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                    opacity: 0.5,
                    filter: "saturate(0.7) contrast(1.1)",
                    objectFit: "cover",
                    width: "100%"
                }}
            >
                <source src="/videos/bg-hero-video.mp4" type="video/mp4" />
            </video>
        </div>
    );
} 