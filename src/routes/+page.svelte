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

	<Table>
		<thead>
			<tr>
				<th scope='col'>Glyph</th>
				<th scope='col'>Glyph name</th>
				<th scope='col'>Meaning name</th>
				<th scope='col'>Meaning description</th>
				<th scope='col'>Meaning dialects</th>
			</tr>
		</thead>
		<tbody>
			{#each glyphs.glyphs as { glyph, name: glyphName, meanings }}
				{#each meanings.entries() as [idx, { name, description, category, dialects, urls }]}
					<tr>
						{#if idx === 0}
							<th scope='row' rowspan={meanings.length}>
								{#if typeof glyph === 'string'}
									<code>{glyph}</code>
								{:else if glyph[1] === null}
									<code class='overstrike'>{glyph[0]}</code>&nbsp;(no Unicode equivalent)
								{:else}
									<code class='overstrike'>{glyph[0]}</code>&nbsp;(closest Unicode equivalent(s): <code>{glyph[1]}</code>)
								{/if}
							</th>
							<td rowspan={meanings.length}>{glyphName}</td>
						{/if}
						<td>
							<span class='badge border me-1 border-primary text-primary bg-primary-subtle'>{glyphs.categories[category]?.name}</span>
							{name}
						</td>
						<td>
							{description ?? ''}
							{#if urls}
								{#each urls as url}
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
	code, pre {
		font-family: BQN386, 'BQN386 Unicode', APL385, APL333, 'Fira Code', monospace !important;
	}

	.overstrike {
		letter-spacing: -1ch;
	}

	.overstrike::after {
		letter-spacing: normal;
		content: ' ';
	}
</style>