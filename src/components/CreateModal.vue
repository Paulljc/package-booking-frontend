<template>
  <a-modal v-model="visible" title="包裹入库" @ok="create" okText="确定" cancelText="取消">
    <a-form :form="form" @submit="create">
      <a-form-item label="运单号" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="[ 'orderNo', {rules: [{ required: true, message: '请输入订单号' }]} ]" />
      </a-form-item>
      <a-form-item label="收件人" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="[ 'name', {rules: [{ required: true, message: '请输入收件人姓名' }]} ]" />
      </a-form-item>
      <a-form-item label="电话" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
        <a-input v-decorator="[ 'phone', {rules: [{ required: true, message: '请输入收件人电话' }]} ]" />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
export default {
  props: {
    vis: Boolean
  },
  data () {
    return {
      form: this.$form.createForm(this)
    }
  },
  methods: {
    create () {
      this.form.validateFields(async (err, order) => {
        if (!err) {
          order.orderStatus = 0
          order.orderNo = Number(order.orderNo)
          await this.$store.dispatch('createOrder', order)
          this.visible = false
          this.$message.success('包裹入库成功')
        }
      })
    }
  },
  computed: {
    visible: {
      get () {
        return this.vis
      },
      set (value) {
        this.$emit('update:vis', value)
      }
    }
  }
}
</script>

<style>
</style>
