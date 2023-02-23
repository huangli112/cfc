<template>
  <img :src=base64 alt='' :class='imgClass' :style='imgStyle' />
</template>

<script>
import { downloadImage } from '../../utils/constant'

export default {
  props: ['fileId', 'imgClass', 'imgStyle'],
  data () {
    return {
      base64: ''
    }
  },
  created () {
    this.handleImgBase64(this.fileId)
  },
  methods: {
    async handleImgBase64 (id) {
      const base64 = await downloadImage(id)
      this.base64 = base64
    }
  },
  watch: {
    fileId () {
      this.handleImgBase64(this.fileId)
    }
  }
}
</script>

<style scoped>
</style>
