<script>
  import { issues } from '$lib/stores';
  import { v4 as uuidv4 } from 'uuid';
  export let open = false;

  let title = '';
  let description = '';
  let dueDate = '';
  let storyPoints = 1;
  let priority = 'Medium';

  function closeDialog() {
    open = false;
    title = description = dueDate = '';
    storyPoints = 1;
    priority = 'Medium';
  }

  function saveIssue() {
    if (!title.trim() || !dueDate) {
      alert('Title und Due-Date sind Pflicht!');
      return;
    }
    issues.update(arr => [
      ...arr,
      { id: uuidv4(), title, description, dueDate, storyPoints, priority, lane: 'Do' }
    ]);
    closeDialog();
  }
</script>

{#if open}
<div class="fixed inset-0 bg-black/30 flex justify-center items-center z-50">
  <div class="bg-white rounded p-6 w-full max-w-md">
    <h2 class="text-xl font-bold mb-4">Neues Issue</h2>
    <input type="text" placeholder="Titel" bind:value={title} class="border p-2 rounded w-full mb-2" />
    <textarea placeholder="Beschreibung" bind:value={description} class="border p-2 rounded w-full mb-2"></textarea>
    <input type="date" bind:value={dueDate} class="border p-2 rounded w-full mb-2" />
    <input type="number" bind:value={storyPoints} min="1" class="border p-2 rounded w-full mb-2" />
    <select bind:value={priority} class="border p-2 rounded w-full mb-4">
      <option>Low</option>
      <option>Medium</option>
      <option>High</option>
    </select>
    <div class="flex justify-end gap-2">
      <button class="px-3 py-1 bg-gray-200 rounded" on:click={closeDialog}>Abbrechen</button>
      <button class="px-3 py-1 bg-purple-600 text-white rounded" on:click={saveIssue}>Speichern</button>
    </div>
  </div>
</div>
{/if}
