<template>
  <div class="objects" v-if="engine">
    <div class="group">
      <label class="group_name">Objects</label>
      <label class="tip" v-if="objects.length == 0">There are no objects now</label>
      <div v-else-if="doShowObjects">
        <div class="objects property property__button"
            v-for="object in objects"
            v-on:click="selectObject(object)"
            :key="object.id"
        >
          <div class="name"><span>{{ object.name }}</span></div>
          <button v-on:click="deleteObject(object)" class="delete">X</button>
        </div>
      </div>
    </div>
    <ObjectProps v-if="selectedObject" :object="selectedObject" @name-changed="onNameChanged"/>
  </div>
</template>

<script>
import ObjectProps from './props'
import $s from '@/components/store'

export default {
  data() {
    return { doShowObjects: true }
  },
  computed: {
    $s: () => $s,
    engine: () => $s.$.engine,
    objects: () => $s.$.engine.objects,
    selectedObject: () => $s.$.selectedObject,
  },

  components: { ObjectProps },

  methods: {
    selectObject (object) {
      if (object != null) {
        this.$s.$.selectedObject = object
      } else {
        this.$s.$.selectedObject = null
      }
    },
    deleteObject (object) {
      setTimeout(() => {
        let objectIndex = this.$parent.engine.objects.indexOf(object)
        this.engine.objects.splice(objectIndex, 1)

        if (this.engine.objects.length === 0) {
          this.$s.$.selectedObject = null
        } else {
          this.$s.$.selectedObject = this.engine.objects[this.engine.objects.length - 1]
        }
      }, 100)
    },
    onNameChanged() {
      this.doShowObjects = false;
      this.$nextTick(() => { this.doShowObjects = true })
    }
  },
}
</script>