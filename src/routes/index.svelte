<script>
	import { materials } from '../../data';
	import Table from '../components/Table.svelte';
	import Upload from '../components/Upload.svelte';

	let formOpen = true;
</script>

<svelte:head>
	<title>Licenta 20-21</title>
</svelte:head>

{#if formOpen}
	<div class="upload">
		<Upload bind:formOpen/>
	</div>
{/if}
<div class="showForm">
	<button 
		diabled={formOpen}
		class="button"
		on:click={() => formOpen = true}
	>Add new document</button>
</div>
<Table {materials} />

<style>
	.showForm {
		display: flex;
		justify-content: flex-end;
	}
	.upload {
		position: absolute;
		right: 0;
		background: white;
		z-index: 1;
		width: 640px
	}
</style>