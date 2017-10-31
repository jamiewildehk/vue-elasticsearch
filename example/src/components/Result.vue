<template>
  <div class="result">

    <router-link :to="{ name: 'Example' }">Back</router-link>

    <h1>Result for {{ $route.params.keyword }}</h1>

  </div>
</template>

<script>
export default {
  name: 'Result',
  data () {
    return {
      msg: 'Result View'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
