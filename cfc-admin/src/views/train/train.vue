<template>
  <div>
    <a-card title='实训板块列表' :bordered='false'>
      <div class='operate-wrapper'>
        <a-button type='primary' @click='addInfo'>新增实训板块</a-button>
      </div>
      <a-table
        :columns='columns'
        :dataSource='rows'
        rowKey='id'
        :pagination='pagination'
        @change='handleTableChange'
      >
        <template slot='attachment' slot-scope='text, record'>
          <template v-if='!record.attachment.length'>-</template>
          <BusinessImage v-else :file-id='record.attachment[0].id' img-style='height: 80px;'></BusinessImage>
        </template>
        <template slot='content' slot-scope='text'>
          <a-tooltip placement='topLeft' :title='text'>
            <span>{{ text }}</span>
          </a-tooltip>
        </template>
        <div slot='actions' slot-scope='record'>
          <a @click='onEdit(record)' href='javascript:0;'>编辑</a>
          <a-divider type='vertical' />
          <a @click='onDelete(record.id)' href='javascript:0;'>删除</a>
        </div>
      </a-table>
    </a-card>

    <business-modal
      :visible='visible'
      :title='title'
      :id='id'
      @ok='handleCreate'
      @cancel='handleCloseModal' />
  </div>
</template>

<script>
import { queryFormMixin, tableMixin } from '@/mixins'
import BusinessModal from '../../components/BusinessModal/BusinessModal'
import { deleteContentInfo, getContentList } from '@/api/common'
import { Modal } from 'ant-design-vue'
import BusinessImage from '@/components/BusinessImage/BusinessImage'

const columns = [
  {
    title: '主标题',
    dataIndex: 'title'

  },
  {
    title: '英文标题',
    dataIndex: 'enTitle'

  },
  {
    title: '内容',
    dataIndex: 'content',
    ellipsis: true,
    scopedSlots: { customRender: 'content' }
  },
  {
    title: '优先级',
    dataIndex: 'showIndex',
    ellipsis: true
  },
  {
    title: '链接',
    dataIndex: 'link',
    ellipsis: true
  },
  {
    title: '实训板块附件',
    dataIndex: 'attachment',
    ellipsis: true,
    width: '30%',
    scopedSlots: { customRender: 'attachment' }
  },
  {
    title: '操作',
    width: '10%',
    scopedSlots: { customRender: 'actions' }
  }
]

export default {
  mixins: [queryFormMixin, tableMixin],
  components: { BusinessModal, BusinessImage },
  data () {
    return {
      // 查询条件
      columns: columns,
      visible: false,
      rows: [],
      title: '',
      id: ''
    }
  },

  computed: {},
  methods: {
    async getInfoList () {
      this.rows = await getContentList('TRAINING_SECTION')
    },
    handleCloseModal () {
      this.visible = false
      this.id = ''
    },
    addInfo () {
      this.visible = true
      this.title = '新增实训板块'
    },
    // 保存数据 发送请求
    handleCreate () {
      this.visible = false
      this.id = ''
      this.getInfoList()
    },
    onEdit (row) {
      this.visible = true
      this.title = '编辑实训板块'
      this.id = row.id
    },
    async onDelete (id) {
      Modal.confirm({
        title: '删除确认',
        content: '确定要删除这条数据吗?',
        onOk: async () => {
          await deleteContentInfo(id)
          this.$message.success('删除成功')
          this.$nextTick(() => {
            this.$message.success('取消删除')
            this.getInfoList()
          })
        },
        onCancel: () => {
          return false
        }
      })
    },
    onModalClose (isRefresh) {
      this.visible = false
    }

  },
  created () {
    this.getInfoList()
  }

}
</script>
