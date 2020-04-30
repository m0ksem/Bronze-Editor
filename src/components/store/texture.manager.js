import * as Bronze from '@m0ksem/bronze'

class TextureManager {
  constructor (engine, store) {
    this.engine = engine
    this.store = store
  }

  textureLoading (event) {
    let files = event.target.files
    
    if (!files[0].type.match('image.*')) {
      return alert('Bad image format')
    } 
    let reader = new FileReader()
    reader.onload = (() => {
      return (e) => {
        let texture = new Bronze.SimpleTexture(this.engine)
        texture.setColor(255, 255, 255, 255)
        texture.loadFrom(e.target.result)
      }
    })(files[0])
    reader.readAsDataURL(files[0])
  }

  createColorTexture(color) {
    const texture = new Bronze.ColorTexture(this.engine);
    let rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);
    texture.setColor(parseInt(rgb[1], 16), parseInt(rgb[2], 16), parseInt(rgb[3], 16), 255);
  }
}

export default TextureManager
