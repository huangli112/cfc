<template>
  <a-card title='合作伙伴' :bordered='false'>
    <div class='operate-wrapper'>
      <a-button type='primary' @click='showModal'>编辑合作伙伴</a-button>
    </div>

    <a-list :grid='{ gutter: 16, column: 4 }' :data-source='listData'>
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
      ref="uploadForm"
      :files='files'
      :visible='visible'
      @create="handleCreate"
      @cancel='handleCloseModal'
      label-name="合作图片"
    />
  </a-card>
</template>

<script>

import FileUpload from '../../components/FileUpload/FileUpload'
import BusinessImage from '../../components/BusinessImage/BusinessImage'
import { uploadInfo } from '../../api/home'
import { getPartnerList } from '../../api/partner'

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
      await uploadInfo({ id: 13, attachment })
      this.visible = false
      this.$nextTick(() => {
        this.getList()
      })
    },
    async getList () {
      const list = await getPartnerList('COOPERATIVE_PARTNER')
      this.listData = list
    }
  }
}

</script>

<style scoped>
</style>
