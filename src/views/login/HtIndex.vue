<template>
    <div class="login-page">
    <el-card >
    <!-- 具名插槽 -->
    <template #header>面经后台管理系统</template>
<!--  -->
<el-form ref="form" status-icon  label-width="70px" class="demo-ruleForm" :model="user" :rules="rules">
  <el-form-item label="账号" prop="username">
    <el-input type="text"  v-model="user.username" ></el-input>
  </el-form-item>
  <el-form-item label="密码"   prop="password">
    <el-input type="password" autocomplete="off" show-password v-model="user.password" ></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="login">提交</el-button>
    <el-button @click="reset" >重置</el-button>
  </el-form-item>

</el-form>
    </el-card>
    </div>
</template>

<script>
import { loginAPI } from '@/api/user'
export default {
  data () {
    return {
      // 数据项
      user: {
        username: '',
        password: ''
      },
      // 验证对象
      rules: {
        username: [
          // required比填，message验证不通过时的提示:trigger触发时机,可以写多个
          { required: true, message: '请输入账号', trigger: ['blur', 'change'] },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }], // 用户名验证规则
        password: [{ required: true, message: '请输入密码', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }] // 密码验证规则
      }
    }
  },
  methods: {
    login () {
      // 进行完整的校验,校验通过在发送ajax请求
      this.$refs.form.validate(async valid => {
        if (valid) {
          // 进入这个if区间表示验证通过
          try {
            const res = await loginAPI(this.user)

            console.log('res:', res)
            //   localStorage.setItem('mj-pc-token', res.data.token)
            this.$store.commit('user/updateToken', res.data.token)
            this.$message.success('登录成功')
            this.$router.push('/dashboard')
          } catch (e) {
            if (e.response) {
              this.$message.error(e.response.data.message)
            } else {
              this.$message.error('登录错误')
            }
          }
        } else {
          return false
        }
      })
      // this.$refs.form()
    },
    reset () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.login-page{
    height: 100vh;
    background: url('@/assets/login-bg.svg') no-repeat center /cover;
}
.el-card{
    width: 420px;
    position: absolute;
    left: 50%;
    top:50%;
    translate:-50% -50%;
    // 样式穿透用于修改子组件元素的样式
    ::v-deep .el-card__header{
        text-align: center;
        background-color: #727cf5;
        color: #fff;
        height: 80px;
        line-height: 80px;
        padding: 0;
    }
}

.el-form-item:last-child{
margin-left: 0;
}
.el-input{
    background-color: #fff ;
}
</style>
