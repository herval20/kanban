<script>
  export let issue;
</script>

<div class="bg-white rounded p-3 mb-2 border-l-4 border-purple-500">
  <h3 class="font-bold">{issue.title}</h3>
  <p class="text-gray-700 text-sm">{issue.description}</p>
  <div class="flex justify-between text-sm text-gray-600 mt-2">
    <span>Due: {issue.dueDate}</span>
    <span>SP: {issue.storyPoints}</span>
    <span>{issue.priority}</span>
  </div>
</div>
