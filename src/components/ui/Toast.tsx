'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface ToastProps {
    message: string;
    type: ToastType;
    duration?: number;
    onClose?: () => void;
    isVisible: boolean;
}

const getIcon = (type: ToastType) => {
    switch (type) {
        case 'success':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            );
        case 'error':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
            );
        case 'warning':
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
            );
        case 'info':
        default:
            return (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
            );
    }
};

const getColors = (type: ToastType) => {
    switch (type) {
        case 'success':
            return {
                bg: 'bg-green-500/10',
                border: 'border-green-500/30',
                text: 'text-green-500',
                gradient: 'from-green-500 to-green-600'
            };
        case 'error':
            return {
                bg: 'bg-red-500/10',
                border: 'border-red-500/30',
                text: 'text-red-500',
                gradient: 'from-red-500 to-red-600'
            };
        case 'warning':
            return {
                bg: 'bg-amber-500/10',
                border: 'border-amber-500/30',
                text: 'text-amber-500',
                gradient: 'from-amber-500 to-amber-600'
            };
        case 'info':
        default:
            return {
                bg: 'bg-[#3d43dd]/10',
                border: 'border-[#3d43dd]/30',
                text: 'text-[#3d43dd]',
                gradient: 'from-[#3d43dd] to-[#6366f1]'
            };
    }
};

export default function Toast({ message, type, duration = 5000, onClose, isVisible }: ToastProps) {
    const [progress, setProgress] = useState(0);
    const colors = getColors(type);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        let interval: NodeJS.Timeout;

        if (isVisible) {
            const step = 1000 / 60; // 60 fps
            const increment = step * 100 / duration;

            // Reset progress when toast becomes visible
            setProgress(0);

            interval = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        return 100;
                    }
                    return prev + increment;
                });
            }, step);

            timer = setTimeout(() => {
                onClose?.();
            }, duration);
        }

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, [isVisible, duration, onClose]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    className="fixed top-6 left-1/2 transform -translate-x-1/2 z-60 w-full max-w-md px-4"
                >
                    <div className="relative">
                        {/* Efeito de brilho */}
                        <div
                            className="absolute -inset-0.5 bg-gradient-to-r from-[#3d43dd]/20 to-[#6366f1]/20 rounded-xl blur-md"
                            style={{
                                background: type === 'success'
                                    ? 'radial-gradient(circle at 50% 50%, rgba(34, 197, 94, 0.2), transparent 70%)'
                                    : type === 'error'
                                        ? 'radial-gradient(circle at 50% 50%, rgba(239, 68, 68, 0.2), transparent 70%)'
                                        : type === 'warning'
                                            ? 'radial-gradient(circle at 50% 50%, rgba(245, 158, 11, 0.2), transparent 70%)'
                                            : 'radial-gradient(circle at 50% 50%, rgba(61, 67, 221, 0.2), transparent 70%)'
                            }}
                        ></div>

                        <div className={`relative rounded-xl ${colors.bg} backdrop-blur-xl p-4 border ${colors.border} shadow-lg shadow-black/10 flex items-start gap-3 overflow-hidden`}>
                            {/* Efeito de brilho animado */}
                            <motion.div
                                className="absolute inset-0 opacity-30 pointer-events-none"
                                animate={{
                                    background: [
                                        'radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 25%)',
                                        'radial-gradient(circle at 50% 100%, rgba(255, 255, 255, 0.1) 0%, transparent 25%)',
                                        'radial-gradient(circle at 0% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 25%)',
                                        'radial-gradient(circle at 100% 0%, rgba(255, 255, 255, 0.1) 0%, transparent 25%)',
                                    ]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            />

                            <div className={`flex-shrink-0 p-1.5 rounded-lg ${colors.bg === 'bg-[#3d43dd]/10' ? 'bg-[#3d43dd]/20' : colors.bg.replace('/10', '/20')} ${colors.text}`}>
                                {getIcon(type)}
                            </div>

                            <div className="flex-1 overflow-hidden">
                                <div className={`font-medium mb-3 text-white truncate`}>
                                    {message}
                                </div>

                                {/* Progress bar with fading pulse animation */}
                                <div className="w-full h-1 bg-black/10 rounded-full overflow-hidden">
                                    <motion.div
                                        className={`h-full bg-gradient-to-r ${colors.gradient} relative`}
                                        initial={{ width: "0%" }}
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.01, ease: "linear" }}
                                    >
                                        {/* Pulse effect */}
                                        <motion.div
                                            className="absolute right-0 top-0 h-full w-1 bg-white opacity-80"
                                            animate={{ opacity: [0.8, 0.3, 0.8] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    </motion.div>
                                </div>
                            </div>

                            <button
                                onClick={onClose}
                                className="text-white/70 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full relative z-20"
                                aria-label="Fechar notificação"
                                type="button"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export function useToast() {
    const [toast, setToast] = useState<{
        message: string;
        type: ToastType;
        isVisible: boolean;
    }>({
        message: '',
        type: 'info',
        isVisible: false,
    });

    const showToast = (message: string, type: ToastType = 'info') => {
        setToast({ message, type, isVisible: true });
    };

    const hideToast = useCallback(() => {
        setToast(prev => ({ ...prev, isVisible: false }));
    }, []);

    const ToastComponent = useMemo(() => (
        <Toast
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={hideToast}
        />
    ), [toast.message, toast.type, toast.isVisible, hideToast]);

    return {
        showToast,
        hideToast,
        ToastComponent,
    };
} 