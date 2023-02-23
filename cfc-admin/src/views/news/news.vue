<template>
  <div>
    <a-card title='新闻动态Banner图' :bordered='false'>
      <CarouselUpload title='新闻动态banner图' code='NEWS_INFORMATION' :id='14' />
    </a-card>

    <a-card title='新闻动态列表' :bordered='false'>
      <div class='operate-wrapper'>
        <a-button type='primary' @click='linkNews()'>新增新闻动态</a-button>
      </div>
      <a-table
        :columns='columns'
        :dataSource='rows'
        rowKey='id'
        :pagination='pagination'
        @change='handleTableChange'
      >
        <template slot='copywriting' slot-scope='text'>
          <a-tooltip placement='topLeft' :title='text'>
            <span>{{ text }}</span>
          </a-tooltip>
        </template>
        <div slot='actions' slot-scope='record'>
          <a @click='linkNews(record.id)' href='javascript:0;'>编辑</a>
          <a-divider type='vertical' />
          <a @click='onDelete(record.id)' href='javascript:0;'>删除</a>
        </div>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import { tableMixin, rangePickerMixin } from '@/mixins'
import CarouselUpload from '../../components/CarouselUpload/'
import { deleteContentInfo, getContentList } from '@/api/common'

const columns = [
  {
    title: '标题',
    key: 'title',
    dataIndex: 'title',
    align: 'center'
  },
  {
    title: '优先级',
    dataIndex: 'showIndex',
    key: 'showIndex',
    align: 'center'
  },
  {
    title: '时间',
    dataIndex: 'date',
    key: 'date',
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
  components: { CarouselUpload },
  mixins: [tableMixin, rangePickerMixin],
  data () {
    return {
      // 查询条件
      form: {},
      visible: false,
      rows: [],
      columns: columns
    }
  },
  computed: {},
  methods: {
    linkNews (id) {
      this.$router.push({
        path: `/news-detail/${id}`
      })
    },

    onEdit (row) {
      this.editId = row.id
      this.visible = true
    },
    async onDelete (id) {
      const self = this
      this.$confirm({
        title: '删除',
        content: `确定要删除该选项吗？`,
        okText: '删除',
        okType: 'danger',
        async onOk () {
          await deleteContentInfo(id)
          self.$message.success('删除成功')
          this.getNewsList()
        },
        onCancel () {
          self.$message.warning('取消删除')
        }
      })
    },
    async getNewsList () {
      this.rows = await getContentList('NEWS_INFORMATION')
    }
  },
  mounted () {
    this.getNewsList()
  }

}
</script>
