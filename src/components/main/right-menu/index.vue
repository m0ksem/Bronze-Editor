<template>
  <div class="menu" v-if="engine">
    <div class="buttons group">
      <button :class="{'selected': selectedMenu === 'object'}" @click="select('object')">Объекты</button>
      <button :class="{'selected': selectedMenu === 'textures'}" @click="select('textures')">Текстуры</button>
      <button :class="{'selected': selectedMenu === 'lights'}" @click="select('lights')">Свет</button>
    </div>
    <Objects v-if="selectedMenu === 'object'"/>
    <Textures v-if="selectedMenu === 'textures'"/>
  </div>
</template>

<script>
import Objects from './objects'
import Textures from './textures'
import $s from '@/components/store'

export default {
  data() {
    return { doShowObjects: true, selectedMenu: 'object' }
  },
  computed: {
    $s: () => $s,
    engine: () => $s.$.engine,
    objects: () => $s.$.engine.objects
  },

  components: { Objects, Textures },

  methods: {
    select(name) {
      this.selectedMenu = name;
    }
  }
}
</script>

<style lang="scss" scoped>
  .menu {
    z-index: 99999999990;
  }
  .buttons {
    & > button {
      width: 33%;
      padding: 8px;
      background: rgba(255, 255, 255, 0.05);
      color: white;
      border: none;
      font-weight: bold;
      cursor: pointer;
      &.selected {
        background: rgba(255, 255, 255, 0.2);
      }
    }
  }
</style>