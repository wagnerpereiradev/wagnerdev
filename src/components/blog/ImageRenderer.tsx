'use client';

import Image from 'next/image';
import { ImageBlock } from '@/types/blog';
import { motion } from 'framer-motion';

interface ImageRendererProps {
    block: ImageBlock;
}

export default function ImageRenderer({ block }: ImageRendererProps) {
    const { url, metadata, redirect_url } = block;
    const { alt, caption, width = 1200, height = 800 } = metadata;

    const ImageComponent = (
        <div className="relative overflow-hidden rounded-xl my-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative w-full overflow-hidden aspect-video rounded-xl bg-neutral-900/40 backdrop-blur-md"
                style={{
                    aspectRatio: `${width}/${height}`,
                    minHeight: '200px'
                }}
            >
                <Image
                    src={url}
                    alt={alt || "Imagem do post"}
                    width={width}
                    height={height}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                    quality={80}
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1200px"
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFdwI2hN4pMwAAAABJRU5ErkJggg=="
                />
            </motion.div>
            {caption && (
                <div className="mt-3 text-sm text-neutral-400 text-center italic">
                    {caption}
                </div>
            )}
        </div>
    );

    if (redirect_url) {
        return (
            <a
                href={redirect_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                aria-label={`Ver mais sobre ${alt || "esta imagem"}`}
            >
                <div className="relative">
                    {ImageComponent}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center pb-4">
                        <span className="text-white text-sm bg-black/50 px-3 py-1 rounded-full">
                            Ver mais
                        </span>
                    </div>
                </div>
            </a>
        );
    }

    return ImageComponent;
} 