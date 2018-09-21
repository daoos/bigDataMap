
<template>
    <el-dialog :title="headTitle" :visible.sync="isShow">
        <el-table :data="gridData">
            <el-table-column v-for="(item,k) in tableData" :key="k" :property="item.property" :label="item.lable" width="item.width"></el-table-column>
            <!-- <el-table-column property="name" label="姓名" width="200"></el-table-column>
            <el-table-column property="address" label="地址"></el-table-column> -->
        </el-table>
    </el-dialog>
</template>
<script>
// <!-- 详情组件 -->
    // <tool1 headTitle="详情" :gridData = "gridData" :dialogTableVisible="dialogTableVisible" :tableData="tableData"> </tool1>
// dialogTableVisible:true,
//       gridData: [
//         {
//           date: "2016-05-02",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄"
//         },
//         {
//           date: "2016-05-04",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄"
//         },
//         {
//           date: "2016-05-01",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄"
//         },
//         {
//           date: "2016-05-03",
//           name: "王小虎",
//           address: "上海市普陀区金沙江路 1518 弄"
//         }
//       ],
//       tableData:[
//         {property:'date',label:'日期',width:'200'},
//         {property:'name',label:'姓名',width:'200'},
//         {property:'address',label:'地址',width:'200'},
//       ],
export default {
  props: {
    //   出发显示
    dialogTableVisible: {
      type: Boolean,
      default: false
    },
    // 标题
    headTitle: {
      type: String,
      default: "数据详情"
    },
    // 行列详情
    gridData: {
      type: Array,
      default: []
    },
    // 数据详情
    tableData: {
      type: Array,
      default: []
    }
  },
  created() {
    if (this.dialogTableVisible) {
      this.isShow = this.dialogTableVisible;
    }
  },
  data() {
    return {
      isShow: false
    };
  }
};
</script>

