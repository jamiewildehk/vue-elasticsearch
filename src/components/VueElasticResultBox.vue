<template>
  <div class="ve-result-box">
    <slot name="result-header" :keyword="keyword" :fetching="fetching" :result="result"></slot>
    <slot name="result-content" :keyword="keyword" :fetching="fetching" :result="result"></slot>
  </div>
</template>

<script>
export default {
  name: 'VueElasticResultBox',
  props: {
    keyword: {
      type: String,
      default: '',
    },
    fetching: {
      type: Boolean,
      default: false,
    },
    result: {
      type: Object,
      default: () => {},
    },
  },
}
</script>

<style lang="scss" scoped>
  .ve-result-box {}
</style>
