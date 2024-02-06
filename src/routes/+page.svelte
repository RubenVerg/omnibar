<script lang='ts'>
	import glyphs from '$lib/glyphs';
	import type { Dialect, Glyphs } from '$lib/types';
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

	<div class='d-flex justify-content-center'>
		{#each Object.values(glyphs.categories) as { name, color }}
			<span class='d-inline-block p-2' style={`background-color: ${color};`}>{name}</span>
		{/each}
	</div>

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
				<th scope='col'>Meaning description</th>
				<th scope='col'>Meaning dialects</th>
			</tr>
		</thead>
		<tbody>
			{#each filteredGlyphs(glyphs, dialectFilter) as { glyph, meanings }}
				{#each meanings.entries() as [idx, [meaning, dialects]]}
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
						<td style={`background-color: ${glyphs.categories[glyphs.meanings[meaning]?.category]?.color};`}>
							<!-- <span class='badge border me-1 border-primary text-primary bg-primary-subtle'>{glyphs.categories[glyphs.meanings[meaning]?.category]?.name}</span> -->
							{glyphs.meanings[meaning]?.name}
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