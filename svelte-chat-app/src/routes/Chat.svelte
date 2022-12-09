<script>
  import { io } from "socket.io-client";
  import { onMount } from "svelte";

  let name = localStorage.getItem("name") || "";
  let msg = "";
  let messages = [];
  const socket = io("http://localhost:3000");
  let sessionId = null;

  $: console.log(messages);

  socket.on("connect", () => {
    sessionId = socket.id;
    socket.emit("join", { name: name, sessionId: sessionId });
  });

  socket.on("getMessage", ({ ...data }) => {
    addMessage({ ...data });
  });

  function addMessage(msg) {
    messages = [...messages, msg];
  }

  function sendMessage() {
    console.log("sending message");
    if (msg != "") {
      socket.emit("message", {
        message: msg,
        name: name,
        sessionId: sessionId,
      });
      msg = "";
    }
  }
  onMount(() => {
    if (name == "") {
      window.location.href = "/";
    }
  });
</script>

{#if name != ""}
  <div class="w-full view-container">
    <h1 class="text-center">Socket IO Chat App</h1>
    <div class="chat-container mt-4 w-full">
      <ul class="flex flex-col w-4/5 m-auto">
        {#each messages as message}
          {#if message.sessionId != sessionId}
            <li class="justify-start">
              <p class="font-bold">{message.name}</p>
              <p
                class="p-4 mt-2 bg-gray-600 text-white text-left w-1/3 message-box"
              >
                {message.message}
              </p>
            </li>
          {:else}
            <li class="">
              <p class="font-bold w-fit ml-auto">{message.name}</p>
              <p
                class="p-4 mt-2 ml-auto bg-blue-300  text-left w-1/3 message-box"
              >
                {message.message}
              </p>
            </li>
          {/if}
        {/each}
      </ul>

      <div class="text-form-container">
        <form on:submit|preventDefault>
          <input
            class="p-3 w-4/5"
            type="text"
            placeholder="Type a message"
            bind:value={msg}
          />
          <button class="p-3 w-1/5 text-xl font-bold" on:click={sendMessage}
            >Send</button
          >
        </form>
      </div>
    </div>
  </div>
{/if}

<style>
  .view-container {
    max-width: -webkit-fill-available;
  }

  .text-form-container form {
    position: fixed;
    bottom: 2%;
    left: 2%;
    right: 2%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .text-form-container input[type="text"] {
    border: 1px solid #ccc;
  }

  .text-form-container input[type="text"]:focus {
    border: 1px solid #333;
  }

  .text-form-container button {
    background-color: #9acc52;
    -webkit-transition: background-color 1000ms linear;
    -ms-transition: background-color 1000ms linear;
    transition: all 300ms linear;
  }

  .text-form-container button:hover {
    background-color: #4a8204;
    color: white;
  }

  .message-box {
    border-radius: 25px;
  }
</style>
