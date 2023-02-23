<template>
  <a-card title='软件产品' :bordered='false'>
    <div>
      <div :style="{ marginBottom: '16px' }">
        <a-button @click='add'>
          添加子模块
        </a-button>
      </div>
      <a-tabs v-model='activeKey' hide-add type='editable-card' @edit='onEdit'>
        <a-tab-pane v-for='pane in panes' :key='pane.key' :tab='pane.title' :closable='pane.closable'>
          <contentForm :form-data='pane.content' />
        </a-tab-pane>
      </a-tabs>
    </div>
  </a-card>

</template>
<script>

import { Modal } from 'ant-design-vue'
import contentForm from './contentForm'

export default {
  components: { contentForm },
  data () {
    const panes = [
      {
        id: '111',
        title: 'Tab 1',
        content: {
          title: 'test',
          subheading: '23424',
          copywriting: '12454'

        },
        key: '1'
      },
      { title: 'Tab 2', content: 'Content of Tab 2', key: '2' }
    ]
    return {
      activeKey: panes[0].key,
      panes,
      newTabIndex: 0
    }
  },
  methods: {
    callback (key) {
      console.log(key)
    },
    onEdit (targetKey, action) {
      this[action](targetKey)
      console.log(action)
    },
    add () {
      const panes = this.panes
      const activeKey = `newTab${this.newTabIndex++}`
      panes.push({
        title: `新增标签`,
        content: {},
        key: activeKey
      })
      this.panes = panes
      this.activeKey = activeKey
    },
    remove (targetKey) {
      console.log(targetKey)
      Modal.confirm({
        title: '删除确定',
        content: '确定要删除该tab吗？',
        onCancel: function () {
          console.log(111)
        },
        onOk: this.handleRemove(targetKey)
      })
    },
    handleRemove (targetKey) {
      console.log(targetKey)
      // setTimeout(()=> {
      //   let activeKey = this.activeKey
      //   let lastIndex
      //   this.panes.forEach((pane, i) => {
      //     if (pane.key === targetKey) {
      //       lastIndex = i - 1
      //     }
      //   })
      //   const panes = this.panes.filter(pane => pane.key !== targetKey)
      //   if (panes.length && activeKey === targetKey) {
      //     if (lastIndex >= 0) {
      //       activeKey = panes[lastIndex].key
      //     } else {
      //       activeKey = panes[0].key
      //     }
      //   }
      //   this.panes = panes
      //   this.activeKey = activeKey
      // })
    }
  }
}
</script>
