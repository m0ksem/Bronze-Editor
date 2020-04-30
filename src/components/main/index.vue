<template>
  <div class="editor">
    <div class="top">
      <Menu />
    </div>
    <div class="mid">
      <div class="main" ref="window"/>
      <RightMenu v-show="engine" />
    </div>
  </div>
</template>

<script>
import $s from '@/components/store'
import Menu from '@/components/Menu.vue'
import RightMenu from './right-menu'

export default {
  name: 'Main',
  components: {
    Menu, RightMenu
  },
  data () {
    return {
      rotation: [0, 0, 0]
    }
  },
  computed: {
    $s: () => $s,
    engine: () => $s.$.engine,
    selectedObject: () => $s.$.selectedObject,
    selectedObjectName: () => $s.$.selectedObjectName,
  },
  mounted () {
    this.$s.setupEngine(this.$refs.window)
    this.$s.setupCamera()
    this.$s.setupControls()
    this.$s.$.engine.run()
  },
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
        padding: 25px 15px 0 15px
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
