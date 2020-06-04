<template>
  <div class="pain-point" style="left: -10px; top: -10px;">
    <!-- must render in x, y, and size s -->
    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" version="1.0">
      <g transform="translate(10, 10)"
         stroke="currentColor" stroke-linecap="round" stroke-dasharray="none" stroke-miterlimit="4" stroke-width="2" fill="none" stroke-linejoin="miter">
        <path :d="path"></path>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'PainPoint',
  props: {
    x: Number,
    y: Number,
  },
  computed: {
    path () {
      return '--/ -/- /  '.split('/').map(([a,b]) => `M${a}7,${b}7 L${a}2,${b}2`.replace(/ /g, '')).join(' ')
    },
  }
}
</script>

<style scoped lang="scss">
.pain-point {
  position: absolute;
  top: 0;
  pointer-events: none;
}
</style>
