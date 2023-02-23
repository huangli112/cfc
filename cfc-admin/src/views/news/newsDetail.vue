<template>
  <div>
    <a-card title='新闻动态详情' :bordered='false'>
      <a-form :form='form' :label-col='{ span: 3 }' :wrapper-col='{ span: 19 }' @submit='handleSubmit'>
        <a-form-item label='标题'>
          <a-input
            v-decorator="['title', { rules: [{ required: true, message: '请输入标题!' }] }]"
          />
        </a-form-item>

        <a-form-item label='优先级'>
          <a-input
            v-decorator="['showIndex', { rules: [{ required: true, message: '请输入优先级!' }] }]"
          />
        </a-form-item>
        <a-form-item label='日期'>
          <a-date-picker
            v-decorator="['date', { rules: [{ required: true, message: '请选择日期' }]}]"
          />
        </a-form-item>

        <a-form-item label='新闻内容'>
          <WEditor :init-content='newsContent' @onChange='onContentChange($event)' />
        </a-form-item>

        <a-form-item :wrapper-col='{ span: 5, offset: 18 }'>
          <a-button type='default' style='margin-right: 10px' @click='cancel()'>
            取消
          </a-button>
          <a-button type='primary' @click='handleSubmit()'>
            确定
          </a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script>
import WEditor from '../../components/WEditor/WEditor'
import { addContentInfo, getContentInfoById, updateContentInfo } from '@/api/common'
import { message } from 'ant-design-vue'

export default {
  components: { WEditor },
  data () {
    return {
      form: this.$form.createForm(this),
      editId: '',
      newsContent: '',
      content: '',
      formData: {}
    }
  },
  created () {
    if (this.$route.params.id !== 'undefined') {
      this.editId = this.$route.params.id
    }
  },
  mounted () {
    if (this.editId) {
      this.getEditNews(this.editId)
    }
  },
  methods: {
    async getEditNews (id) {
      this.formData = await getContentInfoById(id)
      const { title, showIndex, content, date } = this.formData
      this.form.setFieldsValue({ title, showIndex, date })
      this.newsContent = content
    },
    handleSubmit () {
      this.form.validateFields(async (err, value) => {
        if (!err) {
          console.log(value)
          value.date = this.$moment(value.date).format('YYYY-MM-DD')
          const params = { ...value, content: this.content, code: 'NEWS_INFORMATION' }
          if (this.editId) {
            await updateContentInfo({ ...params, id: this.editId })
            message.success('更新成功')
          } else {
            await addContentInfo(params)
            message.success('创建成功')
          }
          await this.$router.push({
            path: `/news`
          })
        }
      })
    },
    onContentChange (e) {
      this.content = e
    },
    cancel () {
      this.form.resetFields()
      this.$router.push({
        path: `/news`
      })
    }
  }
}
</script>

<style scoped>
</style>
