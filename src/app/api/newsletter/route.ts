import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
import nodemailer from 'nodemailer';
import { initCors, validateCorsOrigin, handleCorsPreflightRequest } from '@/utils/cors';
import { blogPosts } from '@/data/blog-posts';

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
        const { email } = formData;

        if (!email) {
            return NextResponse.json(
                { success: false, message: 'Email não informado. Por favor, forneça um endereço de email válido.' },
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

        // Obter o post mais recente para exibir no email
        const latestPost = blogPosts[0]; // Considerando que o array está ordenado por data (mais recente primeiro)

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

        // Template HTML do email com design moderno para o administrador
        const htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nova Inscrição na Newsletter</title>
            <meta name="color-scheme" content="light dark">
            <meta name="supported-color-schemes" content="light dark">
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #333333 !important; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff !important; overflow: hidden; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);">
                <!-- Cabeçalho -->
                <div style="background: linear-gradient(135deg, #3d43dd 0%, #6366f1 100%); padding: 30px 20px; text-align: center;">
                    <h1 style="color: #ffffff !important; margin: 0; font-size: 24px; font-weight: 600;">Nova Inscrição na Newsletter</h1>
                </div>
                
                <!-- Conteúdo -->
                <div style="padding: 30px 40px;">
                    <p style="font-size: 16px; line-height: 1.5; color: #555555 !important; margin-bottom: 25px;">
                        Você recebeu uma nova inscrição na newsletter do seu site:
                    </p>
                    
                    <div style="margin-bottom: 25px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; width: 120px; color: #3d43dd !important;">Email:</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333333 !important;">
                                    <a href="mailto:${email}" style="color: #3d43dd !important; text-decoration: none;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 600; color: #3d43dd !important;">Data:</td>
                                <td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #333333 !important;">
                                    ${new Date().toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })}
                                </td>
                            </tr>
                        </table>
                    </div>
                    
                    <div style="margin-bottom: 25px;">
                        <p style="background-color: #f5f7ff; border-left: 4px solid #3d43dd; padding: 20px; line-height: 1.6; color: #444444 !important;">
                            Este usuário gostaria de receber atualizações e novidades sobre tecnologia e projetos.
                        </p>
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #3d43dd 0%, #6366f1 100%); color: #ffffff !important; text-decoration: none; padding: 12px 25px; border-radius: 30px; font-weight: 500; letter-spacing: 0.5px;">
                            Adicionar ao Mailing
                        </a>
                    </div>
                </div>
                
                <!-- Dicas -->
                <div style="padding: 20px 40px; background-color: #f5f7ff; border-top: 1px solid #e0e0ff;">
                    <h3 style="font-size: 16px; color: #3d43dd !important; margin-bottom: 15px;">Próximos passos recomendados:</h3>
                    <ul style="color: #444444 !important; padding-left: 20px; margin: 0;">
                        <li style="margin-bottom: 10px;">Adicione este email à sua lista de contatos no serviço de newsletter</li>
                        <li style="margin-bottom: 10px;">Envie um email de boas-vindas ao novo inscrito</li>
                        <li style="margin-bottom: 10px;">Agradeça ao usuário por se inscrever</li>
                    </ul>
                </div>
                
                <!-- Rodapé -->
                <div style="background-color: #f5f7ff; padding: 20px; text-align: center; font-size: 14px; color: #555555 !important; border-top: 1px solid #e0e0ff;">
                    <p style="margin: 0;">Esta mensagem foi enviada automaticamente pelo sistema de newsletter do seu site.</p>
                    <p style="margin: 10px 0 0 0; font-size: 12px; color: #666666 !important;">© ${new Date().getFullYear()} Wagner Pereira • Desenvolvedor</p>
                </div>
            </div>
        </body>
        </html>
        `;

        // Email informativo para o administrador sobre a nova inscrição
        const adminMail = {
            from: `"Sistema de Newsletter" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
            subject: `Nova inscrição na newsletter: ${email}`,
            text: `Nova inscrição na newsletter: ${email}`,
            html: htmlTemplate,
        };

        // Email de confirmação para o usuário que se inscreveu - MELHORADO COM ÚLTIMA NOTÍCIA
        const userTemplate = `
        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bem-vindo à minha Newsletter!</title>
    <meta name="color-scheme" content="light dark">
    <meta name="supported-color-schemes" content="light dark">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>
        /* Base styles */
        body {
            color: #111827;
            background-color: #f9f9f9;
        }
        .main-container {
            background-color: #ffffff;
        }

        /* Manter texto light sobre fundos escuros, independente do modo do dispositivo */
        .dark-bg-header h1,
        .dark-bg-header p,
        .dark-bg-content h2,
        .dark-bg-content p,
        .dark-bg-content div,
        .dark-bg-blog h3,
        .dark-bg-blog p {
            color: #ffffff !important;
        }

        .dark-bg-header p,
        .dark-bg-content p,
        .dark-bg-blog p {
            color: rgba(255, 255, 255, 0.9) !important;
        }

        /* Estilos específicos para dark mode - manter para o corpo do email */
        @media (prefers-color-scheme: dark) {
            body {
                color: #ffffff !important;
                background-color: #1f1f1f !important;
            }
            .main-container {
                background-color: #2c2c2c !important;
            }
            .dark-mode-text {
                color: #ffffff !important;
            }
            .dark-mode-text-medium {
                color: #e1e1e1 !important;
            }
            .dark-mode-text-light {
                color: #b0b0b0 !important;
            }
            .dark-mode-bg {
                background-color: #1f1f1f !important;
            }
            .dark-mode-bg-light {
                background-color: #2c2c2c !important;
            }
            .dark-mode-bg-card {
                background: linear-gradient(to right, rgba(61, 67, 221, 0.1), rgba(99, 102, 241, 0.15)) !important;
                border-left: 4px solid #5d61e3 !important;
            }
            h1, h2, h3, h4, h5, h6 {
                color: #ffffff !important;
            }
            p, span, div {
                color: #e1e1e1 !important;
            }
            strong {
                color: #ffffff !important;
            }
        }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #111827 !important; background-color: #f9f9f9;">
    <div class="main-container" style="max-width: 650px; margin: 0 auto; background-color: #ffffff !important; overflow: hidden; box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05); margin-top: 30px; margin-bottom: 30px;">
        <!-- Cabeçalho -->
        <div class="dark-bg-header" style="background: linear-gradient(135deg, #3d43dd 0%, #6366f1 100%); text-align: center; padding: 40px 20px;">
            <img src="https://avatars.githubusercontent.com/u/99822078?v=4" alt="Wagner Pereira" style="width: 100px; height: 100px; border-radius: 50%; border: 3px solid rgba(255, 255, 255, 0.7); object-fit: cover;">
            <h1 style="margin: 20px 0 5px; font-size: 28px; font-weight: 700; color: #ffffff !important;">Olá! Bem-vindo à minha newsletter</h1>
            <p style="margin: 0; font-size: 16px; max-width: 400px; margin: 0 auto; color: rgba(255, 255, 255, 0.9) !important;">
                Conteúdo exclusivo sobre tecnologia, desenvolvimento e muito mais
            </p>
        </div>
        
        <!-- Mensagem principal de boas-vindas -->
        <div style="padding: 40px 50px;">
            <h2 class="dark-mode-text" style="color: #111827 !important; font-size: 22px; margin-top: 0; margin-bottom: 25px; font-weight: 600;">Eu sou Wagner Pereira ✌️</h2>
            
            <p class="dark-mode-text-medium" style="font-size: 16px; line-height: 1.7; color: #4B5563 !important; margin-bottom: 25px;">
                É um prazer ter você na minha lista! Obrigado por se inscrever. Estou animado para compartilhar meu conhecimento, novidades e insights sobre o mundo tech com você.
            </p>
            
            <p class="dark-mode-text-medium" style="font-size: 16px; line-height: 1.7; color: #4B5563 !important; margin-bottom: 35px;">
                Sempre busco trazer conteúdo relevante que ajude você a se manter atualizado e inspirado. Vamos juntos nessa jornada!
            </p>
            
            <!-- Card de destaque -->
            <div class="dark-mode-bg-card" style="background: linear-gradient(to right, rgba(61, 67, 221, 0.03), rgba(99, 102, 241, 0.07)); padding: 30px; margin-bottom: 35px; border-left: 4px solid #3d43dd;">
                <h3 class="dark-mode-text" style="color: #3d43dd !important; font-size: 18px; margin-top: 0; margin-bottom: 20px; font-weight: 600;">O que você vai receber:</h3>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                    <div style="min-width: 24px; height: 24px; background-color: #3d43dd; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 14px; margin-top: 2px;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <p class="dark-mode-text-medium" style="margin: 0; color: #4B5563 !important; font-size: 15px; line-height: 1.6;">
                        <strong class="dark-mode-text" style="color: #111827 !important;">Novidades exclusivas</strong> sobre meus projetos e lançamentos antes de qualquer pessoa
                    </p>
                </div>
                
                <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                    <div style="min-width: 24px; height: 24px; background-color: #3d43dd; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 14px; margin-top: 2px;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <p class="dark-mode-text-medium" style="margin: 0; color: #4B5563 !important; font-size: 15px; line-height: 1.6;">
                        <strong class="dark-mode-text" style="color: #111827 !important;">Dicas práticas</strong> e insights de desenvolvimento que uso diariamente no meu trabalho
                    </p>
                </div>
                
                <div style="display: flex; align-items: flex-start;">
                    <div style="min-width: 24px; height: 24px; background-color: #3d43dd; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 14px; margin-top: 2px;">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20 6L9 17L4 12" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <p class="dark-mode-text-medium" style="margin: 0; color: #4B5563 !important; font-size: 15px; line-height: 1.6;">
                        <strong class="dark-mode-text" style="color: #111827 !important;">Tendências tecnológicas</strong> e análises sobre o futuro do desenvolvimento web
                    </p>
                </div>
            </div>
            
            <!-- CTA principal -->
            <div style="text-align: center; margin-bottom: 40px; padding: 20px 0;">
                <p class="dark-mode-text-medium" style="font-size: 16px; line-height: 1.7; color: #4B5563 !important; margin-bottom: 25px;">
                    Enquanto isso, confira meu site completo:
                </p>
                <a href="https://wagnerai.me/" class="dark-bg-header" style="display: inline-block; background: linear-gradient(135deg, #3d43dd 0%, #6366f1 100%); color: #ffffff !important; text-decoration: none; padding: 16px 32px; border-radius: 100px; font-weight: 600; letter-spacing: 0.3px; font-size: 16px; box-shadow: 0 4px 12px rgba(61, 67, 221, 0.25); transition: all 0.2s ease;">
                    <span style="color: #ffffff !important;">Visitar meu site</span>
                </a>
            </div>
        </div>

                <!-- Banner de destaque da última publicação -->
        <div style="margin: 0; position: relative;">
            <a href="https://wagnerai.me/blog/${latestPost.slug}" style="text-decoration: none; color: inherit; display: block;">
                <div style="position: relative;">
                    <img src="${latestPost.cover_image.url}" alt="${latestPost.cover_image.alt}" style="width: 100%; height: auto; max-height: 280px; object-fit: cover;">
                    <div style="position: absolute; bottom: 0; left: 0; right: 0; background: #333333; color: #ffffff; padding: 30px 30px 20px;">
                        <div style="display: inline-block; background-color: #3d43dd; font-size: 11px; font-weight: 600; padding: 4px 10px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: #ffffff !important;">
                            Último artigo
                        </div>
                        <h2 style="margin: 0 0 10px; font-size: 20px; font-weight: 700; line-height: 1.3; color: #ffffff !important;">
                            ${latestPost.headline}
                        </h2>
                        <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.9) !important;">
                            ${latestPost.summary}
                        </p>
                    </div>
                </div>
            </a>
        </div>
        
        <!-- Rodapé -->
        <div class="dark-mode-bg" style="background-color: #F3F4F6; padding: 30px; text-align: center; border-top: 1px solid #E5E7EB;">
            <!-- Links sociais -->
            <div style="margin-bottom: 25px;">
                <a href="https://github.com/wagnerpereiradev" style="display: inline-block; margin: 0 10px; color: #6B7280;">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" style="width: 24px; height: 24px;">
                </a>
                <a href="https://linkedin.com/in/owrp" style="display: inline-block; margin: 0 10px; color: #6B7280;">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style="width: 24px; height: 24px;">
                </a>
                <a href="https://instagram.com/wagner.mi6" style="display: inline-block; margin: 0 10px; color: #6B7280;">
                    <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" style="width: 24px; height: 24px;">
                </a>
            </div>
            
            <p class="dark-mode-text-medium" style="margin: 0; color: #6B7280 !important; font-size: 14px;">
                Você está recebendo este email porque se inscreveu na newsletter.
            </p>
            
            <p class="dark-mode-text-light" style="color: #9CA3AF !important; font-size: 12px; margin-top: 15px;">
                © ${new Date().getFullYear()} Wagner Pereira • Desenvolvedor<br>
                São Paulo, Brasil
            </p>
        </div>
    </div>
</body>
</html>
       `

        // Email de confirmação para o usuário
        const userMail = {
            from: `"Wagner Pereira" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: `🚀 Bem-vindo à minha Newsletter!`,
            text: `Obrigado por se inscrever na minha newsletter!`,
            html: userTemplate,
        };

        try {
            // Enviar email para o administrador
            await transporter.sendMail(adminMail);

            // Enviar email de confirmação para o usuário
            await transporter.sendMail(userMail);

            return NextResponse.json({
                success: true,
                message: 'Inscrição realizada com sucesso! Verifique seu email para confirmar.'
            }, { headers: initCors(request) });
        } catch (emailError) {
            console.error('Erro ao enviar emails:', emailError);
            return NextResponse.json(
                {
                    success: false,
                    message: 'Ocorreu um erro ao enviar os emails de confirmação. Nossa equipe foi notificada.'
                },
                { status: 500, headers: initCors(request) }
            );
        }

    } catch (error) {
        console.error('Erro ao processar inscrição:', error);
        let errorMessage = 'Erro interno ao processar inscrição. Por favor, tente novamente mais tarde.';

        if (error instanceof Error) {
            // Personalizar mensagem baseada no tipo de erro
            if (error.message.includes('network')) {
                errorMessage = 'Erro de conexão. Verifique sua internet e tente novamente.';
            } else if (error.message.includes('parse')) {
                errorMessage = 'Erro na formatação dos dados. Tente novamente.';
            }
        }

        return NextResponse.json(
            { success: false, message: errorMessage },
            { status: 500, headers: initCors(request) }
        );
    }
} 