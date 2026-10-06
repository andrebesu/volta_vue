<script>
export default {
  name: 'AsideBox',
}
</script>

<template>
  <div class="volta-aside">
    <h3><slot name="titolo">Info</slot></h3>
    <slot />
  </div>
</template>

<style scoped>
h3 {
  font-size: 1.6rem;
}
</style>
