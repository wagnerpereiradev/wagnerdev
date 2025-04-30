'use client';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-8 px-4 sm:px-6 lg:px-8 bg-neutral-950 border-t border-neutral-900">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
                <p className="text-neutral-500 text-sm mb-4 md:mb-0">
                    © {currentYear} Wagner. Todos os direitos reservados.
                </p>
                <div className="flex space-x-6">
                    <a
                        href="#"
                        className="text-neutral-500 hover:text-neutral-300 transition-colors"
                    >
                        Política de Privacidade
                    </a>
                    <a
                        href="#"
                        className="text-neutral-500 hover:text-neutral-300 transition-colors"
                    >
                        Termos de Uso
                    </a>
                </div>
            </div>
        </footer>
    );
} 