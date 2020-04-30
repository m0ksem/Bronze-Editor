<script>
import SelectTexturePopup from './select-texture-popup';

export default {
  props: ['object'],
  components: { SelectTexturePopup },

  methods: {
    showTexturePopup() {
      this.$refs['texture-popup'].show(this.object);
    }
  }
}
</script>

<template>
  <div class="group" v-if="object">
    <label class="group_name">Object properties</label>

    <div class="property">
      <div class="name">Name</div>
      <div class="value">
        <div class="input">
          <input type="text" v-model="object.name" @input="$emit('name-changed')" />
        </div>
      </div>
    </div>

    <div class="property">
      <div class="name">Position</div>
      <div class="value">
        <div class="inputs x3">
          <div class="row">
            <label>X</label>
            <div class="input"><input type="text" v-model="object.position.x" /></div>
          </div>
          <div class="row">
            <label>Y</label>
            <div class="input"><input type="text" v-model="object.position.y" /></div>
          </div>
          <div class="row">
            <label>Z</label>
            <div class="input"><input type="text" v-model="object.position.z" /></div>
          </div>
        </div>
      </div>
    </div>

    <div class="property">
      <div class="name">Scale</div>
      <div class="value">
        <div class="inputs x3">
          <div class="row">
            <label>X</label>
            <div class="input"><input type="text" v-model="object.scaling.x" /></div>
          </div>
          <div class="row">
            <label>Y</label>
            <div class="input"><input type="text" v-model="object.scaling.y" /></div>
          </div>
          <div class="row">
            <label>Z</label>
            <div class="input"><input type="text" v-model="object.scaling.z" /></div>
          </div>
        </div>
      </div>
    </div>

    <div class="property">
      <div class="name">Rotation</div>
      <div class="value">
        <div class="inputs x3">
          <div class="row">
            <label>X</label>
            <div class="input tips">
              <input type="text" v-model.lazy="object.rotation.x" />
              <span>degrees</span>
            </div>
          </div>
          <div class="row">
            <label>Y</label>
            <div class="input tips">
              <input type="text" v-model.lazy="object.rotation.y" />
              <span>degrees</span>
            </div>
          </div>
          <div class="row">
            <label>Z</label>
            <div class="input tips">
              <input type="text" v-model.lazy="object.rotation.z" />
              <span>degrees</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="group">
      <label class="group_name">Texture</label>
      <button @click="showTexturePopup">Select Texture</button>
      <SelectTexturePopup ref="texture-popup"/>
    </div>
  </div>
</template>