<script lang='ts'>
	import { categories, glyphs } from '$lib/glyphs';
	import type { Dialect, GlyphRepr, Glyphs } from '$lib/types';
	import { id, query } from '$lib/query';
  import { Button, Input, Table } from '@sveltestrap/sveltestrap';
	import { onMount } from 'svelte';

	let filter: string = '';
	let search: string = '';
	let includeGlyph: boolean = true;
	let includeName: boolean = true;
	let includeDesc: boolean = false;

	const flatGlyphs = glyphs.glyphs.flatMap(g =>
		g.meanings
			.map(_ => _[0])
			.map(_ => glyphs.meanings[_])
			.map((m, idx) => [
				g.glyph,
				m.patterns,
				m.names[0],
				m.description ?? '',
				Object.values(m.urls ?? {}),
				g.meanings[idx][1].map(_ => glyphs.dialects[_].shortName),
			])
	);

	function download() {
		const blob = new Blob([JSON.stringify(flatGlyphs)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.setAttribute('download', 'glyphs.json');
		a.setAttribute('href', url);
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	}
	
	function escape(str: string) {
		return str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
	}

	function glyphRepr(glyph: GlyphRepr) {
		if (typeof glyph === 'string') return escape(glyph)
		else return `<span class='overstrike'>${escape(glyph[0])}</span>`;
	}

	function htmlPattern(pattern: string, glyph: string) {
		if (glyph.includes('∘.') || glyph.includes('∘•')) pattern = pattern.replace(/(.)A/, 'A$1');
		return [...pattern].map(ch => {
			switch (ch) {
				case '(':
				case ')':
				case '{':
				case '}':
				case '[':
				case ']':
					return ch;
				case 'x':
				case 'y':
				case 'u':
				case 'v':
					return `<span style='color: ${categories.r.fgColor};'>${ch}</span>`;
				case 'm':
				case 'n':
					return `<span class='text-decoration-underline' style='color: ${categories.m.fgColor}; text-decoration-style: solid !important; text-decoration-thickness: 1.5px !important;'>${ch}</span>`;
				case 'd':
				case 'e':
					return `<span class='text-decoration-underline' style='color: ${categories.d.fgColor}; text-decoration-style: double !important; text-decoration-thickness: 1.5px !important;'>${ch}</span>`;
				case 'a':
					return `<span class='text-decoration-underline fst-italic' style='color: ${categories.a.fgColor}; text-decoration-style: solid !important; text-decoration-thickness: 1.5px !important;'>${ch}</span>`;
				case 'c':
					return `<span class='text-decoration-underline fst-italic' style='color: ${categories.c.fgColor}; text-decoration-style: double !important; text-decoration-thickness: 1.5px !important;'>${ch}</span>`;
				case 'R':
					return `<span style='color: ${categories.r.fgColor};'>${glyph}</span>`;
				case 'M':
					return `<span style='color: ${categories.m.fgColor};'>${glyph}</span>`;
				case 'D':
					return `<span style='color: ${categories.d.fgColor};'>${glyph}</span>`;
				case 'A':
					return `<span style='color: ${categories.a.fgColor};'>${glyph}</span>`;
				case 'C':
					return `<span style='color: ${categories.c.fgColor};'>${glyph}</span>`;
				case 'H':
					return `<span style='color: ${categories.h.fgColor};'>${glyph}</span>`;
				default:
					console.error(`Unknown character to colorize: ${ch}`);
					return ch;
			}
		}).join('');
	}

	function patternToCategory(pattern: string | undefined): keyof typeof categories {
		return [...pattern ?? ''].find(_ => 'A' <= _ && _ <= 'Z')?.toLowerCase?.() as keyof typeof categories ?? 's';
	}

	function filteredGlyphs(glyphs: Glyphs, filter: string): Glyphs {
		const withId = glyphs.glyphs.map(glyph => ({ ...glyph, meanings: glyph.meanings.map(meaning => [id(glyph, meaning), meaning] as const) }));
		const q = query(filter);
		return { ...glyphs, glyphs: withId.map(glyph => ({ ...glyph, meanings: glyph.meanings.filter(([id]) => q.includes(id)).map(([id, meaning]) => meaning) })).filter(glyph => glyph.meanings.length) };
	}

	function searchedGlyphs(glyphs: Glyphs, search: string, includeGlyph: boolean, includeName: boolean, includeDesc: boolean): Glyphs {
		search = search.trim().toLowerCase();
		if (search == '') return glyphs;
		return { ...glyphs, glyphs: glyphs.glyphs.flatMap(glyph => {
			if (includeGlyph && glyph.glyph.includes(search)) return glyph;
			let ret = false;
			const filtered = { ...glyph, meanings: glyph.meanings.filter(meaning => {
				const m = glyphs.meanings[meaning[0]];
				if (includeName) {
					if (m.names.some(name => name.toLowerCase().includes(search))) { ret = true; return true; }
				}
				if (includeDesc) {
					if ((m.description ?? '').toLowerCase().includes(search)) { ret = true; return true; }
				}
				if (!includeName && !includeDesc) return true; else return false;
			}) };
			if (ret) return [filtered]; else return [];
		}) };
	}
</script>

<svelte:head>
	<title>Omnibar: the ultimate language toolbar</title>
</svelte:head>

<div class='mx-3 my-4'>
	<h1>Omnibar <span class='float-end fs-6'><a href='https://github.com/rubenverg/omnibar'><i class='bi bi-github me-1' />GitHub</a></span></h1>

	<div>
		Omnibar: the ultimate language toolbar with support for all <abbr title='Is there a dialect not listed? Open a PR or an issue!'>(?)</abbr> APL dialects, and currently has {query('all').length} meanings.
		Many dialects call the same primitive different names; in this list they are all grouped under a common name.
		<!-- svelte-ignore a11y-invalid-attribute -->
		You can also <a href='#' on:click={download}><i class='bi bi-download me-1' />Download a JSON file</a> that contains all glyphs and meanings.
	</div>

	<div class='d-flex justify-content-center my-2'>
		{#each Object.values(categories) as { name, bgColor }}
			<span class='d-inline-block p-2 mx-1' style={`background-color: ${bgColor};`}>{name}</span>
		{/each}
	</div>

	<p>
		<code>{@html htmlPattern('x', '')}</code>, <code>{@html htmlPattern('y', '')}</code>, <code>{@html htmlPattern('u', '')}</code>, <code>{@html htmlPattern('v', '')}</code>: Arrays <span class='me-2' />
		<code>{@html htmlPattern('m', '')}</code>, <code>{@html htmlPattern('n', '')}</code>: Monadic functions <span class='me-2' />
		<code>{@html htmlPattern('d', '')}</code>, <code>{@html htmlPattern('e', '')}</code>: Dyadic functions <span class='me-2' />
		<code>{@html htmlPattern('a', '')}</code>: Monadic operators <span class='me-2' />
		<code>{@html htmlPattern('c', '')}</code>: Dyadic operators <span class='me-2' />
	</p>

	<div class='row'>
		{#each Object.values(glyphs.dialects) as { name, shortName }}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<span class='d-inline-block col-auto' on:click={() => filter = shortName}>
				<span class='badge border me-1 border-secondary text-secondary bg-secondary-subtle'>{shortName}</span> {name} <span class='me-2' />
			</span>
		{/each}
	</div>

	<div class='row align-items-center pt-2'>
		<div class='col-1'>
			<label for='search'>Search</label>
		</div>
		<div class='col-5'>
			<Input type='text' id='search' bind:value={search} />
		</div>
		<div class='col-2'>
			<Input type='checkbox' id='includeGlyph' label='Include glyph' checked on:input={() => { includeGlyph = !includeGlyph; }} />
		</div>
		<div class='col-2'>
			<Input type='checkbox' id='includeName' label='Include name' checked on:input={() => { includeName = !includeName; }} />
		</div>
		<div class='col-2'>
			<Input type='checkbox' id='includeDesc' label='Include description' on:input={() => { includeDesc = !includeDesc; }} />
		</div>
	</div>

	<div class='row align-items-center pt-2'>
		<div class='col-1'>
			<label for='filter'>Filter by dialect</label>
		</div>

		<div class='col-5'>
			<Input type='text' id='filter' bind:value={filter} />
		</div>
		
		<div class='col-6'>
			<span class='form-text'>
				Use short names for dialects (listed above, plus <code>all</code>), <code>|</code> for union, <code>&</code> for intersection, <code>~</code> for difference.
			</span>
		</div>
	</div>

	<Table>
		<thead>
			<tr>
				<th scope='col'>Glyph</th>
				<th scope='col'>Meaning name</th>
				<th scope='col'>Meaning pattern</th>
				<th scope='col'>Meaning description</th>
				<th scope='col'>Meaning dialects</th>
			</tr>
		</thead>
		<tbody>
			{#key includeGlyph}{#key includeName}{#key includeDesc}
			{#each searchedGlyphs(filteredGlyphs(glyphs, filter), search, includeGlyph, includeName, includeDesc).glyphs as { glyph, meanings }}
				{#each meanings.entries() as [idx, [meaning, dialects]]}
					{@const category = patternToCategory(glyphs.meanings[meaning]?.patterns?.[0] ?? '')}
					<tr>
						{#if idx === 0}
							<th scope='row' rowspan={meanings.length} class='fw-normal'>
								{#if typeof glyph === 'string'}
									<code class='border border-secondary-subtle'>{glyph}</code>
								{:else if glyph[1] === null}
									<code class='overstrike border border-secondary-subtle'>{glyph[0]}</code>&nbsp;(no Unicode equivalent)
								{:else}
									<code class='overstrike border border-secondary-subtle'>{glyph[0]}</code>&nbsp;(closest Unicode equivalent(s): {glyph[1]})
								{/if}
							</th>
						{/if}
						<td style={`background-color: ${categories[category]?.bgColor};`}>
							<!-- <span class='badge border me-1 border-primary text-primary bg-primary-subtle'>{glyphs.categories[glyphs.meanings[meaning]?.category]?.name}</span> -->
							{glyphs.meanings[meaning]?.names?.[0]}
						</td>
						<td>
							<div class='d-flex flex-column'>
								{#each glyphs.meanings[meaning]?.patterns ?? [] as pattern}
									<code class='text-body'>{@html htmlPattern(pattern, glyphRepr(glyph))}</code>
								{/each}
							</div>
						</td>
						<td>
							{glyphs.meanings[meaning]?.description ?? ''}
							{#if glyphs.meanings[meaning]?.urls}
								{#each Object.entries(glyphs.meanings[meaning].urls ?? {}) as [type, url]}
									<a href={url} class='me-1'>{glyphs.urls[type]?.name}</a>
								{/each}
							{/if}
						</td>
						<td>
							{#each dialects as dialect}
								<abbr title={glyphs.dialects[dialect]?.name} class='badge border me-1 border-secondary text-secondary bg-secondary-subtle'>{glyphs.dialects[dialect]?.shortName}</abbr>
							{/each}
						</td>
					</tr>
				{/each}
			{/each}
			{/key}{/key}{/key}
		</tbody>
	</Table>
</div>

<style>
	@font-face {
		font-family: APL386;
		src: url("/APL386.ttf");
	}
	:root {
		--bs-font-monospace: APL386, 'BQN386 Unicode', APL385, APL333, 'Fira Code', monospace !important;
	}

	tbody th code {
		font-size: 2em;
		padding: .1ex;
	}

	tbody th, tbody td {
		vertical-align: middle;
	}

	.overstrike {
		letter-spacing: -1ch;
	}

	.overstrike::after {
		letter-spacing: normal;
		content: ' ';
	}
</style>