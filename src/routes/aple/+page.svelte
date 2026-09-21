<script lang='ts'>
	import { categories, glyphs } from '$lib/glyphs';
	import type { Dialect, GlyphRepr } from '$lib/types';
	import { Button, ButtonGroup, Input, Table } from '@sveltestrap/sveltestrap';
	import seed from 'seed-random';
	import { onMount } from 'svelte';

	const [guesses, guessesStr] = [8, 'eight'];

	const today = new Date(new Date().toUTCString()).toISOString().split('T')[0];
	const random = seed(today);

	const dialects = Object.entries(glyphs.dialects).flatMap(([key, dialect]) => dialect.hidden ? [] : [[key, dialect] as [string, Dialect]]);

	const [key, dialect] = dialects[Math.floor(random() * dialects.length)];

	const allMeanings = Object.keys(glyphs.meanings).filter(k => Object.values(glyphs.glyphs).some(gl => gl.meanings.some(m => m[0] === k && m[1].includes(key))));

	const results = {
		n: { color: '#ffadad', letter: 'N', emoji: '🟥' },
		p: { color: '#fdffb6', letter: 'P', emoji: '🟨' },
		g: { color: '#caffbf', letter: 'G', emoji: '🟩' },
	} as const;

	type Result = keyof typeof results;

	let search: string = '';
	let suggestions: ({
		glyph: GlyphRepr;
		patterns: string[];
		names: string[];
		dialects: string[];
	} | [string, Dialect])[] = [];
	let previous: ([GlyphRepr, string, Result, string] | [string, Dialect])[] = [];
	let updatePlease = 0;
	let won = false;

	onMount(() => {
		const json = window.localStorage.getItem(today);
		if (json === null) return;
		previous = JSON.parse(json);
		won = previous.some(p => p.length === 2 && p[0] === key);
	});

	function patternToCategory(pattern: string | undefined): keyof typeof categories {
		return [...pattern ?? ''].find(_ => 'A' <= _ && _ <= 'Z')?.toLowerCase?.() as keyof typeof categories ?? 's';
	}

	const flatPairs = glyphs.glyphs.flatMap(g => g.meanings
		.map(_ => _[0])
		.map(_ => glyphs.meanings[_])
		.map((m, idx) => ({
			glyph: g.glyph,
			patterns: m.patterns!,
			names: m.names,
			dialects: g.meanings[idx][1],
		}))
		.filter(t => t.patterns !== undefined && t.patterns.length > 0 && patternToCategory(t.patterns[0]) !== 's'))
		.filter(t => t.dialects.some(d => !(glyphs.dialects[d].hidden ?? false)));

	function suggest() {
		suggestions = search.trim() === '' ? [] : [
			...dialects.filter(([key, dl]) => key.toLowerCase().includes(search.toLowerCase()) || dl.name.toLowerCase().includes(search.toLowerCase()) || dl.shortName.toLowerCase().includes(search.toLowerCase())),
			...flatPairs.filter(({ glyph, names }) => glyph.includes(search) || names.some(name => name.toLowerCase().includes(search.toLowerCase()))),
		];
	}

	function submitCommon() {
		updatePlease++;
		search = '';
		suggestions = [];
		document.querySelector<HTMLInputElement>('#search')?.focus?.();
		window.localStorage.setItem(today, JSON.stringify(previous));
	}

	function submit(glyph: GlyphRepr, names: string[]) {
		const gl = Object.values(glyphs.glyphs).find(gl => gl.glyph === glyph)!;
		const meaning = Object.entries(glyphs.meanings).find(m => m[1].names === names)![0];
		previous.push([glyph, names[0], 
			gl.meanings.find(m => m[0] === meaning)![1].includes(key) ? 'g' :
			allMeanings.includes(meaning) ? 'p' : 'n', glyphs.meanings[meaning].patterns![0]]);
		submitCommon();
	}
		
	function submitDialect(dialect: string) {
		if (dialect === key)
			won = true;
		previous.push([dialect, glyphs.dialects[dialect]!]);
		submitCommon();
	}

	async function copyResults() {
		const string = `APLe ${today} – ${won ? previous.length : 'X'}/${guesses}
${previous.map(v => v.length === 2 ? v[0] === key ? '⭐' : '⬛' : results[v[2]].emoji).join('')}
https://omnibar.rubenverg.com/aple`;
		await navigator.clipboard.writeText(string);
	}
</script>

<svelte:head>
	<title>APLe: guess the dialect</title>
</svelte:head>

