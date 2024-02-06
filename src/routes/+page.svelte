<script lang='ts'>
	import glyphs from '$lib/glyphs';
  import { Table } from '@sveltestrap/sveltestrap';
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
			{#each glyphs.glyphs as { glyph, meanings }}
				{#each meanings.entries() as [idx, [meaning, dialects]]}
					<tr>
						{#if idx === 0}
							<th scope='row' rowspan={meanings.length} class='fw-normal'>
								{#if typeof glyph === 'string'}
									<code>{glyph}</code>
								{:else if glyph[1] === null}
									<code class='overstrike'>{glyph[0]}</code>&nbsp;(no Unicode equivalent)
								{:else}
									<code class='overstrike'>{glyph[0]}</code>&nbsp;(closest Unicode equivalent(s): <code>{glyph[1]}</code>)
								{/if}
							</th>
						{/if}
						<td>
							<span class='badge border me-1 border-primary text-primary bg-primary-subtle'>{glyphs.categories[glyphs.meanings[meaning]?.category]?.name}</span>
							{glyphs.meanings[meaning]?.name}
						</td>
						<td>
							{glyphs.meanings[meaning]?.description ?? ''}
							{#if glyphs.meanings[meaning]?.urls}
								{#each glyphs.meanings[meaning].urls as url}
									<a class='ms-2' href={url}><i class='bi bi-box-arrow-up-right' /></a>
								{/each}
							{/if}
						</td>
						<td>
							{#each dialects as dialect}
								<span class='badge border me-1 border-success text-success bg-success-subtle'>{glyphs.dialects[dialect]?.name}</span>
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

	.overstrike {
		letter-spacing: -1ch;
	}

	.overstrike::after {
		letter-spacing: normal;
		content: ' ';
	}
</style>