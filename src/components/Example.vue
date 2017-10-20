<template>
  <div class="example">

    <img src="../assets/it2g.png" alt="miro" class="miroImg">
    <h1>Add Visual Search to Your App or Project in <u>Minutes</u></h1>

    <!-- Customize autocomplete input using inputClass binding, `input-box-header` and  `input-box-footer` slot templates -->
    <!-- Customize suggestion item using suggestionClass binding and `suggestion` slot template -->
    <vue-elastic-autocomplete
      inputClass="ve-autocomplete-input"
      suggestionClass="ve-autocomplete-suggestion"
      @selected="onSelect">

      <template slot="input-box-header">
      </template>

      <template slot="input-box-footer">
        <i class="fa fa-search"></i>
      </template>

      <template slot="suggestion" slot-scope="{ suggestion }">
        {{ suggestion.text }} {{ suggestion.score }}
      </template>
    </vue-elastic-autocomplete>

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
