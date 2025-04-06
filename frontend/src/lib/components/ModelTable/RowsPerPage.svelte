<script lang="ts">
	import { run } from 'svelte/legacy';

	import type { DataHandler } from '@vincjo/datatables/remote';
	import { m } from '$paraglide/messages';
	interface Props {
		handler: DataHandler;
	}

	let { handler }: Props = $props();
	const rowsPerPage = handler.getRowsPerPage();
	const rowCount = handler.getRowCount();
	const options = [5, 10, 20, 50, 100];

	const setRowsPerPage = () => {
		handler.setPage(1);
		handler.invalidate();
	};

	run(() => {
		if ($rowsPerPage && $rowCount?.start >= $rowCount?.total) {
			handler.setPage(Math.ceil($rowCount.total / $rowsPerPage));
		}
	});
</script>

<aside class="flex items-center">
	{m.show()}
	<select
		class="select bg-surface-50 w-fit mx-1"
		bind:value={$rowsPerPage}
		onchange={setRowsPerPage}
	>
		{#each options as option}
			<option value={option}>
				{option}
			</option>
		{/each}
	</select>
	{m.entries()}
</aside>
