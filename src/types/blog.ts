export interface Author {
    name: string;
    profile_url: string;
    avatar_url?: string;
}

export interface ImageMetadata {
    alt: string;
    caption?: string;
    width?: number;
    height?: number;
}

export interface CoverImage {
    url: string;
    alt: string;
    caption?: string;
}

export interface SocialLinks {
    linkedin?: string;
    github?: string;
    twitter?: string;
    website?: string;
}

export interface MarkdownBlock {
    type: 'markdown';
    content: string;
}

export interface ImageBlock {
    type: 'img';
    url: string;
    metadata: ImageMetadata;
    redirect_url?: string;
}

export interface CodeBlock {
    type: 'code';
    language: string;
    content: string;
}

export interface VideoBlock {
    type: 'video';
    url: string;
    metadata?: {
        caption?: string;
        width?: number | string;
        height?: number | string;
    };
}

export interface IframeBlock {
    type: 'iframe';
    url: string;
    metadata?: {
        title?: string;
        width?: number | string;
        height?: number | string;
    };
}

export type ContentBlock =
    | MarkdownBlock
    | ImageBlock
    | CodeBlock
    | VideoBlock
    | IframeBlock;

export interface BlogPost {
    headline: string;
    slug: string;
    author: Author;
    date: string;
    category: string;
    tags: string[];
    cover_image: CoverImage;
    reading_time: string;
    summary: string;
    social?: SocialLinks;
    body: ContentBlock[];
} 