export function formatDate(dateString: string): string {
    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    };

    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
}

export function calculateReadingTime(text: string): string {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);

    return `${readingTime} min de leitura`;
} 