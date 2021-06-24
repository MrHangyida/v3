<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到者也</h5>
    <ValidateInputForm @form-submit="onFormSubmit" ref="loginForm">
      <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
        <VaildateInput
          :rules="emailRules"
          v-model="emailVal"
          type="email"
          placeholder="请输入邮箱地址"
        ></VaildateInput>
      </div>
      <div class="mb-3 row">
        <label for="inputPassword" class="col-sm-2 col-form-label"
          >Password</label
        >
        <VaildateInput
          :rules="passwordRules"
          v-model="passwordVal"
          type="password"
          placeholder="请输入密码"
        ></VaildateInput>
      </div>
      <template v-slot:submit>
        <button type="submit" class="btn btn-primary btn-block btn-large">
          登录
        </button>
      </template>
    </ValidateInputForm>
  </div>
</template>
<script lang="ts">
import ValidateInputForm from '../components/ValidateInputForm.vue';
import VaildateInput, { RulesProp } from '../components/ValidateInput.vue';
import createMessage from '../components/createMessage'
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
export default defineComponent({
  name: 'Login',
  components: { VaildateInput, ValidateInputForm },
  setup() {
    const router = useRouter();
    const store = useStore();
    const loginForm = ref();
    const emailVal = ref('');
    const passwordVal = ref('');
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' },
    ];
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
    ];
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payLoad={
          email:emailVal.value,
          password:passwordVal.value
        }
        store.dispatch('loginAndFetch',payLoad).then(data=>{
          console.log(data,'data')
         createMessage('登录成功 2秒后跳转首页', 'success')
         setTimeout(() => {
            router.push('/')
        }, 2000)
        }).catch(e=>{
          console.log(e)
        })
        // store.commit('login', true);
      } else {
        loginForm.value.clearInputs();
      }
    };
    return {
      loginForm,
      emailVal,
      passwordVal,
      emailRules,
      passwordRules,
      onFormSubmit,
    };
  },
});
</script>
<style lang="scss" scoped>
.w-330 {
  max-width: 330px;
}
.btn-block {
  display: block;
  width: 100%;
}
</style>
