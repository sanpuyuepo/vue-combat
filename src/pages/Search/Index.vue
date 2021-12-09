<template>
  <div>
    <h1>param: {{keyword}}</h1>
    <h1>query: {{k}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data() {
    return {

    }
  },
  props: ['keyword', 'k']
}

</script>

<style scoped>

</style>