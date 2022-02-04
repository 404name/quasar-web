<template>
  <div>
    <StandardLayout />
  </div>
</template>

<script>
import StandardLayout from './MyLayout'
export default {
  name: 'MainLayout',
  components: { StandardLayout },
  data() {
    return {}
  },
  methods: {},
  created: function () {
    this.layout = 'github'
  },
}
</script>

<style lang="sass" scoped>
</style>