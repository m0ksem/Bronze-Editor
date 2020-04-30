<template>
  <div class="textures" v-if="textures">
    <loadButtons/>

    <div class="group" v-if="colorTexture.length > 0">
      <div class="property property__button">
        <div class="color" v-for="texture in colorTexture" :key="texture.id">
          <div class="color-img" :style="{'background-color': `rgba(${texture.color.join(',')})`}"></div> 
          <button v-on:click="deleteTexture(texture)" class="delete">X</button>
        </div>
       
      </div>
    </div>
  
    <div class="group" v-if="imageTexture.length > 0">
      <div class="property property__button image" v-for="texture in imageTexture"  :key="texture.id" >
        <div class="image" v-html="texture.image.outerHTML" />
        <button v-on:click="deleteTexture(texture)" class="delete">X</button>
      </div>
    </div>
  </div>
</template>

<script>
import $s from '@/components/store'
import loadButtons from './load-buttons';

export default {
  components: { loadButtons },
  data() {
    return { doShowObjects: true,}
  },
  computed: {
    $s: () => $s,
    textures: () => $s.$.engine.textures,
    colorTexture: () => $s.$.engine.textures.filter((texture) => !texture.image),
    imageTexture: () => $s.$.engine.textures.filter((texture) => texture.image),
  },

  methods: {
    deleteTexture(texture) {
      $s.$.engine.textures.splice($s.$.engine.textures.indexOf(texture), 1);
    }
  }
}
</script>

<style lang="scss" scoped>
  .property {
    .delete {
      background: rgba(255, 255, 255, 0.1);
      color: white;
      border: none;
      padding: 8px;
      cursor: pointer;
      height: 36px;
      width: 36px;
    }
    .color {
      margin-right: 6px;;
      .color-img {
        height: 36px;
        width: 36px;
      }
      display: inline-block;
    }
    &.image {
      .delete {
        width: 100%;
        background: rgba(255, 255, 255, 0.1);
        color: white;
        border: none;
        padding: 8px;
        cursor: pointer;
      }
    }
  }

</style>

<style lang="scss">
  .textures {
    .image {
      display: block;
      text-align: center;
      img {
        max-height: 124px;
        max-width: 100%;
      }
    }
  }
</style>
