'use client';

import { IframeBlock } from '@/types/blog';
import { motion } from 'framer-motion';

interface IframeRendererProps {
    block: IframeBlock;
}

export default function IframeRenderer({ block }: IframeRendererProps) {
    const { url, metadata } = block;
    const { title, width = '100%', height = '500px' } = metadata || {};

    return (
        <motion.div
            className="my-8"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <div className="rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900/40 backdrop-blur-md">
                <iframe
                    src={url}
                    title={title || "Embedded Content"}
                    width={width}
                    height={height}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full"
                    style={{ minHeight: typeof height === 'string' ? height : `${height}px` }}
                />
            </div>
            {title && (
                <div className="mt-3 text-sm text-neutral-400 text-center">
                    {title}
                </div>
            )}
        </motion.div>
    );
} 