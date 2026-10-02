<template>
  <header>
    <nav>
      <RouterLink :to="{ name: 'home' }">Home</RouterLink> |
      <RouterLink :to="{ name: 'artisti' }">Artisti</RouterLink> |
      <RouterLink :to="{ name: 'about' }">About</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
nav a.router-link-exact-active {
  font-weight: bold;
  color: deeppink;
}
</style>
