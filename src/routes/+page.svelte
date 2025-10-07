<script>
  import Lane from '$lib/components/Lane.svelte';
  import NewIssueDialog from '$lib/components/NewIssueDialog.svelte';
  import { lanes } from '$lib/stores';
  let showDialog = false;
</script>

<div class="p-5 min-h-screen bg-purple-100 flex flex-col items-center justify-center">
  <header class="flex justify-between w-full max-w-5xl mb-5">
    <h1 class="text-2xl font-bold text-purple-700">Kanban Board</h1>
    <button class="px-3 py-1 bg-purple-600 text-white rounded" on:click={()=>showDialog=true}>+ Neues Issue</button>
  </header>

  <div class="flex gap-4 w-full max-w-5xl">
    {#each lanes as lane}
      <Lane name={lane} />
    {/each}
  </div>

  <NewIssueDialog bind:open={showDialog} />
</div>
