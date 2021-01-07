<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always">
        <baidu-map>
          <bm-view class="map"> </bm-view>
          <bm-driving
            start="新街口"
            end="新街口"
            startCity="北京"
            endCity="南京"
            :auto-viewport="true"
            :waypoints="['呼和浩特', { lng: 112.53, lat: 37.87 }, '陕西兵马俑']"
          ></bm-driving>
        </baidu-map>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted() {
    
  },
  methods: {
    
  },
};
</script>
<style scoped>
</style>