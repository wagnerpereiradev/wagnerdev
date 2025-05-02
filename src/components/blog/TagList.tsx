'use client';

import { motion } from 'framer-motion';

interface TagListProps {
    tags: string[];
}

export default function TagList({ tags }: TagListProps) {
    return (
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
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-neutral-900/60 text-neutral-300 border border-neutral-800/60 backdrop-blur-sm hover:border-[#3d43dd]/30 transition-colors"
                >
                    {tag}
                </motion.span>
            ))}
        </motion.div>
    );
} 