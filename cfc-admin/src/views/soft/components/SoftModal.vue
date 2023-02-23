<template>
  <a-modal
    :visible='visible'
    @ok='onSubmit'
    @cancel='closeModal'
    :maskClosable='false'
    :keyboard='false'
    :width='550'
    :title="title ? '编辑软件模块' : '新增软件模块'"
  >
    <a-form :label-col='{ span: 5 }' :wrapper-col='{ span: 14 }' :form='form' v-bind='formItemLayout'>
      <a-form-item label='标题'>
        <a-input
          placeholder='请输入标题'
          v-decorator="['title',  {rules:[ { required: true, message: '标题必填!' }]}] "
        />
      </a-form-item>
      <a-form-item label='副标题'>
        <a-input placeholder='请输入副标题' v-decorator="['subheading']" />
      </a-form-item>
      <a-form-item label='内容'>
        <a-textarea placeholder='请输入描述' :rows='4' v-decorator="['content']" />
      </a-form-item>
      <a-form-item label='内容标签' extra='标签之间用英文逗号隔开'>
        <a-textarea
          placeholder='请输入内容标签'
          :rows='4'
          v-decorator="['contentDescription',{rules:[{required:true,message:'内容标签必填!'}]}]"
        />
      </a-form-item>
      <a-form-item label='链接'>
        <a-input placeholder='请输入链接' :rows='4' v-decorator="['link']" />
      </a-form-item>
      <a-form-item label='显示顺序'>
        <a-input placeholder='请输入显示顺序' :rows='4' v-decorator="['showIndex']" />
      </a-form-item>
      <a-form-item label='附件' extra='此处上传产品板块轮播图'>
        <a-upload
          v-decorator="['attachment',  {valuePropName: 'fileList'},]"
          action='http://114.67.199.59/cfc/file/upload'
          list-type='text'
          :headers='headers'
        >
          <a-button type='primary'>
            <a-icon type='upload' />
            点击上传
          </a-button>
        </a-upload>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import ATextarea from 'ant-design-vue/es/input/TextArea'
import { addSoft, updateSoft } from '@/api/soft.js'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { handleAttachmentId, handleFileList } from '@/utils/constant'

export default {
  components: { ATextarea },
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    title: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object
    }
  },
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      headers: { authorization: `Bearer  ${Vue.ss.get(ACCESS_TOKEN)}` }
    }
  },
  watch: {
    visible () {
      setTimeout(() => {
        this.getFormData()
      }, 500)
    }
  },
  methods: {
    getFormData () {
      const {
        title,
        subheading,
        content,
        contentDescription,
        link,
        showIndex,
        attachment
      } = this.data
      const newAttachment = handleFileList(attachment)

      this.form.setFieldsValue({
        title,
        subheading,
        content,
        contentDescription,
        link,
        showIndex,
        attachment: newAttachment
      })
    },
    onSubmit () {
      this.form.validateFields(async (err, values) => {
        if (err) return

        values.attachment = handleAttachmentId(values.attachment.fileList)
        if (values.contentDescription === ' ') {
          return (values.contentDescription = [])
        } else {
          values.contentDescription = values.contentDescription.split(',').filter(item => Boolean(item))
        }
        if (!this.title) {
          const assParams = {
            ...values,
            code: 'SOFTWARE_PRODUCT'
          }
          const res = await addSoft(assParams)
          if (res.message === 'success') {
            this.$message.success('新增成功')
            this.$emit('ok')
          }
        } else {
          const updParams = {
            ...values,
            id: this.data.id
          }
          const res = await updateSoft(updParams)
          if (res.message === 'success') {
            this.$emit('ok')
            this.$message.success('修改成功')
          }
        }
      })
    },
    closeModal () {
      this.form.resetFields()
      this.$emit('close')
    }
  }
}
</script>
