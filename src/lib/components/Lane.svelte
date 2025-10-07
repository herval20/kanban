<script>
  import IssueCard from './IssueCard.svelte';
  import { issues } from '$lib/stores';
  export let name;
  $: laneIssues = $issues.filter(i => i.lane === name);
</script>

<div class="bg-purple-50 rounded p-3 min-h-[200px] flex flex-col">
  <h2 class="font-bold text-purple-700 mb-2 text-center">{name}</h2>
  {#each laneIssues as issue (issue.id)}
    <IssueCard {issue} />
  {/each}
  {#if laneIssues.length === 0}
    <p class="text-gray-400 text-sm text-center mt-5 flex-1">Keine Issues</p>
  {/if}
</div>
