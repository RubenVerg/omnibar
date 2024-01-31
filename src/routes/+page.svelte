<script lang='ts'>
	import glyphs from '$lib/glyphs';
  import { Table } from '@sveltestrap/sveltestrap';
</script>

<div class='container my-4'>
	<Table>
		<thead>
			<th scope='col'>Glyph</th>
			<th scope='col'>Glyph name</th>
			<th scope='col'>Meaning name</th>
			<th scope='col'>Meaning description</th>
			<th scope='col'>Meaning dialects</th>
		</thead>
		<tbody>
			{#each Object.entries(glyphs.glyphs) as [glyph, { name: glyphName, meanings }]}
				{#each meanings.entries() as [idx, { name, description, category, dialects, urls }]}
					<tr>
						{#if idx === 0}
							<th scope='row' rowspan={meanings.length}><code class='overstrike'>{glyph}</code></th>
							<td rowspan={meanings.length}>{glyphName}</td>
						{/if}
						<td>
							<span class='badge border me-1 border-primary text-primary bg-primary-subtle'>{glyphs.categories[category]?.name}</span>
							{name}
						</td>
						<td>
							{description}
							{#if urls}
								{#each urls as url}
									<a class='ms-2' href={url}><i class='bi bi-box-arrow-up-right'></i></a>
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