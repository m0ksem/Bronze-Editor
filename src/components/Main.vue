<template>
  <div class="editor">
    <div class="top">
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
    <div class="mid">
      <div class="main">
        <canvas ref="canvas"></canvas>
      </div>
      <div class="menu">
        <div class="group">
          <label class="group_name">Objects</label>
          <label class="tip" v-if="this.$data.engine.objects.length == 0">
            There are no objects now
          </label>
          <div v-for="object in engine.objects" v-on:click="objectSelect(object)" class="objects property property__button" :key="object.id">
            <div class="name">
              <span>{{ object.name }}</span>
            </div>
            <button v-on:click="deleteObject(object)" class="delete">X</button>
          </div>
        </div>

        <div v-show="objectSelected" class="group">
          <label class="group_name">Object properties</label>

          <div class="property" v-if="selectedObject">
            <div class="name">
              Name
            </div>
            <div class="value">
              <div class="input">
                <input type="text" v-model="selectedObject.name">
              </div>
            </div>
          </div>

          <div class="property property__button">
            <div class="name">
              Texture
            </div>
            <div class="value">
              <div class="button">
                <span>Choose from file</span>
                <input type="file" id="texture" name="files[]" ref="texture" v-on:change="this.textureLoading"/>
              </div>
            </div>
          </div>

           <div class="property" v-if="selectedObject">
            <div class="name">
              Position
            </div>
            <div class="value">
              <div class="inputs x3">
                <div class="row">
                  <label>X</label>
                  <div class="input">
                    <input type="text" v-model="selectedObject.position[0]">
                  </div>
                </div>
                <div class="row">
                  <label>Y</label>
                  <div class="input">
                    <input type="text" v-model="selectedObject.position[1]">
                  </div>
                </div>
                <div class="row">
                  <label>Z</label>
                  <div class="input">
                    <input type="text" v-model="selectedObject.position[2]">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="property" v-if="selectedObject">
            <div class="name">
              Scale
            </div>
            <div class="value">
              <div class="inputs x3">
                <div class="row">
                  <label>X</label>
                  <div class="input">
                    <input type="text" v-model="selectedObject.scaling[0]">
                  </div>
                </div>
                <div class="row">
                  <label>Y</label>
                  <div class="input">
                    <input type="text" v-model="selectedObject.scaling[1]">
                  </div>
                </div>
                <div class="row">
                  <label>Z</label>
                  <div class="input">
                    <input type="text" v-model="selectedObject.scaling[2]">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="property" v-if="selectedObject">
            <div class="name">
              Rotation
            </div>
            <div class="value">
              <div class="inputs x3">
                <div class="row">
                  <label>X</label>
                  <div class="input tips">
                    <input type="text" v-model.lazy="rotation[0]">
                    <span>degrees</span>
                  </div>
                </div>
                <div class="row">
                  <label>Y</label>
                  <div class="input tips">
                    <input type="text" v-model.lazy="rotation[1]">
                    <span>degrees</span>
                  </div>
                </div>
                <div class="row">
                  <label>Z</label>
                  <div class="input tips">
                    <input type="text" v-model.lazy="rotation[2]">
                    <span>degrees</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- <div class="property file_text" v-if="selectedObject">
            {{ fileText }}
          </div> -->
        </div>

        <!-- <div class="group">
          <label class="group_name">Save</label>
          <div class="property property__button">
            <div class="name">
              Save file:
            </div>
            <div class="value">
              <div class="button" v-on:click="saveObjects">
                <span>Save object</span>
              </div>
            </div>
          </div>
        </div> -->

      </div>
    </div>
  </div>
</template>

<script>
import * as Bronze from '@m0ksem/bronze'
import DeerObj from '@/assets/deer.obj'

