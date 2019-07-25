<template>
  <a-table :columns="columns" :rowKey="item => item.id" :dataSource="data">
    <span slot="status" slot-scope="record">
      <span v-text="mapStatus(record.orderStatus)" />
    </span>
    <span slot="appointmentTime" slot-scope="record">
      <span v-if="record.orderStatus===1" v-text="formatTime(record.appointmentTime)" />
    </span>
    <span slot="action" slot-scope="record">
      <a-button v-if="record.orderStatus!==2" @click="take(record.id)">确认收货</a-button>
    </span>
  </a-table>
</template>

<script>
import moment from 'moment'

const columns = [
  { title: '运单号', dataIndex: 'orderNo' },
  { title: '名字', dataIndex: 'name' },
  { title: '电话', dataIndex: 'phone' },
  { title: '状态', key: 'status', scopedSlots: { customRender: 'status' } },
  { title: '预约时间', key: 'appointmentTime', scopedSlots: { customRender: 'appointmentTime' } },
  { title: '操作', key: 'action', scopedSlots: { customRender: 'action' } }
]

export default {
  data () {
    return {
      columns
    }
  },
  computed: {
    data () {
      return this.$store.state.orders
    }
  },
  methods: {
    take (id) {
      this.$store.dispatch('updateOrderStatus', { id, status: 2 })
    },
    mapStatus (status) {
      return status === 2 ? '已取件' : status === 1 ? '已预约' : '未预约'
    },
    formatTime (time) {
      if (time === null) return '暂未预约'
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style>
</style>
