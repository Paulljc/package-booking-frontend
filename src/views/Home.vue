<template>
  <div class="home">
    <h2>预约取件</h2>
    <div class="item">
      <span>运单号:</span>
      <input v-model="orderNo">
    </div>
    <div class="item">
      <span>预约时间:</span>
      <a-date-picker
        showTime
        format="YYYY-MM-DD HH:mm:ss"
        v-model="time"
      />
    </div>
    <a-button @click="appoint">预约</a-button>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'home',
  data () {
    return {
      orderNo: '',
      time: null
    }
  },
  methods: {
    async appoint () {
      await this.$store.dispatch('updateOrderTimeAndStatusByOrderNo', {
        'orderNo': this.orderNo,
        appointmentTime: this.time.valueOf(),
        status: 1
      })
      this.$message.success('预约成功')
    }
  }
}
</script>
