<template>
  <div>
    <a-list item-layout='horizontal' :bordered='true' :data-source='[{title}]'>
      <a-list-item slot='renderItem' slot-scope='item'>
        <a slot='actions' @click='openUpload()'>编辑</a>
        <a-list-item-meta>
          <a slot='title'>{{ item.title }}</a>
        </a-list-item-meta>
      </a-list-item>
    </a-list>
    <FileUpload
      :files='files'
      ref='uploadForm'
      :visible='isShowUpload'
      @create='handleCreate'
      @cancel='handleCloseModal'
      :label-name='title'
    />
  </div>
</template>
<script>

import FileUpload from '../FileUpload/FileUpload'
import { handleAttachmentId } from '../../utils/constant'
import { uploadInfo } from '../../api/home'
import { getSliderList } from '../../api/common'

export default {
  props: ['title', 'code', 'id'],
  components: { FileUpload },
  data () {
    return {
      fileList: [],
      uploading: false,
      isShowUpload: false,
      listData: [],
      childId: ''
    }
  },
  created () {
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
    openUpload () {
      this.isShowUpload = true
    },
    handleCloseModal () {
      const form = this.$refs.uploadForm.form
      form.resetFields()
      this.isShowUpload = false
    },
    handleCreate () {
      const form = this.$refs.uploadForm.form
      form.validateFields(async (err, values) => {
        if (err) {
          return
        }
        const attachment = handleAttachmentId(values.attachment.fileList)
        await uploadInfo({ id: this.childId, attachment })
        this.$nextTick(() => {
          this.isShowUpload = false
          this.getList()
        })
      })
    },
    async getList () {
      const list = await getSliderList(this.code)
      this.listData = list
    }
  },
  watch: {
    id: {
      immediate: true,
      handler (newValue) {
        this.childId = newValue
      }
    }
  }
}
</script>
