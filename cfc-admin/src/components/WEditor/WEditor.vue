<template>
  <div style='border: 1px solid #ccc; '>
    <Toolbar
      style='border-bottom: 1px solid #ccc'
      :editor='editor'
      :defaultConfig='toolbarConfig'
      :mode='mode'
    />
    <Editor
      style='height: 500px; overflow-y: hidden;'
      v-model='html'
      :defaultConfig='editorConfig'
      :mode='mode'
      @onCreated='onCreated'
      @onChange='onChange'
    />
  </div>
</template>

<script>
/* eslint-disable space-before-function-paren */
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  components: { Editor, Toolbar },
  props: ['initContent'],
  data() {
    return {
      editor: null,
      html: this.initContent,
      toolbarConfig: {},
      editorConfig: {
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            fieldName: 'file',
            maxFileSize: 30 * 1024 * 1024, // 3M
            headers: { authorization: `Bearer  ${Vue.ss.get(ACCESS_TOKEN)}` },
            server: 'http://114.67.199.59/cfc/file/upload',
            customInsert(res, insertFn) {
              insertFn(`http://114.67.199.59/cfc/file/download?fileUUID=${res.data.id}`, '', '')
            }
          }
        }
      },
      mode: 'default' // or 'simple',
    }
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor) // 一定要用 Object.seal() ，否则会报错}
    },
    onChange(editor) {
      this.$emit('onChange', editor.getHtml())
    }
  },
  mounted() {
    this.editorConfig.MENU_CONF['uploadImage'] = {
      fieldName: 'file',
      maxFileSize: 30 * 1024 * 1024, // 3M
      headers: { authorization: `Bearer  ${Vue.ss.get(ACCESS_TOKEN)}` },
      server: 'http://114.67.199.59/cfc/file/upload',
      customInsert(res, insertFn) {
        insertFn(`http://114.67.199.59/cfc/file/download?fileUUID=${res.data.id}`, '', '')
      }
    }
  },
  watch: {
    initContent: {
      immediate: true,
      handler(newContent) {
        this.html = newContent
      }
    }
  },
  beforeDestroy() {
    const editor = this.editor
    if (editor == null) return
    editor.destroy() // 组件销毁时，及时销毁编辑器
  }
}
</script>

<style src='@wangeditor/editor/dist/css/style.css'></style>
<style>
/deep/ .w-e-full-screen-container {
  z-index: 999 !important;
}
</style>

<style scoped>

</style>
