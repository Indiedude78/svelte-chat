<script>
  let name = "";

  function saveName() {
    localStorage.setItem("name", name);
    window.location.href = "/chat";
  }
</script>

<h1 class="text-center uppercase">Enter your name</h1>
<form
  class="flex flex-row items-center gap-2 w-2/3 h-40 m-auto"
  on:submit|preventDefault
>
  <input
    class="p-3 w-4/5 border-2 h-fit border-black"
    type="text"
    placeholder="Type your name"
    bind:value={name}
  />
  <button
    class="p-3 w-1/5 h-fit text-xl border-2 border-green-200 bg-green-500 text-white font-bold hover:bg-white hover:text-green-500"
    on:click={saveName}>Confirm</button
  >
</form>

<style>
  input,
  button {
    border-radius: 25px;
  }
</style>
