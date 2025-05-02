'use client';

import { VideoBlock } from '@/types/blog';
import { motion } from 'framer-motion';

interface VideoRendererProps {
    block: VideoBlock;
}

export default function VideoRenderer({ block }: VideoRendererProps) {
    const { url, metadata } = block;
    const { caption } = metadata || {};

    return (
        <motion.div
            className="my-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="relative rounded-xl overflow-hidden bg-neutral-900/40 backdrop-blur-md">
                <div className="aspect-video">
                    <iframe
                        src={url}
                        title="Video embed"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                    />
                </div>
            </div>
            {caption && (
                <div className="mt-3 text-sm text-neutral-400 text-center italic">
                    {caption}
                </div>
            )}
        </motion.div>
    );
} 