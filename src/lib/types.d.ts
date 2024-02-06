export interface Glyphs {
	categories: Record<string, Category>;
	dialects: Record<string, Dialect>;
	meanings: Record<string, Meaning>;
	urls: Record<string, Url>;
	glyphs: Glyph[];
}

export interface Category {
	name: string;
	color: string;
}

export interface Dialect {
	name: string;
	children?: string[];
}

export interface Url {
	name: string;
}

export type GlyphRepr = string | [string, string[]] | [string, null];

export interface Glyph {
	glyph: GlyphRepr;
	meanings: [string, string[]][];
}

export interface Meaning {
	name: string;
	description?: string;
	category: string;
	urls?: Record<string, string>;
}