<template>
  <div class="container">
    <GlobalHeader :user="currentUser"></GlobalHeader>
    <ColumnList :list="list"></ColumnList>
    <ValidateInputForm @form-submit="onFormSubmit" ref="loginForm">
      <div class="mb-3 row">
        <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
        <VaildateInput
          ref="inputRef"
          :rules="emailRules"
          v-model="emailVal"
          type="email"
          placeholder="请输入邮箱地址"
        ></VaildateInput>
        {{ emailVal }}
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
        <span class="btn btn-danger">Submit</span>
      </template>
    </ValidateInputForm>

    <!-- <div class="mb-3 row">
      <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
      <input
        type="email"
        class="form-control"
        id="staticEmail"
        v-model="emailRef.val"
        @blur="validateEmail"
      />
      <div class="form-text" v-if="emailRef.error">{{ emailRef.message }}</div>
    </div> -->
  </div>
</template>
<script lang="ts">
import 'bootstrap/dist/css/bootstrap.min.css';
import { defineComponent, ref } from 'vue';
import ColumnList, { ColumnProps } from './components/ColumnList.vue';
import GlobalHeader, { UserProps } from './components/GlobalHeader.vue';
import VaildateInput, { RulesProp } from './components/ValidateInput.vue';
import ValidateInputForm from './components/ValidateInputForm.vue';
const currentUser: UserProps = {
  isLogin: true,
  id: 1,
  name: 'H_yiDa',
};
const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    // avater: 'https://www.58pic.com/c/22014876',
    description: 'H_yiDa H_yiDa H_yiDa H_yiDa H_yiDa H_yiDa H_yiDa H_yiDa',
  },
  {
    id: 2,
    title: 'test2的专栏',
    avater: require('./assets/logo.png'),
    description: 'H_yiDa2 H_yiDa2 H_yiDa2 H_yiDa2 H_yiDa2 H_yiDa2 H_yiDa2',
  },
  {
    id: 3,
    title: 'test3的专栏',
    avater: require('./assets/logo.png'),
    description: 'H_yiDa3 H_yiDa3 H_yiDa3 H_yiDa3 H_yiDa3 H_yiDa3 H_yiDa3',
  },
  {
    id: 4,
    title: 'test4的专栏',
    avater: require('./assets/logo.png'),
    description: 'H_yiDa4 H_yiDa4 H_yiDa4 H_yiDa4 H_yiDa4 H_yiDa4 H_yiDa4',
  },
  {
    id: 5,
    title: 'test5的专栏',
    avater: require('./assets/logo.png'),
    description: 'H_yiDa5 H_yiDa5 H_yiDa5 H_yiDa5 H_yiDa5 H_yiDa5 H_yiDa5',
  },
];
// interface EmaliRules {
//   val: string;
//   error: boolean;
//   message: string;
// }
export default defineComponent({
  name: 'App',
  components: { ColumnList, GlobalHeader, VaildateInput, ValidateInputForm },
  setup() {
    const inputRef = ref();
    const loginForm = ref();
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' },
    ];
    const passwordRules: RulesProp = [
      { type: 'required', message: '密码不能为空' },
    ];
    // const emailRef: EmaliRules = reactive({
    //   val: '',
    //   error: false,
    //   message: '',
    // });
    const emailVal = ref('');
    const passwordVal = ref('');
    const onFormSubmit = (result: boolean) => {
      console.log(inputRef.value.validateInput());

      if (result) {
        console.log(result);
      } else {
        console.log(loginForm.value, 999);
        loginForm.value.clearInputs();
      }
    };
    // const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    // const validateEmail = () => {
    //   if (emailRef.val.trim() === '') {
    //     emailRef.error = true;
    //     emailRef.message = 'not can empty';
    //   } else if (!emailReg.test(emailRef.val)) {
    //     emailRef.error = true;
    //     emailRef.message = 'should be valid email';
    //   } else {
    //     emailRef.error = false;
    //   }
    // };

    return {
      list: testData,
      currentUser,
      // emailRef,
      // validateEmail,
      emailRules,
      emailVal,
      passwordRules,
      passwordVal,
      onFormSubmit,
      inputRef,
      loginForm,
    };
  },
});
</script>
<style lang="scss">
* {
  margin: 0;
  padding: 0;
  list-style: none;
  font-weight: normal;
  text-decoration: none;
}
body,
html,
#app {
  width: 100%;
  height: 100%;
}
</style>
