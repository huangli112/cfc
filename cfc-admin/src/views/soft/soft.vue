<template>
  <div>
    <a-card title='软件产品' :bordered='false'>
      <a-button @click='handleAdd' type='primary'>新增模块</a-button>
      <a-table style='margin-top: 40px;' :columns='columns' :dataSource='dataSource' rowKey='name'
               :pagination='false'>
        <span slot='updateTime' slot-scope='updateTime'>{{ new Date(updateTime) | formatDate('yyyy-MM-dd') }}</span>

        <div slot='actions' slot-scope='record'>
          <a @click='onEditContent(record)'>编辑</a>
          <a-divider type='vertical' />
          <a @click='onDeleteContent(record.id)'>删除</a>
        </div>
      </a-table>
      <soft-modal :visible='visible' :data='formData' :title='title' :module='selectModule' @close='onModalClose'
                  @ok='handleOk'></soft-modal>
    </a-card>
  </div>
</template>

<script>
import SoftModal from './components/SoftModal'
import { tableMixin } from '@/mixins'
import { getSoftInfoList, deleteSoft } from '@/api/soft.js'

const columns = [
  {
    title: '模块名',
    dataIndex: 'title',
    align: 'center',
    width: 100
  },
  {
    title: '显示顺序',
    dataIndex: 'showIndex',
    align: 'center',
    width: 100
  },
  {
    title: '标题',
    dataIndex: 'title',
    align: 'center',
    width: 100
  },
  {
    title: '副标题',
    dataIndex: 'subheading',
    align: 'center'
  },
  {
    title: '内容',
    dataIndex: 'content',
    align: 'center'
  },
  {
    title: '内容标签',
    dataIndex: 'contentDescription',
    align: 'center'
  },
  {
    title: '链接',
    dataIndex: 'link',
    align: 'center'
  },
  {
    title: '更新时间',
    dataIndex: 'createdTime',
    scopedSlots: { customRender: 'createdTime' },
    width: 160,
    align: 'center'
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'actions' },
    width: 120,
    align: 'center',
    fixed: 'right'
  }
]

export default {
  components: { SoftModal },
  mixins: [tableMixin],
  data () {
    return {
      dataSource: [],
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 }
      },
      form: this.$form.createForm(this),
      visible: false,
      title: false,
      formData: {}
    }
  },
  methods: {
    /* list */
    async getList () {
      const code = 'SOFTWARE_PRODUCT'
      const res = await getSoftInfoList(code)
      res.map(item => {
        item.contentDescription = item.contentDescription.join(',')
        return item
      })
      this.dataSource = res
    },
    /* 新增Modal */
    handleAdd () {
      this.formData = {}
      this.visible = true
      this.title = false
    },
    /* 关闭Modal */
    onModalClose () {
      this.title = false
      this.visible = false
    },
    /* 编辑Modal */
    onEditContent (data) {
      this.formData = data
      this.visible = true
      this.title = true
    },
    /* 删除 */
    async onDeleteContent (id) {
      const self = this
      this.$confirm({
        title: '删除',
        content: `确定要删除该模块吗？`,
        okText: '删除',
        okType: 'danger',
        async onOk () {
          await deleteSoft(id)
          self.$message.success('删除成功')
          self.getList()
        },
        onCancel () {
          self.$message.warning('取消删除')
        }
      })
    },
    /* 提交成功 */
    handleOk () {
      this.getList()
      this.onModalClose()
    }
  },
  created () {
    this.columns = columns
    this.getList()
  }
}
</script>
