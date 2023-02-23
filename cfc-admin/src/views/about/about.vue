<template>
  <a-card title='关于公司' :bordered='false'>
    <a-form
      :label-col='{ span: 3 }' :wrapper-col='{ span: 19 }'
      :form='form'
      v-bind='formItemLayout'
      @submit='handleSubmit'
    >
      <a-form-item label='标题'>
        <a-input placeholder='请输入标题' v-decorator="['title']" />
      </a-form-item>
      <a-form-item label='英文标题'>
        <a-input placeholder='请输入英文标题' v-decorator="['enTitle']" />
      </a-form-item>
      <a-form-item label='描述'>
        <a-textarea placeholder='请输入描述' :rows='4' v-decorator="['copywriting']" />
      </a-form-item>
      <a-form-item label='附件' extra='此处上传关于公司的背景图片'>
        <PicUpload v-if='fileId' :init-file-id='fileId'  @onFileChange='onFileChange'></PicUpload>
      </a-form-item>

      <a-form-item :wrapper-col='{ span: 5, offset: 19 }'>
        <a-button type='primary' html-type='submit' style='margin-right:10px'>确定</a-button>
<!--        <a-button @click='handleCancel'>取消</a-button>-->
      </a-form-item>
    </a-form>
  </a-card>

</template>

<script>
import PicUpload from '@/components/PicUpload/PicUpload'
import { getTypeInfo, updateTypeInfo } from '@/api/common'
import { message } from 'ant-design-vue'

export default {
  components: { PicUpload },
  data () {
    return {
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 }
      },
      attachment: [],
      data: {},
      fileId: ''
    }
  },
  beforeCreate () {
    this.form = this.$form.createForm(this, { name: 'validate_other' })
  },
  mounted () {
    this.getAboutInfo()
  },
  methods: {
    async getAboutInfo () {
      this.data = await getTypeInfo('ABOUT_THE_COMPANY')
      const { title, enTitle, copywriting, attachment } = this.data
      this.form.setFieldsValue({ title, enTitle, copywriting })
      this.fileId = attachment.length ? attachment[0].id : ''
    },
    handleCancel () {
      console.log(this.data.attachment[0].id)
      // this.fileId = 'bcfc97f7df3c41cf8be2362f3ff7f54a'
      // 'bcfc97f7df3c41cf8be2362f3ff7f54a'
      this.getAboutInfo()
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields(async (err, values) => {
        if (!err) {
          const params = { ...values, attachment: this.attachment, id: '15' }
          await updateTypeInfo(params)
          message.success('修改成功')
        }
      })
    },
    onFileChange (e) {
      this.attachment.push(e)
    }
  }
}
</script>

<style>
</style>
