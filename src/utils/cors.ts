import { NextRequest, NextResponse } from 'next/server';

// Definir as origens permitidas
const allowedOrigins = [
    'https://www.wagnerai.me',
    'https://wagnerai.me',
    'https://www.wagnerdev.vercel.app',
    'https://wagnerdev.vercel.app',
    'http://localhost:3000',
];

// Adicionar localhost para ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
    allowedOrigins.push('http://localhost:3000');
}

// Middleware CORS
export function initCors(req: NextRequest) {
    const origin = req.headers.get('origin');

    // Verificar se a origem está na lista de origens permitidas
    const isAllowedOrigin = origin && allowedOrigins.includes(origin);

    // Construir os cabeçalhos de CORS apropriados
    const headers = new Headers();

    if (isAllowedOrigin) {
        headers.set('Access-Control-Allow-Origin', origin);
    } else {
        // Se não for uma origem permitida, só permitimos o localhost em desenvolvimento
        if (process.env.NODE_ENV === 'development' && origin?.includes('localhost')) {
            headers.set('Access-Control-Allow-Origin', origin);
        } else {
            // Não definimos o cabeçalho de ACAO para origens não permitidas
            console.warn(`Origem bloqueada pelo CORS: ${origin}`);
        }
    }

    // Configurações adicionais do CORS
    headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    headers.set('Access-Control-Max-Age', '86400'); // 24 horas em segundos

    return headers;
}

// Middleware para verificar se a requisição está autorizada pelo CORS
export function validateCorsOrigin(req: NextRequest): boolean {
    const origin = req.headers.get('origin');

    // Em desenvolvimento, permitimos localhost
    if (process.env.NODE_ENV === 'development' && origin?.includes('localhost')) {
        return true;
    }

    // Em produção, verificamos se a origem está na lista de origens permitidas
    return origin ? allowedOrigins.includes(origin) : false;
}

// Função auxiliar para lidar com requisições OPTIONS (preflight)
export function handleCorsPreflightRequest(req: NextRequest): NextResponse {
    return new NextResponse(null, {
        status: 204, // No Content para requisições preflight
        headers: initCors(req),
    });
} 