<template>
  <a-card title='企业信息化' :bordered='false'>
    <div class='operate-wrapper'>
      <a-button @click='handleAdd' type='primary'>新增</a-button>
    </div>
    <a-table :columns='columns' :data-source='dataSource' rowKey='title'>
      <template slot='attachment' slot-scope='text, record'>
        <template v-if='!record.attachment.length'>-</template>
        <BusinessImage v-else :file-id='record.attachment[0].id' img-style='height: 80px;'></BusinessImage>
      </template>

      <template slot='operation' slot-scope='text,record'>
        <div style='display: flex'>
          <a-button size='small' type='primary' @click='onEdit(record)' style='margin-right: 10px'>编辑</a-button>
          <a-button size='small' type='danger' @click='onRemove(record)'>删除</a-button>
        </div>
      </template>
    </a-table>
    <!-- 新增表单 -->
    <a-modal v-model='visible' title='企业信息化' okText='保存' @cancel='modalCancel' @ok='modalOk'>
      <a-form :form='form'>
        <a-form-item
          :label-col='formItemLayout.labelCol'
          :wrapper-col='formItemLayout.wrapperCol'
          label='标题'
        >
          <a-input v-decorator="['title']" placeholder='请输入标题' />
        </a-form-item>
        <a-form-item
          :label-col='formItemLayout.labelCol'
          :wrapper-col='formItemLayout.wrapperCol'
          label='描述'
        >
          <a-textarea :rows='4' v-decorator="['content']" placeholder='请输入描述' />
        </a-form-item>
        <a-form-item label='链接'>
          <a-input placeholder='请输入链接' :rows='4' v-decorator="['link']" />
        </a-form-item>
        <a-form-item label='显示顺序'>
          <a-input placeholder='请输入显示顺序' :rows='4' v-decorator="['showIndex']" />
        </a-form-item>
        <a-form-item
          label='企业信息图'
          :label-col='formItemLayout.labelCol'
          :wrapper-col='formItemLayout.wrapperCol'
        >
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
  </a-card>
</template>

<script>
import {
  handleAttachmentId,
  handleFileList,
  UploadUrl
} from '../../utils/constant'
import {
  addCompany,
  deleteCompany,
  getCompanyInfoList,
  updateCompany
} from '../../api/company'
import BusinessImage from '../../components/BusinessImage/BusinessImage'
import { Modal } from 'ant-design-vue'
import Vue from 'vue'
import { ACCESS_TOKEN } from '../../store/mutation-types'

export default {
  components: { BusinessImage },
  data () {
    return {
      uploadUrl: UploadUrl,
      visible: false,
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      },
      headers: { authorization: `Bearer  ${Vue.ss.get(ACCESS_TOKEN)}` },
      form: this.$form.createForm(this),
      fileList: [],
      columns: [
        {
          title: '标题',
          dataIndex: 'title',
          key: 'title',
          width: '10%',
          fix: 'left'
        },
        {
          title: '显示顺序',
          dataIndex: 'showIndex',
          align: 'center'
        },
        {
          title: '描述',
          dataIndex: 'content',
          key: 'content',
          width: '30%'
        },
        {
          title: '链接',
          dataIndex: 'link',
          align: 'center',
          width: '10%'
        },
        {
          title: '附件图',
          dataIndex: 'attachment',
          key: 'attachment',
          scopedSlots: { customRender: 'attachment' }
        },
        {
          title: '修改时间',
          dataIndex: 'createdTime',
          key: 'createdTime',
          width: '10%'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          width: '10%',

          scopedSlots: { customRender: 'operation' }
        }
      ],
      dataSource: [],
      editId: ''
    }
  },
  mounted () {
    this.getInfoList()
  },
  computed: {},
  methods: {
    async getInfoList () {
      this.dataSource = await getCompanyInfoList(
        'ENTERPRISE_INFORMATIONIZATION'
      )
    },
    handleFileRemove (file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList
    },
    handleFileChange (info) {
      this.fileList = info.fileList
    },
    /* 新增Modal */
    handleAdd () {
      this.visible = true
    },
    /* 表单提交 */
    modalOk () {
      // eslint-disable-next-line handle-callback-err
      this.form.validateFields(async (err, value) => {
        const attachment = handleAttachmentId(this.fileList)
        const params = {
          ...value,
          attachment,
          code: 'ENTERPRISE_INFORMATIONIZATION'
        }
        if (this.editId) {
          await updateCompany({ id: this.editId, ...params })
          await this.getInfoList()
          this.visible = false
          this.form.resetFields()
          this.fileList = []
          this.editId = ''
        } else {
          await addCompany(params).then(() => {
            this.getInfoList()
            this.visible = false
            this.form.resetFields()
            this.fileList = []
          })
        }
      })
    },
    /* 表单取消 */
    modalCancel (e) {
      this.visible = false
      this.form.resetFields()
    },
    onEdit (record) {
      this.visible = true
      this.editId = record.id
      const attachment = handleFileList(record.attachment)
      this.$nextTick(() => {
        this.form.setFieldsValue({
          title: record.title,
          content: record.content,
          link: record.link,
          showIndex: record.showIndex,
          attachment
        })
      })
      this.fileList = attachment
    },
    onRemove (record) {
      Modal.confirm({
        title: '删除确认',
        content: '确定要删除这条数据吗?',
        onOk: async () => {
          await deleteCompany(record.id)
          this.$nextTick(() => {
            this.getInfoList()
          })
        },
        onCancel: () => {
          return false
        }
      })
    }
  }
}
</script>

<style>
</style>
