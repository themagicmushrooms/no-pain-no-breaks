<template>
  <div id="app">
    <div class="controls">
      <button v-for="(im,i) in images" :key="i" :class="{current: i==currentImage}" @click="currentImage = i">{{im.name}}</button>
      <br/>
      <button @click="savePainPoint(pain)">SAVE</button>
    </div>
    <div class="clickable-image"> <!-- future component root, maybe -->
      <img :src="images[currentImage].url" ref="forMouse" draggable="false"
          @click.prevent="setPainLocation($event)"
          @mousemove="(ev) => { if (ev.buttons & 1) setPainLocation(ev) }">
          <div v-for="(p,i) in oldPointsOnCurrentImage" :key="i" class="pp old" :style="{left: p.x+'px', top: p.y+'px'}"><pain-point></pain-point></div>
          <div class="pp" :style="{left: pain.x+'px', top: pain.y+'px'}" v-if="currentImageId == pain.imId"><pain-point></pain-point></div>
    </div>
  </div>
</template>

<script>

import PainPoint from './components/PainPoint.vue'

let DB = 'logs'

export default {
  name: 'App',
  components: {
    PainPoint,
  },
    pouch: {
    [DB]: {}, // if DB=logs, this makes this.logs be the result from a (live) query on the "logs" database
  },
  data: () => ({
    user: 'test', // TODO: load/save from local storage
    pain: {
      x: 100,
      y: 20,
      imId: 'front',
    },
    currentImage: 0,
    images: [
      {
        id: 'front',
        name: 'face',
        url: 'images/full_0.jpg',
      },
      {
        id: 'back',
        name: 'dos',
        url: 'images/full_1.jpg',
      }
    ],
  }),
  computed: {
    currentImageId () {
      return this.images[this.currentImage].id
    },
    oldPointsOnCurrentImage () {
      if (this.logs == null) return []
      return this.logs.filter(l => l.imId == this.currentImageId)
    },
  },
  methods: {
    setPainLocation (ev) {
      // this.pain.x = ev.offsetX // still experimental but so convenient with CSS transform
      let e = this.$refs.forMouse
      let dim = e.getBoundingClientRect()
      this.pain.x = (ev.clientX - dim.left) // / dim.width
      this.pain.y = (ev.clientY - dim.top) // / dim.height
      this.pain.imId = this.currentImageId
    },
    async savePainPoint (p) {
      let _id = this.user + ':' + Date.now()
      await this.$pouch.put({...p, _id}, {}, DB)
    },
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.clickable-image {
  position: relative; /* make it positioned */
  display: inline-block;
  padding: 0;
  .pp {
    position: absolute;
    color: blue;
    &.old {
      color: black;
    }
  }

  user-select: none;
  cursor: crosshair;
  margin: 50px;

  img {
    border: 1px solid #EEE;
  }
}
</style>
