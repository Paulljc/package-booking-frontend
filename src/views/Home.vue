<template>
  <div class="home">
    <a-radio-group v-model="size">
      <a-radio-button value="all">All</a-radio-button>
      <a-radio-button value="haved">已预约</a-radio-button>
      <a-radio-button value="got">已取件</a-radio-button>
      <a-radio-button value="haven">未取件</a-radio-button>
    </a-radio-group>
    <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
    <a-table bordered :dataSource="dataSource" :columns="columns">
      <template slot="operation" slot-scope="text, record">
        <a-popconfirm
          v-if="dataSource.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.key)"
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
    onDelete(key) {
      const dataSource = [...this.dataSource];
      this.dataSource = dataSource.filter(item => item.key !== key);
    },
    handleAdd() {
      this.$router.push("/addOrder")
    },
    handlePickUp(){
      this.$router.push("/pickUp")
    },
    handleChange(value) {
      console.log(`Selected: ${value}`);
    },
    fetchData(){
      this.$store.dispatch("initPackage")
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
