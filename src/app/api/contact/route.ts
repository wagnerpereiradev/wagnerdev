import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { initCors, validateCorsOrigin, handleCorsPreflightRequest } from '@/utils/cors';

// Lidar com requisições OPTIONS (preflight)
export async function OPTIONS(request: NextRequest) {
    return handleCorsPreflightRequest(request);
}

export async function POST(request: NextRequest) {
    // Verificar CORS
    if (!validateCorsOrigin(request)) {
        return NextResponse.json(
            { success: false, message: 'Origem não autorizada. Por favor, tente novamente a partir do site oficial.' },
            { status: 403, headers: initCors(request) }
        );
    }

    try {
        const formData = await request.json();
        const { name, email, subject, message } = formData;

        // Validação básica dos campos
        if (!name || !email || !message) {
            const missingFields = [];
            if (!name) missingFields.push('nome');
            if (!email) missingFields.push('email');
            if (!message) missingFields.push('mensagem');

            return NextResponse.json(
                {
                    success: false,
                    message: `Por favor, preencha os seguintes campos obrigatórios: ${missingFields.join(', ')}.`
                },
                { status: 400, headers: initCors(request) }
            );
        }

        // Validação básica de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'O formato do email é inválido. Verifique e tente novamente.' },
                { status: 400, headers: initCors(request) }
            );
        }

        // Configuração do transporter do Nodemailer com Hostinger
        const transporter = nodemailer.createTransport({
            host: "smtp.hostinger.com",
            port: 465,
            secure: true, // true para porta 465
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // Template HTML do email com design moderno
        const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nova Mensagem de Contato</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                <!-- Cabeçalho -->
                <div style="background: linear-gradient(135deg, #3d43dd 0%, #6366f1 100%); padding: 30px 20px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">Nova Mensagem de Contato</h1>
                </div>
                
                <!-- Conteúdo -->
                <div style="padding: 30px 40px;">
                    <p style="font-size: 16px; line-height: 1.5; color: #666; margin-bottom: 25px;">
                        Você recebeu uma nova mensagem através do formulário de contato do seu site:
                    </p>
                    
                    <div style="margin-bottom: 25px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 120px; color: #3d43dd;">Nome:</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #3d43dd;">Email:</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">
                                    <a href="mailto:${email}" style="color: #3d43dd; text-decoration: none;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #3d43dd;">Assunto:</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #eee;">${subject || 'Não informado'}</td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <h2 style="font-size: 18px; color: #3d43dd; margin-bottom: 15px; font-weight: 600;">Mensagem:</h2>
                        <div style="background-color: #f5f7ff; border-left: 4px solid #3d43dd; padding: 20px; line-height: 1.6; color: #555;">
                            ${message.replace(/\n/g, '<br>')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #3d43dd 0%, #6366f1 100%); color: white; text-decoration: none; padding: 12px 25px; border-radius: 30px; font-weight: 500; letter-spacing: 0.5px;">Responder Agora</a>
                    </div>
                </div>
                
                <!-- Rodapé -->
                <div style="background-color: #f5f7ff; padding: 20px; text-align: center; font-size: 14px; color: #666; border-top: 1px solid #e0e0ff;">
                    <p style="margin: 0;">Esta mensagem foi enviada através do formulário de contato do seu site.</p>
                    <p style="margin: 10px 0 0 0; font-size: 12px;">© ${new Date().getFullYear()} Wagner Pereira • Desenvolvedor</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Enviar email
        const mailOptions = {
            from: `"Formulário de Contato" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
            replyTo: email,
            subject: `Novo contato: ${subject || 'Mensagem do site'}`,
            text: `Nome: ${name}\nEmail: ${email}\nAssunto: ${subject || 'Não informado'}\n\nMensagem: ${message}`,
            html: htmlTemplate,
        };

        try {
            await transporter.sendMail(mailOptions);

            return NextResponse.json({
                success: true,
                message: 'Sua mensagem foi enviada com sucesso! Retornarei em breve.'
            }, { headers: initCors(request) });

        } catch (emailError) {
            console.error('Erro ao enviar email:', emailError);
            return NextResponse.json(
                {
                    success: false,
                    message: 'Ocorreu um erro ao enviar o email. Nossa equipe foi notificada do problema.'
                },
                { status: 500, headers: initCors(request) }
            );
        }

    } catch (error) {
        console.error('Erro ao processar contato:', error);

        let errorMessage = 'Erro interno ao processar sua mensagem. Por favor, tente novamente mais tarde.';

        if (error instanceof Error) {
            // Personalizar mensagem baseada no tipo de erro
            if (error.message.includes('network')) {
                errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
            } else if (error.message.includes('parse')) {
                errorMessage = 'Erro na formatação dos dados. Tente novamente.';
            } else if (error.message.includes('timeout')) {
                errorMessage = 'Tempo limite excedido. O servidor pode estar sobrecarregado, tente novamente em alguns minutos.';
            }
        }

        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: 500, headers: initCors(request) }
        );
    }
} 