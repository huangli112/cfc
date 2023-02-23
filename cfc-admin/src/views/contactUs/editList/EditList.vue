<template>
  <div>
    <a-list
      :loading='loading'
      item-layout='horizontal'
      :data-source='data'
      size='small'
    >
      <a-list-item slot='renderItem' slot-scope='item, index'>
        <a slot='actions' @click='editValue(index, item)' v-if='activeId !== index'>编辑</a>
        <template v-if='activeId === index '>
          <a slot='actions' @click='cancel(item)'> 取消</a>
          <a slot='actions' @click='onChangeOk'> 确定</a>
        </template>

        <a-list-item-meta>
          <template slot='description'>
            <a-input v-if="activeId === index && item.id !== 'WECHAT'" :value='item.value'
                     @change='handleInputChange($event,item.id)'
                     style='width: 600px'></a-input>
            <template  v-else-if="item.id === 'WECHAT'">
              <BusinessImage :file-id='item.attachment[0].id' img-style='width:80px; height:80px'></BusinessImage>
            </template>
            <div v-else>{{ item.value }}</div>
          </template>
          <h3 slot='title'>{{ item.name }}</h3>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <file-upload
      v-if="files"
      ref='uploadForm'
      :files='files'
      :visible='visible'
      @create='handleCreate'
      @cancel='handleCloseModal'
      label-name='微信公众号'
    />

  </div>

</template>
<script>
import { getContactInfo, updateInfo } from '@/api/common'
import BusinessImage from '@/components/BusinessImage/BusinessImage'
import FileUpload from '@/components/FileUpload/FileUpload'
import { handleAttachmentId, handleFileList } from '@/utils/constant'

export default {
  components: {
    BusinessImage, FileUpload
  },
  data () {
    return {
      loading: true,
      data: [],
      activeId: -1,
      visible: false,
      inputValue: {}
    }
  },
  mounted () {
    this.getData()
    this.loading = false
  },
  computed: {
    files () {
      const target = this.data.find((item, index) => index === this.activeId)
      if (target) {
        return handleFileList(target.attachment)
      }
      return []
    }
  },
  methods: {
    async getData () {
      this.data = await getContactInfo()
    },
    cancel (item) {
      this.activeId = -1
    },
    editValue (index, item) {
      this.activeId = index
      this.inputValue = { id: item.id }
      if (item.id === 'WECHAT') {
        this.visible = true
        // this.handleCreate(item)
      }
    },
    handleCreate (e) {
      // 处理请求
      const { attachment } = this.$refs.uploadForm.form.getFieldsValue(['attachment'])
      console.log(attachment)
      this.inputValue = {
        id: this.inputValue.id,
        attachment: handleAttachmentId(attachment.fileList)
      }
      this.onChangeOk()
      this.visible = false
    },
    handleCloseModal () {
      this.visible = false
      this.activeId = -1
    },
    handleInputChange (e, id) {
      this.inputValue = { ...this.inputValue, value: e.target.value }
    },
    async onChangeOk () {
      await updateInfo(this.inputValue)
      this.$nextTick(() => {
        this.getData()
      })
      this.activeId = -1
    }
  }
}
</script>
<style>

</style>
