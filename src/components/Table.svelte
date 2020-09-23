<script>
    export let materials;
</script>
 
<div class="container">
    <table class='table'>
        <thead>
            <tr> 
                <th width='33%'>Name</th>
                <th>Url</th>
                <th width='100px'>Type</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
            {#each materials as {name, url, slug, type}}
                <tr>
                    <td width='33%'>
                        <a rel='prefetch' href="materials/{slug}">{name}</a>
                    </td>
                    <td>{url}</td>
                    <td width='100px'>{type}</td>
                </tr>
            {/each}
    </table>
</div>

<style>
    table {
        width: 100%;
        table-layout: fixed;
    }
    td {
        word-wrap:break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>