export default {
  name: 'Main',
  data () {
    return {
      engine: {objects: []},
      selectedObject: null,
      objectSelected: false,
      selectedObjectName: '',
      rotation: [0, 0, 0],
      fileText: ''
    }
  },
  mounted () {
    this.setupEngine()
    this.setupCamera()
    this.setupControls()
    this.$data.engine.run()
  },
  methods: {
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
    textureLoading (event) {
      let files = event.target.files
      let reader = new FileReader()
      let vue = this
      if (!files[0].type.match('image.*')) {
        alert('Bad image format')
      } else {
        reader.onload = (function (theFile) {
          return function (e) {
            let texture = new Bronze.Texture(e.target.result)
            vue.$data.engine.bindTexture(texture)
            vue.$data.selectedObject.setTexture(texture)
          }
        })(files[0])
      }
      reader.readAsDataURL(files[0])
    },
    addObjectFromFile (objectText, filePath) {
      let object = new Bronze.Object(this.$data.engine)
      object.setPosition(0, 0, 0)
      object.compile(objectText)
      object.filePath = filePath
      let name = filePath.replace('.obj', '')
      name = name.charAt(0).toUpperCase() + name.slice(1)
      let index = 1
      this.$data.engine.objects.forEach(o => {
        if (!(o === object) && (o.name === name)) {
          let objectsCount = parseInt(o.name.charAt(name.length - 1))
          if (isNaN(objectsCount)) {
            objectsCount = 1
          }
          o.name = o.name + (objectsCount)
          name = name + (objectsCount + 1)
        }
        if (!(o === object) && (o.name === name + index)) {
          index += 1
        }
        if (!(o === object) && (o.name === name + 1)) {
          index += 1
        }
      })
      if (index !== 1) {
        name = name + index
      }
      object.name = name
    },
    loadExampleObject () {
      let object = new Bronze.Object(this.$data.engine)
      object.setPosition(0, 0, 0)
      object.compile(DeerObj)
      let name = 'Deer'
      let index = 1
      this.$data.engine.objects.forEach(o => {
        if (!(o === object) && (o.name === name)) {
          let objectsCount = parseInt(o.name.charAt(name.length - 1))
          if (isNaN(objectsCount)) {
            objectsCount = 1
          }
          o.name = o.name + (objectsCount)
          name = name + (objectsCount + 1)
        }
        if (!(o === object) && (o.name === name + index)) {
          index += 1
        }
        if (!(o === object) && (o.name === name + 1)) {
          index += 1
        }
      })
      if (index !== 1) {
        name = name + index
      }
      object.name = name
    },
    objectSelect (object) {
      if (object != null) {
        this.$data.selectedObject = object
        this.$data.objectSelected = true
      } else {
        this.$data.selectedObject = null
        this.$data.objectSelected = false
      }
    },
    deleteObject (object) {
      setTimeout(() => {
        let objectIndex = this.$data.engine.objects.indexOf(object)
        this.$data.engine.objects.splice(objectIndex, 1)
        if (this.$data.engine.objects.length === 0) {
          this.objectSelect(null)
        } else {
          this.objectSelect(this.$data.engine.objects[this.$data.engine.objects.length - 1])
        }
      }, 100)
    },
    setupEngine () {
      this.$data.engine = new Bronze.Engine(this.$refs.canvas)
      this.$data.engine.canvasResized()
    },
    setupCamera () {
      let camera = new Bronze.Camera(this.$data.engine)
      camera.setPosition(0, 800, 1200)
      camera.setFieldOfView(90)
      camera.setRotation(0, 0, 0)
      this.$data.engine.setCamera(camera)
    },
    setCameraMode (mode) {
      let camera = this.$data.engine.camera
      if (mode == 'fps') {
        console.log("AAAAA")
      }
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
    setupControls () {
      let controls = new Bronze.Controls(this.$data.engine)
      let engine = this.$data.engine
      let camera = this.$data.engine.camera
      let vue = this

      controls.lockPointer(false)
      controls.onMouseDown(2, (event) => {
        if (engine.selectedObject != null) {
          vue.$data.objectSelected = true
          vue.$data.selectedObject = engine.selectedObject
          vue.$data.selectedObjectName = engine.selectedObject.filePath
        } else {
          vue.$data.objectSelected = false
          vue.$data.selectedObject = null
          vue.$data.selectedObjectName = ''
        }
      })

      camera.setControl(() => {
        if (controls.keys[87]) {
          if (controls.keys[16]) {
            camera.move(0, 10, 0)
          } else {
            camera.move(camera.rotationMatrix[2] * -10, 0, camera.rotationMatrix[10] * -10)
          }
        }
        if (controls.keys[83]) {
          if (controls.keys[16]) {
            camera.move(0, -10, 0)
          } else {
            camera.move(camera.rotationMatrix[2] * 10, 0, camera.rotationMatrix[10] * 10)
          }
        }
        if (controls.keys[65]) {
          camera.move(camera.rotationMatrix[0] * -10, camera.rotationMatrix[4] * -10, camera.rotationMatrix[8] * -10)
        }
        if (controls.keys[68]) {
          camera.move(camera.rotationMatrix[0] * 10, camera.rotationMatrix[4] * 10, camera.rotationMatrix[8] * 10)
        }
        if (controls.mouse.buttons[2]) {
          if (engine.selectedObject != null) {
            const object = engine.selectedObject
            vue.$data.selectedObject = null
            vue.$data.selectedObject = object
            object.moveRelativeToTheCamera(controls.mouse.movement.x, -controls.mouse.movement.y, 0)
          }
        }

        if (controls.mouse.buttons[0] || controls.pointerLocked) {
          if (controls.keys[17]) {
            camera.rotate(0, 0, (controls.mouse.movement.y / 10))
          } else {
            camera.rotate(controls.mouse.movement.y / 10, controls.mouse.movement.x / 10, 0)
          }
        }
      })
    },
    saveObjects () {
      let objects = this.$data.engine.objects
      objects.forEach(object => {
        let objectCode = ''
        objectCode += 'let ' + object.name + ' = new Object(engine)\n'
        objectCode += ' ' + object.name + '.setPosition(' + object.position[0] + ', ' +
                                                            object.position[1] + ', ' +
                                                            object.position[2] + ')\n'
        objectCode += ' ' + object.name + '.setRotation(' + object.rotation[0] + ', ' +
                                                            object.rotation[1] + ', ' +
                                                            object.rotation[2] + ')\n'
        objectCode += ' ' + object.name + '.scale('       + object.scaling[0] + ', ' +
                                                            object.scaling[1] + ', ' +
                                                            object.scaling[2] + ')\n'
        if (object.texture != this.$data.engine.noTexture) {
          objectCode += ' ' + object.name + '.setTexture(new Texture(' + object.texture.src + '))\n'                                                                                                        
        }
        objectCode += ' ' + object.name + '.loadFromObj(' + object.filePath + ')\n'
      })
    }
  },
  watch: {
    selectedObject: function (object) {
      this.$data.rotation = [
        object.rotation[0] * 180 / Math.PI,
        object.rotation[1] * 180 / Math.PI,
        object.rotation[2] * 180 / Math.PI
      ]
    },
    rotation: function (value) {
      this.$data.selectedObject.rotation = [
        // Bronze.degToRad(value[0]),
        // Bronze.degToRad(value[1]),
        // Bronze.degToRad(value[2]),
        value[0] * Math.PI / 180,
        value[1] * Math.PI / 180,
        value[2] * Math.PI / 180
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="sass">
  .editor
    width: 100%
    height: 100%
    display: flex
    flex-direction: column
    align-items: flex-start
    position: relative
    .top
      height: 28px
      line-height: 28px
      background: rgba(0, 0, 0, 0.2)
      width: 80%
      text-align: left
      color: white
      padding: 0px 15px
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
                & > li
    .mid
      white-space: nowrap
      font-size: 0
      height: 100%
      width: 100%
      text-align: left
      .main
        position: relative
        width: 80%
        height: 100%
        display: inline-block
        box-sizing: border-box
        padding: 25px 15px
        canvas
          width: 100%
          height: 100%
          background: #1e1e1d
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)
      .menu
        position: absolute
        top: 0
        right: 0
        display: inline-block
        vertical-align: top
        overflow-y: auto
        overflow-x: hidden
        width: 20%
        height: 100%
        max-height: 100%
        font-size: 14px
        text-align: left
        padding: 0 10px
        box-sizing: border-box
        background: #161615
        box-shadow: 0 8px 17px 2px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12), 0 5px 5px -3px rgba(0, 0, 0, 0.2)
        .group
          margin-top: 10px
          padding: 10px 10px 5px 10px
          border: 2px solid rgba(244, 244, 230, 0.05)
          border-style: dashed
          box-sizing: border-box
          color: #f4f4e6
          .tip
            color: rgba(255, 255, 255, 0.5)
            text-align: center
            width: 100%
            display: block
          .group_name
            display: block
            font-size: 18px
            padding: 5px 0 15px 0
            text-align: center
          .button
            position: relative
            background: rgba(214, 109, 64, 1)
            text-decoration: none
            padding: 5px 0
            box-sizing: border-box
            width: 100%
            border-radius: 5px
            border: 1px solid rgba(0, 0, 0, 0.1)
            cursor: pointer
            //box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2)
            span
              text-align: center
              display: block
              padding: 10px
              font-size: 14px
              font-weight: 700
              user-select: none
            input
              position: absolute
              width: 100%
              height: 100%
              left: 0
              top: 0
              opacity: 0
          .property
            display: table
            white-space: nowrap
            padding: 6px
            width: 100%
            box-sizing: border-box
            border: 2px solid rgba(244, 244, 230, 0.02)
            margin: 2px 0 4px 0
            white-space: nowrap
            font-size: 0
            &.file_text
              overflow: scroll
              max-height: 500px
              height: 500px
              width: 100%
              max-width: 100%
              font-size: 12px
              color: rgba(255, 255, 255, 0.5)
              font-family: 'Consolas'
            &.objects
              background: rgba(255, 255, 255, 0.05)
              border-radius: 5px
              cursor: pointer
              span
                cursor: text
              button.delete
                background: rgba(0, 0, 0, 0.2)
                color: rgba(244, 244, 230, 0.5)
                border: none
                border-radius: 45%
                text-align: center
                white-space: nowrap
                height: 22px
                width: 22px
                margin-left: 5px
                padding: 0 0 0 0.7px
                float: right
            .input
              display: table
              z-index: 999
              min-width: 12px
              width: 128px
              text-align: right
              background: rgba(244, 244, 230, 0.1)
              border: 1px solid rgba(244, 244, 230, 0.2)
              border-radius: 5px
              box-sizing: border-box
              position: relative
              &.tips
                input
                  width: 50%
              input
                display: table-cell
                width: 100%
                background: transparent
                border: none
                color: white
                padding: 5px
                box-sizing: border-box
              span
                display: block
                color: rgba(244, 244, 230, 0.5)
                background: rgba(0, 0, 0, 0.2)
                padding: 1px 4px 1px 4px
                border-radius: 5px
                user-select: none
            &__button
              .name, .value
                vertical-align: middle !important
            .name, .value
              display: table-cell
              vertical-align: top
              font-size: 14px
            .name
              font-weight: 500
            .value
              text-align: right
              .button
                width: 128px
                padding: 0px
                display: inline-block
                span
                  font-size: 12px
              & > .input
                display: block
                float: right
              .inputs
                text-align: right
                &.x3
                  .row
                    margin: 2px 0 4px 0
                    label
                      background: rgba(244, 244, 230, 0.1)
                      height: 18px
                      width: 18px
                      border-radius: 50%
                      text-align: center
                      line-height: 20px
                      margin: 0
                      padding: 0
                      color: rgba(244, 244, 230, 0.5)
                      margin-right: 5px
                      user-select: none
                    .input, label, span
                      display: inline-block
                      vertical-align: middle
                      font-size: 12px

</style>
