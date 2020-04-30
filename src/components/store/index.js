import Vue from 'vue'
import * as Bronze from '@m0ksem/bronze'
import TextureManager from './texture.manager';
import ObjectsManager from './objects.manager';

class Store {
  constructor () {
    this.$ = Vue.observable({
      engine: null,
      selectedObject: null,
      selectedObjectName: ''
    })

    this.textureManager = null;
    this.objectsManager = null;
  }

  get engine () { return this.$.engine }
  set engine (val) { this.$.engine = val }

  setupEngine (div) {
    this.$.engine = new Bronze.Engine(div)

    this.textureManager = new TextureManager(this.$.engine, this)
    this.objectsManager = new ObjectsManager(this.$.engine, this)
  }

  setupCamera () {
    let camera = new Bronze.Camera(this.$.engine)
    camera.setPosition(0, 800, 1200)
    camera.setFieldOfView(90)
    camera.setRotation(0, 0, 0)
    this.$.engine.setCamera(camera)
  }

  setupControls () {
    let controls = new Bronze.Controls(this.$.engine)
    let engine = this.$.engine
    let camera = this.$.engine.camera

    engine.globalLightMinValue = 0.01
    let moonLight = new Bronze.Light(engine)
        moonLight.setPosition(0, 0, 0)
        moonLight.range = 13370
        moonLight.on()

    controls.lockPointer(false)
    controls.onMouseDown(2, (event) => {
      if (engine.selectedObject != null) {
        this.$.selectedObject = engine.selectedObject
        this.$.selectedObjectName = engine.selectedObject.filePath
      } else {
        this.$.selectedObject = null
        this.$.selectedObjectName = ''
      }
    })

    controls.setControlFunction(() => {
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
          this.$.selectedObject = object
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
  }
}

export default new Store()
