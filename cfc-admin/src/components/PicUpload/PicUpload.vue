<template>
  <div>
    <a-upload
      name='file'
      list-type='picture-card'
      class='avatar-uploader'
      :show-upload-list='false'
      :action='action'
      :headers='headers'
      @change='handleChange'
    >
      <BusinessImage v-if='fileId' :file-id='fileId' alt='avatar' img-style='height: 100px' />

      <div class="upload-icon">
        <a-icon :type="loading ? 'loading' : 'plus'" />
      </div>
    </a-upload>
  </div>
</template>
<script>
import BusinessImage from '@/components/BusinessImage/BusinessImage'
import { UploadUrl } from '@/utils/constant'
import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'

export default {
  components: { BusinessImage },
  props: ['initFileId'],
  data () {
    return {
      loading: false,
      fileId: '',
      action: UploadUrl,
      headers: { authorization: `Bearer  ${Vue.ss.get(ACCESS_TOKEN)}` }
    }
  },
  created () {
    console.log(this.initFileId, 'init')
  },
  mounted () {
    this.fileId = this.initFileId
    console.log(this.initFileId)
  },
  methods: {
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
        return
      }
      if (info.file.response) {
        const { data } = info.file.response
        if (!data.id) {
          this.$message.error('文件上传失败，请重试！')
        }
        this.fileId = info.file.response.data.id
        this.loading = false

        this.$emit('onFileChange', this.fileId)
      }
    }
  },
  watch: {
    initFileId: {
      immediate: true,
      handler (newValue) {
        this.fileId = newValue
        console.log(newValue, 'newValue')
      }
    }
  }
}
</script>
<style>
.avatar-uploader > .ant-upload {
  width: 128px;
  height: 128px;

}
.ant-upload.ant-upload-select-picture-card > .ant-upload {
  position: relative;
}

.upload-icon {
  position: absolute;
  top: calc(50% - 16px);
  left: calc(50% - 16px)
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
