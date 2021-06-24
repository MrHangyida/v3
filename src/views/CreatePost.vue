<template>
  <div class="create-post-page container">
    <h4>新建文章</h4>
     <uploader
      action="/upload"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      :beforeUpload="uploadCheck"
      @fileUploader="handleFileUploaded"
      @fileUploaderError="fileUploaderError"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.data.url">
      </template>
    </uploader>
    <validate-form @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <validate-input :rules="titleRules" v-model="titleVal" placeholder="请输入文章标题" type="text" />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <validate-input
          rows="10"
          type="text"
          tag="textarea"
          placeholder="请输入文章详情"
          :rules="contentRules"
          v-model="contentVal"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-large">发表文章</button>
      </template>
    </validate-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps, PostProps,ImageProps,ResponseType  } from '../store'
import ValidateInput, { RulesProp } from '../components/ValidateInput.vue'
import ValidateForm from '../components/ValidateInputForm.vue'
import createMessage from '../components/createMessage';
import Uploader from '../components/Uploader.vue';
import { uploadFileRequest } from '../hooks/comonRequest'
import { beforeUploadCheck } from '../helper'
export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm,
    Uploader
  },
  setup() {
    const titleVal = ref('')
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    let imageId=''
    const titleRules: RulesProp = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProp = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    console.log(store.state.user.isLogin, 'islogin')
    const handleFileUploaded=(rowData: ResponseType<ImageProps>)=>{
      if(rowData.data._id){
        imageId=rowData.data._id
      }
    }
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column ,_id} = store.state.user
        if (column) {
          const newPost: PostProps = {
            // _id: new Date().getTime().toString(),
            title: titleVal.value,
            content: contentVal.value,
            column: column,
            author:_id
            // createdAt: new Date().toLocaleString(),
          }
          if(imageId){
            newPost.image=imageId
          }
          store.dispatch('createPost', newPost).then((res)=>{
            createMessage('发表成功，2秒后跳转到文章', 'success')
            console.log(res)
            setTimeout(()=>{
              router.push({ name: 'column', params: { id: column } })
            },2000)
          })
          
        }
      }
    }
    const handleFileChange = (e: Event) => {
      const target = e.target as HTMLInputElement
      console.log(target, e)
      const files = target.files
      if (files) {
        const uploadeFile = files[0]
        const FD = new FormData()
        FD.append(uploadeFile.name, uploadeFile)
        uploadFileRequest('/upload',FD)
          .then((res: any) => {
            console.log(res, 233)
          })
          .catch((err: any) => {
            console.log(err)
          })
      }
    }
    const beforeUpload=(file: File) => {
      const result = beforeUploadCheck(file, { format: ['image/jpeg', 'image/png'], size: 1 })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过 1Mb', 'error')
      }
      return passed
    }
    // const fileUploader=(rowData: ResponseType<ImageProps>)=>{
    //    createMessage(`上传图片ID ${rowData.data._id}`,'success')
    // }
    const fileUploaderError=(rowData: {error: string})=>{
       createMessage(`${rowData.error}`,'error')
    }
    return {
      titleRules,
      titleVal,
      contentVal,
      contentRules,
      onFormSubmit,
      handleFileChange,
      beforeUpload,
      // fileUploader,
      fileUploaderError,
      handleFileUploaded
    }
  }
})
</script>
<style lang="scss">
.create-post-page .file-upload .file-upload-container {
  height: 200px !important;
  cursor: pointer;
  img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  }
}
</style>