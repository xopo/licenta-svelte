<script context="module">
    export async function preload({params: { slug }}) {
        const response = await this.fetch(`materials/${slug}.json`);
        const data = await response.json();

        if ( response.status === 200) {
            return { data }
        } else {
            this.error(response.status, data.message)
        }
    }
</script>

<script>
    export let data;
    const {pages, file, name, slug, type, url} = data;
</script>


<svelte:head>
    <title>{name}</title>
</svelte:head>

{#if type === 'pdf'}
    <object title={name} aria-label={slug} data="{file}" type="application/pdf" width="100%" height="100%"></object>
    <!-- <embed src=”/pdf/sample-3pp.pdf#page=2" type=”application/pdf” width=”100%” height=”100%”> -->
{:else if type === 'images'}
    <div class='image-container'>
    {#each pages as page,index }
        <img src={page} alt="page/{index}">
    {/each}
    </div>
{/if}

<style>
    .image-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;;
    }
</style>