<template>
  <div class="home">
    <a-radio-group v-model="size">
      <a-radio-button value="all" @click="fetchData()">All</a-radio-button>
      <a-radio-button value="haved" @click="getAppointPackage()">已预约</a-radio-button>
      <a-radio-button value="got" @click="getHavedPackage()">已取件</a-radio-button>
      <a-radio-button value="haven" @click="getHavenPackage()">未取件</a-radio-button>
    </a-radio-group>
    <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
    <a-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure?"
          @confirm="() => onUpdate(record)"
        >
          <a href="javascript:;">确认收货</a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-button @click="handlePickUp">预约取件</a-button>
  </div>
</template>

<script>
export default {
  name: "home",
  created(){
    this.fetchData()
  },
  components: {},
  data() {
    return {
      size: "default",
      count: 2,
      columns: [
        {
          title: "运单号",
          dataIndex: "billno",
          width: "30%",
          scopedSlots: { customRender: "name" }
        },
        {
          title: "收件人",
          dataIndex: "receiver"
        },
        {
          title: "电话",
          dataIndex: "phonenum"
        },
        {
          title: "状态",
          dataIndex: "status"
        },
        {
          title: "预约时间",
          dataIndex: "apptime"
        },
        {
          title: "操作",
          dataIndex: "operation",
          scopedSlots: { customRender: "operation" }
        }
      ]
    };
  },
  computed:{
    dataSource(){
      return this.$store.state.packageList;
    }
  },
  methods: {
    onCellChange(key, dataIndex, value) {
      const dataSource = [...this.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.dataSource = dataSource;
      }
    },
    onUpdate(record) {
      record.status = "已取件"
      this.$store.dispatch("updatePackageStatus", record)
    },
    handleAdd() {
      this.$router.push("/addOrder")
    },
    handlePickUp(){
      this.$router.push("/pickUp")
    },
    fetchData(){
      this.$store.dispatch("initPackage")
    },
    getHavenPackage(){
      this.$store.dispatch("getPackageByStatus", "未取件")
    },
    getAppointPackage(){
      this.$store.dispatch("getPackageByStatus", "已预约")
    },
    getHavedPackage(){
      this.$store.dispatch("getPackageByStatus", "已取件")
    }
  }
};
</script>

<style scoped>
.editable-cell {
  position: relative;
}

.editable-cell-input-wrapper,
.editable-cell-text-wrapper {
  padding-right: 24px;
}

.editable-cell-text-wrapper {
  padding: 5px 24px 5px 5px;
}

.editable-cell-icon,
.editable-cell-icon-check {
  position: absolute;
  right: 0;
  width: 20px;
  cursor: pointer;
}

.editable-cell-icon {
  line-height: 18px;
  display: none;
}

.editable-cell-icon-check {
  line-height: 28px;
}

.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.editable-cell-icon:hover,
.editable-cell-icon-check:hover {
  color: #108ee9;
}

.editable-add-btn {
  margin-bottom: 8px;
  float: right;
}
</style>