<div class='mx-3 my-4'>
	<h1>APLe</h1>

	<div>
		Every day, a different APL dialect (which appears in <a href='/'>Omnibar</a>) is chosen at random. You can guess glyph and primitive combinations, and you will receive one the following pieces of information:

		<ul>
			<li><span style={`background-color: ${results.n.color};`} class='font-monospace'>{results.n.letter}</span> The primitive does not appear in the dialect</li>
			<li><span style={`background-color: ${results.p.color};`} class='font-monospace'>{results.p.letter}</span> The primitive appears in the dialect, but with a different glyph</li>
			<li><span style={`background-color: ${results.g.color};`} class='font-monospace'>{results.g.letter}</span> The primitive appears in the dialect with this glyph</li>
		</ul>

		At any point, you can instead guess what dialect you think has been selected today. In total, you have {guessesStr} available guesses.
	</div>

	<Table class='d-inline-block'>
		<thead>
			<tr>
				<th>Verdict</th>
				<th>Glyph</th>
				<th>Primitive</th>
			</tr>
		</thead>
		<tbody>
			{#key updatePlease}
				{#each previous as pr}
					{#if pr.length === 4}
						{@const [glyph, name, result, pattern] = pr}
						<tr>
							<th scope='row' style={`background-color: ${results[result].color};`} class='font-monospace text-center fs-5'>
								{results[result].letter}
							</th>

							<td class='text-center fs-5'>
								{#if typeof glyph === 'string'}
									<code class='border border-secondary-subtle'>{glyph}</code>
								{:else if glyph[1] === null}
									<code class='overstrike border border-secondary-subtle'>{glyph[0]}</code>&nbsp;(no Unicode equivalent)
								{:else}
									<code class='overstrike border border-secondary-subtle'>{glyph[0]}</code>&nbsp;(closest Unicode equivalent(s): {glyph[1]})
								{/if}
							</td>
		
							<td style={`background-color: ${categories[patternToCategory(pattern)]?.bgColor};`} class='align-middle'>
								{name}
							</td>
						</tr>
					{:else}
						<tr>
							<th scope='row' style={`background-color: $bbbdbf;`} class='font-monospace text-center fs-5'>
								{pr[0] === key ? '⭐️' : 'X'}
							</th>
							<td colspan='2' class='text-center align-middle'>
								<em>{pr[1].name}</em>
							</td>
						</tr>
					{/if}
				{/each}
			{/key}
		</tbody>
	</Table>

	{#if !won && previous.length < guesses}
		<form autocomplete='off' on:submit|preventDefault={() => {}}>
			<Input id='search' type='text' placeholder='Search for a primitive…' bind:value={search} on:input={suggest} />

			<ButtonGroup vertical class='ms-3'>
				{#key suggestions}
					{#each suggestions as s}
						{#if !Array.isArray(s)}
							{@const { glyph, names, patterns } = s}
							<Button on:click={() => submit(glyph, names)} class='text-start align-middle' style={`background-color: ${categories[patternToCategory(patterns[0])]?.bgColor}; color: var(--bs-text-color)`}>
								{#if typeof glyph === 'string'}
									<code class='border border-secondary-subtle bg-white fs-6'>{glyph}</code>
								{:else if glyph[1] === null}
									<code class='overstrike border border-secondary-subtle bg-white fs-6'>{glyph[0]}</code>&nbsp;(no Unicode equivalent)
								{:else}
									<code class='overstrike border border-secondary-subtle bg-white fs-6'>{glyph[0]}</code>&nbsp;(closest Unicode equivalent(s): {glyph[1]})
								{/if}

								{names[0]}
							</Button>
						{:else}
							<Button on:click={() => submitDialect(s[0])} class='text-start'>
								<strong>{s[1].name}</strong>
							</Button>
						{/if}
					{/each}
				{/key}
			</ButtonGroup>
		</form>
	{:else}
		<div>
			{#if won}<h2>Congratulations!</h2>{/if}

			Today's dialect was {dialect.name}.

			<Button on:click={copyResults} color='primary' outline={true}>Copy your results</Button>
		</div>
	{/if}
</div>

<style>
	@font-face {
		font-family: APL387;
		src: url('/APL387.ttf');
	}

	:root {
		--bs-font-monospace: APL387, 'APL387', 'APL387 Unicode', 'TinyAPL386 Unicode', 'BQN386 Unicode', 'APL386 Unicode', APL385, APL333, 'Fira Code', monospace !important;
	}

	.overstrike {
		letter-spacing: -1ch;
	}

	.overstrike::after {
		letter-spacing: normal;
		content: ' ';
	}
</style>
