<template>
  <a-card title='首页轮播图' :bordered='false'>
    <div class='operate-wrapper'>
      <a-button type='primary' @click='showModal'>编辑轮播图</a-button>
    </div>

    <a-list :grid='{ gutter: 16, column: 3 }' :data-source='listData'>
      <a-list-item slot='renderItem' slot-scope='item'>
        <a-card>
          <div style='width: 100%'>
            <BusinessImage :file-id='item.id' style='height: 160px;width: 100%'></BusinessImage>
          </div>
          <div>
          </div>
        </a-card>
      </a-list-item>
    </a-list>
    <file-upload
      ref='uploadForm'
      :files='files'
      :visible='visible'
      @create='handleCreate'
      @cancel='handleCloseModal'
      label-name='轮播图'
    />
  </a-card>
</template>

<script>
import FileUpload from '../../components/FileUpload/FileUpload'
import { getHomeSliderList, uploadInfo } from '../../api/home'
import BusinessImage from '../../components/BusinessImage/BusinessImage'

export default {
  components: { FileUpload, BusinessImage },
  data () {
    return {
      listData: [],
      visible: false
    }
  },
  mounted () {
    this.getList()
  },
  computed: {
    files () {
      return this.listData.map((item, index) => ({
        uid: '' + index,
        name: item.fileName || item.name,
        status: 'done',
        thumbUrl: item.thumbUrl,
        response: {
          code: '0',
          data: item,
          message: 'success',
          timestamp: Date.now()
        }
      }))
    }
  },
  methods: {
    handleCloseModal () {
      this.visible = false
    },
    showModal () {
      this.visible = true
    },
    // 保存数据 发送请求
    async handleCreate (data) {
      const { attachment } = data
      await uploadInfo({ id: 1, attachment })
      this.visible = false
      this.$nextTick(() => {
        this.getList()
      })
    },
    async getList () {
      const list = await getHomeSliderList('HOME')
      this.listData = list
    }
  }
}

</script>

<style scoped>
</style>
