<script>
  import { drawerStore } from "@skeletonlabs/skeleton";

  let username = "";
  let password = "";
  let isAdmin = false;

  const savePerson = async () => {
    const user = { id: 221, username, password, isAdmin };
    console.log(user);
    const response = await fetch("/api/people", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });
    drawerStore.close();
  };
</script>

<div class="container mx-auto p-4 relative">
  <label class="label mb-2">
    Username: <input class="input" type="text" bind:value={username} />
  </label>
  <label class="label mb-2">
    Password: <input class="input" type="password" bind:value={password} />
  </label>
  <label class="label mb-2">
    Is Admin:
    <select class="input" bind:value={isAdmin}>
      <option value={false}>No</option>
      <option value={true}>Yes</option>
    </select>
  </label>
  <button
    class="btn variant-outline-secondary mt-4 absolute"
    on:click={savePerson}>Save</button
  >
</div>
