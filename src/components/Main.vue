<template>
  <div class="main">

    <img src="../assets/it2g.png" alt="miro" class="miroImg">
    <h1>Add Visual Search to Your App or Project in <u>Minutes</u></h1>

    <vue-elastic-search-box>
      <template slot="item" slot-scope="option">
        <article class="media">
          <figure class="media-left">
            <p class="image is-64x64">
              <img :src="option.thumbnail">
            </p>
          </figure>
          <p>
            <strong>{{ option.title }}</strong>
            <br>
            {{ option.description }}
          </p>
        </article>
      </template>
    </vue-elastic-search-box>

  </div>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
      msg: 'Main View'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
