<template>
  <a-modal
    :visible='show'
    :title='title'
    okText='保存'
    @cancel='handleCancel()'
    @ok='handleOk()'
  >
    <a-form :form='form' :layout="'horizontal'" :formItemLayout='formItemLayout'>
      <a-form-item label='主标题' v-bind='formItemLayout'>
        <a-input v-decorator="[ 'title']" />
      </a-form-item>
      <a-form-item label='英文标题' v-bind='formItemLayout'>
        <a-input v-decorator="['enTitle']" />
      </a-form-item>
      <a-form-item label='内容' v-bind='formItemLayout'>
        <a-input type='textarea' v-decorator="['content']" />
      </a-form-item>
      <a-form-item label='优先级' v-bind='formItemLayout'>
        <a-input type='textarea' v-decorator="['showIndex']" />
      </a-form-item>
      <a-form-item label='链接' v-bind='formItemLayout'>
        <a-input v-decorator="['link']" />
      </a-form-item>
      <a-form-item
        label='附件' v-bind='formItemLayout'>
        <a-upload
          list-type='text'
          v-decorator="['attachment',{require:true}]"
          :file-list='fileList'
          :headers='headers'
          :action='uploadUrl'
          :remove='handleFileRemove'
          @change='handleFileChange'
        >
          <a-button>
            <a-icon type='upload' />
            点击上传
          </a-button>
        </a-upload>
      </a-form-item>

    </a-form>
  </a-modal>
</template>

<script>
import { getContentInfoById, updateContentInfo } from '@/api/common'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { handleAttachmentId, handleFileList, UploadUrl } from '@/utils/constant'
import { addCompany } from '@/api/company'

export default {
  name: 'business-modal',
  props: ['btnText', 'visible', 'title', 'id'],
  data () {
    return {
      show: false,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      },
      fileList: [],
      headers: { authorization: `Bearer  ${Vue.ss.get(ACCESS_TOKEN)}` },
      uploadUrl: UploadUrl
    }
  },
  mounted () {
    if (this.id) {
      this.getModalInfo()
    }
  },
  methods: {
    async getModalInfo () {
      const data = await getContentInfoById(this.id)
      const { title, enTitle, content, link, attachment, showIndex } = data
      this.form.setFieldsValue({ title, enTitle, content, link, showIndex })
      this.fileList = handleFileList(attachment)
    },
    showModal () {
      this.visible = true
    },
    handleCancel () {
      this.form.resetFields()
      this.fileList = []
      this.$emit('cancel')
    },
    handleOk () {
      this.form.validateFields(async (err, values) => {
        if (err) {
          return
        }
        const attachment = handleAttachmentId(this.fileList)
        const params = { ...values, attachment, code: 'TRAINING_SECTION' }
        try {
          if (this.id) {
            await updateContentInfo({ id: this.id, ...params })
            this.fileList = []
            this.form.resetFields()
          } else {
            await addCompany(params)
            this.form.resetFields()
            this.fileList = []
          }
          this.$emit('ok')
        } catch {
          this.$message.error('实训板块出错了')
        }
      })
    },
    handleFileRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    handleFileChange (info) {
      this.fileList = info.fileList
    }
  },
  watch: {
    visible () {
      this.show = this.visible
    },
    id: {
      immediate: true,
      handler (newValue) {
        if (newValue) {
          this.getModalInfo(newValue)
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
