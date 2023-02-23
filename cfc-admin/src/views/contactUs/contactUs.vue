<template>
  <div>
    <a-card title='联系我们Banner图' :bordered='false'>
      <CarouselUpload v-if='childInfo[0]' title='联系我们Banner图' code='CONTACT_US_CHILD'  :id='childInfo[0]' />
      <div style='padding:10px'></div>
      <CarouselUpload v-if='childInfo[1]'  title='留言列表Banner图' code='ONLINE_MESSAGE' :id='childInfo[1]' />
    </a-card>
    <a-card title='联系信息' :bordered='false'>
      <editList />
      <MessagesList />
    </a-card>
  </div>

</template>

<script>
import MessagesList from './messages/MessagesList'
import CarouselUpload from '@/components/CarouselUpload'
import { getContactChild, getContactInfo } from '@/api/common'
import { UploadUrl } from '@/utils/constant'
import EditList from '@/views/contactUs/editList/EditList'

export default {
  components: { MessagesList, CarouselUpload, EditList },
  data () {
    return {
      action: UploadUrl,
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: { span: 8 },
        wrapperCol: { span: 8 }
      },
      formData: {},
      loading: false,
      fieldId: '',
      childInfo: []
    }
  },
  mounted () {
    // 获取联系信息详情
    this.getFormInfo()
    this.getChild()
  },
  methods: {
    async getFormInfo () {
      this.formData = await getContactInfo()
    },
    async getChild () {
      this.childInfo = await getContactChild('CONTACT_US')
    },
    handleFileChange (info) {
      console.log(info)
    },
    handleCancel () {
      this.form.resetFields()
    },
    handleSubmit () {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
          // 发送请求
        }
      })
    },
    normFile (e) {
      console.log('Upload event:', e)
      if (Array.isArray(e)) {
        return e
      }
      return e && e.fileList
    }
  }
}
</script>

<style>
</style>
