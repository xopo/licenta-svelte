<script>
	import { materials } from '../../data';
	import Table from '../components/Table.svelte';
</script>

<svelte:head>
	<title>Licenta 20-21</title>
</svelte:head>

<!-- 
<figure>
	<img alt='Success Kid' src='successkid.jpg'>
	<figcaption>Have fun with Sapper!</figcaption>
</figure> -->

<Table {materials} />

<style>
</style>