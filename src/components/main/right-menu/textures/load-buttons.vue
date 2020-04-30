<template>
    <div class="group create">
    <div class="property property__button">
      <div class="button from-file">
        <span>Choose from file</span>
        <input
          type="file"
          id="texture"
          name="files[]"
          ref="texture"
          v-on:change="$s.textureManager.textureLoading($event)"
        />
      </div>
      <div class="button colorpicker">
        <span>Chose color</span>
        <input type="color" 
          value="#e66465"
          @change="colorSelected"
        >
      </div>
    </div>
  </div>
</template>

<script>
import $s from '@/components/store'

export default {
  computed: {
    manager: () => $s.textureManager
  },

  methods: {
    colorSelected(e) {
      this.manager.createColorTexture(e.target.value)
    },
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

  .create {
    .colorpicker {
      background: rgba(214, 109, 64, 1);
      border: none;
      height: 40px;
      position: relative;
      margin-top: 5px;
      &:hover > {
        .drop-down {
          display: block;
        }
      }
    }
    & > .button {
      display: block;
      width: 100%;
    }
  }
  .button {
    position: relative;
    background: rgba(214, 109, 64, 1);
    text-decoration: none;
    padding: 5px 0;
    box-sizing: border-box;
    border-radius: 5px;
    width: 100%;
    border: 1px solid rgba(0, 0, 0, 0.1);
    cursor: pointer;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    span {
      text-align: center;
      display: block;
      font-size: 14px;
      font-weight: 700;
      user-select: none;
      color: white;
      padding: 6px 8px;
      width: 100%;
    }
    input {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      opacity: 0;
      color: white;
    }
  }
</style>