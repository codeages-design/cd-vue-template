<template>
  <div class="login-form">
    <div class="login-form__title">登录</div>
    <cd-form :model="loginForm" label-position="top" ref="form" :formItem="formItem" :buttons="buttons">
      <span style="font-size: 12px" slot="el-form-item">请使用try6.edusoho.cn上的账号登录</span>
    </cd-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      formItem: [
        {
          label: '账号',
          prop: 'username',
          type: 'input',
          placeholder: '邮箱/手机/用户名',
        },
        {
          label: '密码',
          prop: 'password',
          type: 'password',
          placeholder: '密码',
        }
      ],
      loginForm: {
        username: null,
        password: null
      },
      isLoading: false,
      buttons: [
        {
          type: 'primary',
          class: 'cvp-block cvp-width-full',
          loading: this.isLoading,
          method: () => this.submitHandler(model),
        }
      ],
    }
  },
  methods: {
    ...mapActions([
      'userLogin'
    ]),
    submitHandler(model) {
      this.isLoading = true;
      this.userLogin({
        username: model.username,
        password: model.password
      }).then((res) => {
        console.log('loginSuccess', res);
        this.isLoading = false;

        const redirect = decodeURIComponent(this.$route.query.redirect || 'homepage');
        console.log('redirect', redirect);
        this.$router.push({
          name: redirect
        });

      }).catch((error) => {
        console.log('loginCatch', error);
        this.isLoading = false;
        this.$message.error(error.message);
      })
    },
  }
}
</script>

<style lang="less">
.login-form {
  margin: 50px auto;
  width: 400px;
  padding: 24px;
  border-radius: 4px;
  background: #fff;
  &__title {
    font-size: 20px;
    margin-bottom: 24px;
    text-align: center;
  }
}
</style>
