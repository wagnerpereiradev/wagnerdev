import { NextRequest, NextResponse } from 'next/server';

// Interface para vendas
interface Venda {
    status: string;
    customer?: {
        email?: string;
        name?: string;
        [key: string]: unknown;
    };
    [key: string]: unknown;
}

// Função para obter o token da API da Kiwify
async function getKiwifyToken() {
    try {
        const clientId = process.env.KIWIFY_CLIENT_ID;
        const clientSecret = process.env.KIWIFY_CLIENT_SECRET;

        if (!clientId || !clientSecret) {
            throw new Error('Credenciais da Kiwify não configuradas');
        }

        // Criar um URLSearchParams para enviar os parâmetros no formato correto
        const params = new URLSearchParams();
        params.append('client_id', clientId);
        params.append('client_secret', clientSecret);

        const response = await fetch('https://public-api.kiwify.com/v1/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: params,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: response.statusText }));
            throw new Error(`Erro ao obter token: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Erro ao obter token Kiwify:', error);
        throw error;
    }
}

// Função para consultar um período específico na API Kiwify
async function consultarPeriodo(token: string, accountId: string, startDate: string, endDate: string): Promise<Venda[]> {
    console.log(`Consultando período: ${startDate} até ${endDate}`);

    const response = await fetch(
        `https://public-api.kiwify.com/v1/sales?start_date=${startDate}&end_date=${endDate}&status=paid`,
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'x-kiwify-account-id': accountId,
            },
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: response.statusText }));
        throw new Error(`Erro na consulta à API Kiwify: ${errorData.message || response.statusText}`);
    }

    const salesData = await response.json();
    console.log(`Vendas no período ${startDate} até ${endDate}: ${salesData.data ? salesData.data.length : 0}`);

    return salesData.data || [];
}

// Função para verificar se o email está na lista de compradores
async function verificarComprador(email: string) {
    try {
        // Obter token de autenticação
        const token = await getKiwifyToken();
        const accountId = process.env.KIWIFY_ACCOUNT_ID;

        if (!accountId) {
            throw new Error('ID da conta Kiwify não configurado');
        }

        console.log(`Verificando comprador: ${email}`);

        // Definir períodos de 90 dias para consulta (limitação da API)
        const currentDate = new Date();

        // Verificar os últimos 12 meses (4 períodos de 90 dias)
        let todasVendas: Venda[] = [];
        let compradorEncontrado = false;

        for (let i = 0; i < 4; i++) {
            // Calcular datas para o período atual
            const endDate = new Date(currentDate);
            endDate.setDate(endDate.getDate() - (i * 90));

            const startDate = new Date(endDate);
            startDate.setDate(startDate.getDate() - 90);

            const startDateStr = startDate.toISOString();
            const endDateStr = endDate.toISOString();

            try {
                // Consultar período atual
                const vendasPeriodo = await consultarPeriodo(token, accountId, startDateStr, endDateStr);

                // Verificar se o comprador está neste período
                const comprador = vendasPeriodo.find(
                    (venda: Venda) =>
                        venda.status === 'paid' &&
                        venda.customer &&
                        venda.customer.email &&
                        venda.customer.email.toLowerCase() === email.toLowerCase()
                );

                if (comprador) {
                    console.log(`Comprador ${email} encontrado no período ${startDateStr} a ${endDateStr}`);
                    compradorEncontrado = true;
                    break; // Não precisa continuar verificando outros períodos
                }

                // Adicionar as vendas deste período ao total
                todasVendas = [...todasVendas, ...vendasPeriodo];
            } catch (error) {
                console.error(`Erro ao consultar período ${startDateStr} a ${endDateStr}:`, error);
                // Continuar para o próximo período em caso de erro
            }
        }

        console.log(`Total de vendas encontradas em todos os períodos: ${todasVendas.length}`);
        console.log(`Comprador encontrado: ${compradorEncontrado ? 'Sim' : 'Não'}`);

        return compradorEncontrado;
    } catch (error) {
        console.error('Erro ao verificar comprador:', error);
        throw error;
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: 'Email e senha são obrigatórios' },
                { status: 400 }
            );
        }

        console.log(`Tentativa de acesso: ${email}`);

        // Verificar a senha do curso
        const correctPassword = process.env.COURSE_CLIENT_PASS;

        if (!correctPassword) {
            console.error('A variável de ambiente COURSE_CLIENT_PASS não está definida');
            return NextResponse.json(
                { success: false, message: 'Erro de configuração do servidor' },
                { status: 500 }
            );
        }

        // Verificar se a senha está correta
        const isPasswordCorrect = password === correctPassword;

        if (!isPasswordCorrect) {
            console.log(`Senha incorreta para: ${email}`);
            return NextResponse.json(
                { success: false, message: 'Senha incorreta' },
                { status: 401 }
            );
        }

        // Verificar se o email está na lista de compradores
        try {
            const isCompradorValido = await verificarComprador(email);

            if (isCompradorValido) {
                console.log(`Acesso autorizado para: ${email}`);
                return NextResponse.json({ success: true }, { status: 200 });
            } else {
                console.log(`Email não encontrado nas compras: ${email}`);
                return NextResponse.json(
                    { success: false, message: 'Este email não está associado a uma compra confirmada deste produto' },
                    { status: 403 }
                );
            }
        } catch (error) {
            console.error('Erro na verificação do comprador:', error);
            return NextResponse.json(
                { success: false, message: 'Erro ao verificar o status de compra. Tente novamente mais tarde.' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Erro ao processar a solicitação:', error);
        return NextResponse.json(
            { success: false, message: 'Erro interno do servidor' },
            { status: 500 }
        );
    }
} 