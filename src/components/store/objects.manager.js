import * as Bronze from '@m0ksem/bronze'

class ObjectManager {
  constructor (engine, store) {
    this.engine = engine
    this.store = store
  }

  addObject(objectText, filePath) {
    let object = new Bronze.Object(this.engine)
    object.setPosition(0, 0, 0)
    object.compile(objectText)
    object.filePath = filePath
    object.selectable = true

    let name = filePath.replace('.obj', '')
    name = name.charAt(0).toUpperCase() + name.slice(1)
    let index = 1
    this.engine.objects.forEach(o => {
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
  }

  saveObjects () {
    let objects = this.$parent.engine.objects
    objects.forEach(object => {
      let objectCode = ''
      objectCode += 'let ' + object.name + ' = new Object(engine)\n'
      objectCode += ' ' + object.name + '.setPosition(' + object.position[0] + ', ' +
                                                          object.position[1] + ', ' +
                                                          object.position[2] + ')\n'
      objectCode += ' ' + object.name + '.setRotation(' + object.rotation[0] + ', ' +
                                                          object.rotation[1] + ', ' +
                                                          object.rotation[2] + ')\n'
      objectCode += ' ' + object.name + '.scale(' + object.scaling[0] + ', ' +
                                                    object.scaling[1] + ', ' +
                                                    object.scaling[2] + ')\n'
      if (object.texture !== this.$parent.engine.noTexture) {
        objectCode += ' ' + object.name + '.setTexture(new Texture(' + object.texture.src + '))\n'
      }
      objectCode += ' ' + object.name + '.loadFromObj(' + object.filePath + ')\n'
      alert(objectCode)
    })
  }
}

export default ObjectManager
