<template>
  <div>
    <ul>
      <li>
        <label>File</label>
        <ul>
          <label>Project</label>
          <li>Save</li>
          <li>Load project</li>
          <label>Export</label>
          <li>Export as JS</li>
          <li>Export as JSON</li>
        </ul>
    </li>
      <li>
        <label>Objects</label>
        <ul>
          <label>New Object</label>
          <li><input type="file" id="files" name="files[]" multiple ref="files" accept=".obj" v-on:change="this.objectLoading"/>Load from file</li>
          <li v-on:click="loadExampleObject">Load example</li>
          <label>Simple geometry</label>
          <li>Create Rect</li>
          <li>Create Cube</li>
        </ul>
      </li>
      <li>
        <label>Camera</label>
        <ul>
          <label>Set camera</label>
          <li>
            Set default camera <span class="arrow">></span>
            <ul>
              <li v-on:click="setCameraMode('fps')">FPS camera</li>
              <li v-on:click="setCameraMode('moba')">MOBA camera</li>
              <li v-on:click="setCameraMode('top')">Top view camera</li>
            </ul>
          </li>
          <li>Load camera from JSON</li>
          <li>Create camera with JS</li>
          <label>Settings</label>
          <li>Camera settings</li>
          <label>Controls</label>
          <li>Change control function</li>
          <li>
            Set default contorls <span class="arrow">></span>
            <ul>
              <li>Shooter controls</li>
              <li>MOBA controls</li>
              <li>Platformers controls</li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <label>Info</label>
        <ul>
          <label>Help</label>
          <li>About</li>
          <li>Help</li>
          <li>Contact</li>
          <label>Info</label>
          <li><p>Editor version</p> <span class="right">0.0.001.3 dev</span></li>
          <li><p>Engine version</p> <span class="right">0.0.002.51 dev</span></li>
          <label>Update</label>
          <li>Update Engine</li>
          <li>Update Editor</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import DeerObj from '@/assets/deer.obj'
import * as Bronze from '@m0ksem/bronze'
import $s from './store';

export default {
  name: 'Menu',
  data () {
    return {
      engine: this.$parent.engine
    }
  },
  computed: {
    $s: () => $s,
  },
  methods: {
    setCameraMode (mode) {
      let camera = this.$parent.engine.camera
      switch (mode) {
        case 'fps':
          camera.setRotation(0, 0, 0)
          camera.setPosition(0, 800, 1500)
          break
        case 'moba':
          camera.setRotation(-45, 0, 0)
          camera.setPosition(0, 2000, 750)
          break
        case 'top':
          camera.setRotation(-90, 0, 0)
          camera.setPosition(0, 2500, 0)
          break
      }
    },
    addObjectFromFile (objectText, filePath) {
      this.$s.objectsManager.addObject(objectText, filePath);
    },
    loadExampleObject () {
      this.$s.objectsManager.addObject(DeerObj, 'Deer');
    },
    objectLoading (event) {
      let file = event.target.files[0]
      let CHUNK_SIZE = 1024
      let offset = 0
      let fr = new FileReader()
      let text = ''
      fr.onload = () => {
        text += fr.result
        offset += CHUNK_SIZE
        seek(text)
      }

      let vue = this
      let objLoaded = (text) => {
        vue.addObjectFromFile(text, file.name)
        vue.$data.selectedObjectName = file.name
        vue.$data.fileText = text
      }

      let seek = (text) => {
        if (offset >= file.size) {
          objLoaded(text)
          return
        }
        var slice = file.slice(offset, offset + CHUNK_SIZE)
        fr.readAsText(slice)
      }

      seek(text)
    },
  }
}
</script>

<style lang="sass">
  li
    position: relative
    padding: 0 8px
    box-sizing: border-box
    color: rgba(255, 255, 255, 0.8)
    cursor: pointer
    white-space: nowrap
    text-align: left
    display: table
    input
      opacity: 0
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
    label
      cursor: pointer
      display: table-cell
    p
      display: table-cell
      margin: 0
      padding: 0
    span
      color: rgba(255, 255, 255, 0.5) !important
    .right
      display: table-cell
      width: 100%
      text-align: right
      padding-left: 8px
    .arrow
      float: right
    &:hover
      color: rgba(255, 255, 255, 1)
  ul
    list-style: none
    padding: 0
    margin: 0
    & > li
      display: inline-block
      &:hover
        background: rgba(0, 0, 0, 0.5)
        & > ul
          display: block
      & > ul
        position: absolute
        line-height: 22px
        font-weight: 100
        top: 100%
        left: 0
        z-index: 1000000
        background: rgba(0, 0, 0, 0.5)
        display: none
        padding: 0 0 8px 0
        label
          display: block
          padding: 8px 8px 0 8px
          color: rgba(255, 255, 255, 0.5)
          font-weight: 100
        & > li
          cursor: pointer
          display: block
          position: relative
          &:hover
            background: none
          & > ul
            position: absolute
            left: 100%
            top: -8px
            padding: 8px
</style>
