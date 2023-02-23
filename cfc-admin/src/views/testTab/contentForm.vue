<template>
  <div>
    <a-form
      :label-col='{ span: 5 }' :wrapper-col='{ span: 14 }'
      :form='form'
      v-bind='formItemLayout'
    >
      <a-form-item label='标题'>
        <a-input placeholder='请输入标题' v-decorator="['title']" />
      </a-form-item>
      <a-form-item label='副标题'>
        <a-input placeholder='请输入副标题' v-decorator="['subheading']" />
      </a-form-item>
      <a-form-item label='内容'>
        <a-textarea placeholder='请输入描述' :rows='4' v-decorator="['cotent']" />
      </a-form-item>
      <a-form-item label='内容标签' extra='标签之间用英文逗号隔开'>
        <a-textarea placeholder='请输入描述,' :rows='4' v-decorator="['contentDescription']" />
      </a-form-item>
      <a-form-item label='附件' extra='此处上传产品板块轮播图'>
        <a-upload
          v-decorator="['upload',{valuePropName: 'fileList'}]"
          action='http://114.67.199.59/cfc/file/upload'
          list-type='text'
        >
          <a-button type='primary'>
            <a-icon type='upload' />
            点击上传
          </a-button>
        </a-upload>
      </a-form-item>

      <a-form-item :wrapper-col='{ span: 5, offset: 19 }'>
        <a-button type='primary' @click='handleSubmit' style='margin-right:10px'>确定</a-button>
        <a-button @click='handleCancel'>取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>

export default {
  props: ['formData'],

  data () {
    return {
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 }
      },
      form: this.$form.createForm(this)
    }
  },
  mounted () {
    this.form.setFieldsValue(this.formData)
  },
  methods: {
    handleSubmit () {
      this.form.validateFields((err, value) => {
        if (err) {
          return
        }
        const params = {
          ...value,
          contentDescription: value.contentDescription ? value.contentDescription.split(',') : []
        }
        console.log(params)
      })
    },
    handleCancel () {

    },
    tagChange () {

    }
  }
}
</script>

<style scoped>
</style>
