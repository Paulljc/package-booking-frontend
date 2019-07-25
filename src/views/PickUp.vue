<template>
  <div>
    <div>
      预约取件
    </div>
     <a-form
    :form="form"
    @submit="handleSubmit"
  >
    <a-form-item
      label="运单号："
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-input
        v-decorator="[
          'billno',
          {rules: [{ required: true, message: 'Please input your note!' }]}
        ]"
      />
    </a-form-item>
    <a-form-item
      label="预约时间："
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 12 }"
    >
      <a-date-picker
        v-decorator="['apptime', config]"
        format="YYYY-MM-DD HH:mm:ss"
        :showTime="{ defaultValue: new Date() }"
    />
    </a-form-item>
    <a-button
        type="primary"
        html-type="submit"
      >
        Submit
      </a-button>
  </a-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this),
      config: {
        rules: [{ type: 'object', required: true, message: 'Please select time!' }],
      }
    };
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          // this.$store.dispatch("modifyPackage", values)
        }
      });
    }
  }
}
</script>

<style scoped>

</style>
