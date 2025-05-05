'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

// Componente para resolver problemas de hidratação com bibliotecas de animação
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>{children}</>;
};

interface TagListProps {
    tags: string[];
    variant?: 'default' | 'small';
}

export default function TagList({ tags, variant = 'default' }: TagListProps) {
    const tagClassName = variant === 'small'
        ? "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-neutral-900/60 text-neutral-300 border border-neutral-800/60 backdrop-blur-sm hover:border-[#3d43dd]/30 transition-colors"
        : "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-900/60 text-neutral-300 border border-neutral-800/60 backdrop-blur-sm hover:border-[#3d43dd]/30 transition-colors";

    return (
        <ClientOnly>
            <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, staggerChildren: 0.1 }}
            >
                {tags.map((tag, index) => (
                    <motion.span
                        key={tag}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className={tagClassName}
                    >
                        {tag}
                    </motion.span>
                ))}
            </motion.div>
        </ClientOnly>
    );
} 