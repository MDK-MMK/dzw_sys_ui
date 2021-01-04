<template>
  <div>
    <el-table
      :data="tables"
      style="width: 30%;display"
      >
      <el-table-column
        prop="dename"
        label="部门"
        sortable
        width="180">
      </el-table-column>

    </el-table>

    <el-table
      :data="tableData"
      style="width: 70%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        :formatter="formatter">
      </el-table-column>
    </el-table>
  </div>
</template>

 

<script>
  export default {
    data() {
      return {
        tableData: [],
        tables:[]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      }
    }
  }
</script>