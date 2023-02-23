<template>
  <a-modal v-model='show'
           :destroyOnClose='true'
           okText='保存'
           @cancel='cancel'
           @ok='handleUpload'
  >
    <a-form
      :form='form'
      name='validate-form'
      v-bind='formItemLayout'
    >
      <a-form-item :label='labelName'>
        <a-spin :spinning='loading'>
          <a-upload
            list-type='text'
            v-decorator="['attachment']"
            :headers='headers'
            action='http://114.67.199.59/cfc/file/upload'
            :file-list='fileList'
            :remove='handleRemove'
            @change='handleChange'

          >
            <a-button>
              <a-icon type='upload' />
              点击上传
            </a-button>
          </a-upload>
        </a-spin>
      </a-form-item>
    </a-form>
  </a-modal>

</template>

<script>
import Vue from 'vue'
import { ACCESS_TOKEN } from '../../store/mutation-types'

export default {
  props: ['visible', 'labelName', 'files'],
  data () {
    return {
      headers: { authorization: `Bearer  ${Vue.ss.get(ACCESS_TOKEN)}` },
      form: this.$form.createForm(this),
      show: this.visible,
      fileList: [],
      uploading: false,
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 14 }
      },
      loading: false,
      attachment: []
    }
  },
  mounted () {
  },
  methods: {
    cancel () {
      this.fileList = []
      this.$emit('cancel')
    },
    handleRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    handleChange (info) {
      this.fileList = info.fileList
      if (info.file.status === 'uploading') {
        this.loading = true
      }

      if (info.file.status === 'done' || info.file.status === 'error' || info.file.status === 'success') {
        this.loading = false
      }

      // 上传
      if (info.file.status === 'done' && info.file.response) {
        const { data } = info.file.response
        if (!data.id) {
          this.$message.error('文件上传失败，请重试！')
          this.fileList = info.fileList.filter((file) => file.status === 'done' || file.status === 'success')
        }
        this.attachment = info.fileList.map(item => item.response.data.id)
      }
    },
    handleUpload () {
      // 请求放到外层父组件
      this.$emit('create', { attachment: this.attachment })
    }
  },
  watch: {
    visible () {
      this.show = this.visible
      if (this.visible) {
        this.fileList = this.files
      }
    }
  }
}
</script>

<style scoped>
</style>
