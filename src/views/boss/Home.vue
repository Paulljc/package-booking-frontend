<template>
  <a-layout id="components">
    <a-layout-content class="container">
      <div class="header">
        <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>Orders</a-breadcrumb-item>
        </a-breadcrumb>
        <a-button @click="vis=true">添加</a-button>
      </div>
      <a-layout class="main">
        <a-layout-sider width="200" style="background: #fff">
          <a-menu
            mode="inline"
            :defaultSelectedKeys="['1']"
            :defaultOpenKeys="['sub1']"
            style="height: 100%"
          >
            <a-menu-item key="1" @click="fetchAll">All</a-menu-item>
            <a-menu-item key="2" @click="filter(2)">已取件</a-menu-item>
            <a-menu-item key="3" @click="filter(1)">已预约</a-menu-item>
            <a-menu-item key="4" @click="filter(0)">未预约</a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ padding: '0 24px', minHeight: '80vh' }">
          <order-table />
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <create-modal :vis.sync="vis"/>
  </a-layout>
</template>

<script>
import OrderTable from '../../components/OrderTable'
import CreateModal from '../../components/CreateModal'

export default {
  components: {
    OrderTable,
    CreateModal
  },
  data () {
    return {
      vis: false
    }
  },
  methods: {
    filter (status) {
      this.$store.dispatch('findByStatus', status)
    },
    async fetchAll () {
      await this.$store.dispatch('fetchAllOrders')
    }
  },
  async created () {
    await this.fetchAll()
  }
}
</script>

<style>
#components {
  min-height: 100vh;
}

#components .logo {
  width: 120px;
  height: 31px;
  background: rgba(255,255,255,.2);
  margin: 16px 28px 16px 0;
  float: left;
}

.container {
  padding: 0 50px;
  text-align: left;
}

.main {
  padding: 24px 0;
  background: #fff;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
