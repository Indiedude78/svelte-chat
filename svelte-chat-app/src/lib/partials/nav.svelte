<script>
  import { Router, Link, Route } from "svelte-routing";
  import Home from "./../../routes/Home.svelte";
  import Chat from "./../../routes/Chat.svelte";

  export let url = "";
</script>

<Router {url}>
  <nav class="flex gap-4 w-fit justify-end p-2">
    <Link class="text-xl uppercase tracking-wider" to="/">Home</Link>
    <Link class="text-xl uppercase tracking-wider" to="/chat">Chat</Link>
  </nav>
  <Route path="/" component={Home} />
  <Route path="/chat" component={Chat} />
</Router>

<style>
</style>
