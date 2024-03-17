export interface Glyphs {
	dialects: Record<string, Dialect>;
	meanings: Record<string, Meaning>;
	urls: Record<string, Url>;
	glyphs: Glyph[];
}

export interface Dialect {
	name: string;
	shortName: string;
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
	names: string[];
	patterns?: string[];
	description?: string;
	urls?: Record<string, string>;
}