export interface Glyphs {
	categories: Record<string, Category>;
	dialects: Record<string, Dialect>;
	glyphs: Glyph[];
}

export interface Category {
	name: string;
}

export interface Dialect {
	name: string;
}

export interface Glyph {
	glyph: string | [string, string] | [string, null];
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