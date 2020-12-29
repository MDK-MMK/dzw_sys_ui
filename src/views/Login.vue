<template>

</template>
<script>
export default {
    data(){
        return{

        };
    },
    methods:{
         //登录
    submitForm() {
        //axios
      const axios = require("axios");
      let that = this;
      axios
        .post("http://127.0.0.1:8080/mypaimai/api/userss/login", that.Users)
        .then(function (res) {
          //console.log(res.data);
          
            that.$router.push("/home");//路由跳转（跳转到主页面）router/index.js(/home)
        });
    },
    }
}
</script>