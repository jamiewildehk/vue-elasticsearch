<template>
  <div class="example">

    <img src="../assets/it2g.png" alt="miro" class="miroImg">
    <h1>Add Visual Search to Your App or Project in <u>Minutes</u></h1>

    <vue-elastic-search-box @selected="onSelect"></vue-elastic-search-box>

  </div>
</template>

<script>
export default {
  name: 'Example',
  data () {
    return {
      msg: 'Example View'
    }
  },
  methods: {
    onSelect (keyword) {
      console.log('keyword', keyword)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
