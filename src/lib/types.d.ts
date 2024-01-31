export interface Glyphs {
	categories: Record<string, Category>;
	dialects: Record<string, Dialect>;
	glyphs: Record<string, Glyph>;
}

export interface Category {
	name: string;
}

export interface Dialect {
	name: string;
}

export interface Glyph {
	name: string;
	meanings: Meaning[];
}

export interface Meaning {
	name: string;
	description?: string;
	category: string;
	dialects: string[];
	urls?: string[];
}