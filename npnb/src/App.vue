<template>
  <div id="app">
    <div class="config">
      <div class="field" v-for="k in Object.keys(cfg)" :key="k">
        {{k}}: <input v-model="cfg[k]" :placeholder="k" :title="k" >
      </div>
      <button @click="saveToLocalStorage()">SAVE to LS</button>
      ---------
      <button @click="restoreFromLocalStorage()">reload from LS</button>
      ---------
      <button @click="dropLocalDB()">DROP LOCAL DB !!!!!</button>
    </div>
    <div class="controls">
      <button @click="savePainPoint(pain)">SAVE</button>
      -----------------
      <button @click="triggerSync()">Sync</button>
      <br/>
      <br/>
      <button v-for="(im,i) in images" :key="i" :class="{current: i==currentImage}" @click="currentImage = i">{{im.name}}</button>
    </div>
    <div class="clickable-image"> <!-- future component root, maybe -->
      <img :src="images[currentImage].url" ref="forMouse"
          @click.prevent="setPainLocation($event)"
          @mousemove="(ev) => { if (ev.buttons & 1) setPainLocation(ev) }" @dragstart.prevent="">
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
    [DB]() { // if DB=logs, this makes this.logs be the result from a (live) query on the "logs" database
      return {
        user: this.cfg.user
      }
    },
  },
  data: () => ({
    cfg: {
      remoteSyncURL: '',
      user: 'test',
    },
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
  mounted () {
    this.restoreFromLocalStorage()
    window.debug_pouch = this.$pouch
  },
  methods: {
    restoreFromLocalStorage () {
      try {
        Object.assign(this.cfg, JSON.parse(localStorage.getItem('npnb')))
      } catch (e) { window.debug_exc = e; }
    },
    saveToLocalStorage () {
      localStorage.setItem('npnb', JSON.stringify(this.cfg))
    },
    setPainLocation (ev) {
      // this.pain.x = ev.offsetX // still experimental but so convenient with CSS transform
      let e = this.$refs.forMouse
      let dim = e.getBoundingClientRect()
      this.pain.x = (ev.clientX - dim.left) // / dim.width
      this.pain.y = (ev.clientY - dim.top) // / dim.height
      this.pain.imId = this.currentImageId
    },
    async savePainPoint (p) {
      let _id = this.cfg.user + ':' + Date.now()
      let user = this.cfg.user
      await this.$pouch.put({...p, user, _id}, {}, DB)
      this.pain.imId = null
    },
    triggerSync (live=false) {
      this.$pouch.sync(DB, this.cfg.remoteSyncURL, {live})
    },
    async dropLocalDB () {
      this.$pouch.destroy(DB)
      window.location += ''
    }
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
.config {
  background: darkslategray;
  color: white;
  overflow: hidden;
  height: auto;
  &:focus-within {
    transition: all linear 600ms;
  }
  &:not(:focus-within) {
    height: 10px;
    filter: blur(10px);
  }

  .field {
    display: flex;
    margin-left: 1em;
    >input {
      margin-left: 1em;
      flex-grow: 1;
    }
  }
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
    user-select: none;
  }
}
</style>
