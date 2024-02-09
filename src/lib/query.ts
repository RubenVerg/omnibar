import * as P from '@nrsk/sigma';

import { glyphs } from './glyphs';
import type { Glyph } from './types';

export function id(glyph: Glyph, meaning: [string, string[]]) {
	return `${glyph.glyph}-${meaning[0]}-${meaning[1].join('-')}`;
}

const g = glyphs.glyphs.flatMap(glyph => glyph.meanings.map(meaning => [id(glyph, meaning), meaning[1]] as [string, string[]]));

type S = string[];

const sets: Record<string, S> = Object.fromEntries(Object.entries(glyphs.dialects).map(([id, { shortName }]) => [shortName, g.filter(_ => _[1].includes(id)).map(_ => _[0])] as [string, string[]]));
sets['all'] = g.map(_ => _[0]);

const set = P.defer<S>();
const setLeft = P.defer<S>();

const identifier = P.map(P.choice(...Object.keys(sets).map(k => P.string(k))), key => sets[key]);
const parens = P.takeMid(P.oneOf('('), set, P.oneOf(')'));
const union = P.map(P.sequence(
	setLeft,
	P.oneOf('|∪'),
	set,
), (([left, _, right]) => [...new Set(...left, ...right)] as S));
const intersection = P.map(P.sequence(
	setLeft,
	P.oneOf('&∩'),
	set,
), (([left, _, right]) => left.filter(_ => right.includes(_)) as S));
const difference = P.map(P.sequence(
	setLeft,
	P.oneOf('-~'),
	set,
), (([left, _, right]) => left.filter(_ => !right.includes(_)) as S));

set.with(P.takeMid(P.optional(P.whitespace()), P.choice(P.attempt(union), P.attempt(intersection), P.attempt(difference), parens, identifier), P.optional(P.whitespace())));
setLeft.with(P.takeMid(P.optional(P.whitespace()), P.choice(parens, identifier), P.optional(P.whitespace())));

export function query(str: string) {
	const r = P.run(set).with(str);
	if (!r.isOk) return sets.all;
	return r.value;
}