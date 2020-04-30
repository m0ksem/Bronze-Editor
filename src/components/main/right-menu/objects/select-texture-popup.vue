<template>
  <div class="popup" v-if="doShow">
    <label class="group_name">Select Texture</label>
    <button class="close" @click="doShow = false">X</button>
    <loadButtons/>
    <div class="group">
      <label class="group_name">Color textures</label>
      <div class="color-texture" v-for="texture in colorTextures"
         :key="texture.id"
          @click="selectTexture(texture)" 
        >
        <div class="color" :style="{'background': `rgba(${texture.color.join(',')})`}"></div>
      </div>
    </div>

     <div class="group">
      <label class="group_name">Image textures</label>
      <div class="image-texture" 
        v-for="texture in imageTextures" 
        :key="texture.id" 
        v-html="texture.image.outerHTML"
        @click="selectTexture(texture)"
        >
      </div>
    </div>
  </div>
</template>

<script>
import $s from '@/components/store'
import loadButtons from '../textures/load-buttons'

export default {
  components: { loadButtons },
  data() {
    return { doShow: false, object: null }
  },
  computed: {
    $s: () => $s,
    textures: () => $s.$.engine.textures,
    colorTextures: () => $s.$.engine.textures.filter((texture) => !texture.image),
    imageTextures: () => $s.$.engine.textures.filter((texture) => texture.image),
    manager: () => $s.textureManager
  },

  methods: {
    show(object) {
      this.doShow = true;
      this.object = object;
    },
    selectTexture(texture) {
      this.object.setTexture(texture);
      this.doShow = false;
    }
  }
}
</script>

<style lang="scss" scoped>
  .popup {
    position: fixed;
    background: rgb(44, 44, 44);
    top: 50%;
    left: 50%;
    width: 70%;
    height: 60%;
    transform: translateX(-50%) translateY(-50%);
    padding: 18px;
    .close {
      position: absolute;
      right: 32px;
      top: 16px;
      background: rgb(226, 76, 76);
      border: none;
      color: white;
      padding: 8px;
      width: 32px;
      cursor: pointer;
    }
    .color-texture {
      display: inline-block;
      .color {
        width: 48px;
        height: 48px;
        position: relative;
        cursor: pointer;
        &:hover {
          &::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
  }
</style>

<style lang="scss">
  .image-texture {
    display: inline-block;
    position: relative;
    cursor: pointer;
    &:hover {
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 100%;
        left: 0;
        background: rgba(255, 255, 255, 0.1);
      }
    }
    img {
      max-height: 128px;
      margin-right: 16px;
    }
  }
</style>
