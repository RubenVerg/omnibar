<script lang='ts'>
	import { categories, glyphs } from '$lib/glyphs';
	import type { Dialect, GlyphRepr, Glyphs } from '$lib/types';
  import { Input, Table } from '@sveltestrap/sveltestrap';

	let dialectFilter: string = '';
	
	function allDialects(dialects: Record<string, Dialect>, d: string[]) {
		let changed = true;
		const flat = d.slice();
		while (changed) {
			console.log(flat);
			changed = false;
			for (const f of flat) {
				if (!dialects[f]) console.error('not found', f);
				if (dialects[f].children) {
					for (const child of dialects[f].children!) {
						if (!flat.includes(child)) {
							flat.push(child);
							changed = true;
						}
					}
				}
			}
		}
		return [...new Set(flat)];
	}

	function escape(str: string) {
		return str.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
	}

	function glyphRepr(glyph: GlyphRepr) {
		if (typeof glyph === 'string') return escape(glyph)
		else return `<span class='overstrike'>${escape(glyph[0])}</span>`;
	}

	function htmlPattern(pattern: string, glyph: string) {
		if (glyph.includes('∘.')) pattern = pattern.replace(/(.)A/, 'A$1');
		return [...pattern].map(ch => {
			switch (ch) {
				case '(':
				case ')':
				case '{':
				case '}':
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

	function filteredGlyphs(glyphs: Glyphs, dialectFilter: string) {
		if (dialectFilter === '') return glyphs.glyphs;
		return glyphs.glyphs
			.map(g => ({ ...g, meanings: g.meanings.filter(m => allDialects(glyphs.dialects, m[1]).includes(dialectFilter)) }))
			.filter(g => g.meanings);
	}
</script>

<svelte:head>
	<title>Omnibar</title>
</svelte:head>

<div class='mx-3 my-4'>
	<h1>Omnibar</h1>

	<p>
		Omnibar: the ultimate language toolbar with support for all <abbr title='Is there a dialect not listed? Open a PR or an issue!'>(?)</abbr> APL dialects.
	</p>
	
	<p>
		<a href='https://github.com/rubenverg/omnibar'><i class='bi bi-github me-2' />GitHub</a>
	</p>

	<ul>
		<li>Many dialects call the same primitive different names. In this list they are all grouped under a common name</li>
		<li>"Core APL" refers to primitives shared across all APL dialects, "Core Dyalog" refers to primitives shared across Dyalog, Extended Dyalog, and Dyalog Vision</li>
	</ul>

	<div class='d-flex justify-content-center mb-2'>
		{#each Object.values(categories) as { name, bgColor }}
			<span class='d-inline-block p-2' style={`background-color: ${bgColor};`}>{name}</span>
		{/each}
	</div>

	<ul>
		<li><code>{@html htmlPattern('x', '')}</code>, <code>{@html htmlPattern('y', '')}</code>, <code>{@html htmlPattern('u', '')}</code>, <code>{@html htmlPattern('v', '')}</code>: Arrays</li>
		<li><code>{@html htmlPattern('m', '')}</code>, <code>{@html htmlPattern('n', '')}</code>: Monadic functions</li>
		<li><code>{@html htmlPattern('d', '')}</code>, <code>{@html htmlPattern('e', '')}</code>: Dyadic functions</li>
		<li><code>{@html htmlPattern('a', '')}</code>: Monadic operators</li>
		<li><code>{@html htmlPattern('c', '')}</code>: Dyadic operators</li>
	</ul>

	<Input type='select' bind:value={dialectFilter}>
		<option value=''>No filter</option>
		{#each Object.entries(glyphs.dialects) as [val, { name }]}
			<option value={val}>{name}</option>
		{/each}
	</Input>

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
			{#each filteredGlyphs(glyphs, dialectFilter) as { glyph, meanings }}
				{#each meanings.entries() as [idx, [meaning, dialects]]}
					{@const category = patternToCategory(glyphs.meanings[meaning]?.patterns?.[0] ?? '')}
					<tr>
						{#if idx === 0}
							<th scope='row' rowspan={meanings.length} class='fw-normal'>
								{#if typeof glyph === 'string'}
									<code>{glyph}</code>
								{:else if glyph[1] === null}
									<code class='overstrike'>{glyph[0]}</code>&nbsp;(no Unicode equivalent)
								{:else}
									<code class='overstrike'>{glyph[0]}</code>&nbsp;(closest Unicode equivalent(s): {glyph[1]})
								{/if}
							</th>
						{/if}
						<td style={`background-color: ${categories[category]?.bgColor};`}>
							<!-- <span class='badge border me-1 border-primary text-primary bg-primary-subtle'>{glyphs.categories[glyphs.meanings[meaning]?.category]?.name}</span> -->
							{glyphs.meanings[meaning]?.name}
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
									<a href={url}>{glyphs.urls[type].name ?? type}</a>
								{/each}
							{/if}
						</td>
						<td>
							{#each dialects as dialect}
								<span class='badge border me-1 border-secondary text-secondary bg-secondary-subtle'>{glyphs.dialects[dialect]?.name}</span>
							{/each}
						</td>
					</tr>
				{/each}
			{/each}
		</tbody>
	</Table>
</div>

<style>
	@font-face {
		font-family: BQN386;
		src: url("https://dzaima.github.io/BQN386/BQN386.ttf");
	}
	:root {
		--bs-font-monospace: BQN386, 'BQN386 Unicode', APL385, APL333, 'Fira Code', monospace !important;
	}

	tbody th code {
		font-size: 2em;
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