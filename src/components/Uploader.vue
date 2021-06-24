<template>
  <div class="file-upload">
    <div class="file-upload-container" @click.prevent="triggerUpload" v-bind="$attrs">
      <slot v-if="fileStatus === 'loading'" name="loading">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot v-else-if="fileStatus === 'success'" name="uploaded" :uploadedData="uploadedData">
        <button class="btn btn-primary">上传成功</button>
      </slot>
       <slot v-else-if="fileStatus === 'error'" name="error">
        <button class="btn btn-primary">上传失败</button>
      </slot>
      <slot v-else name="default">
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      type="file"
      class="file-input d-none"
      ref="fileInput"
      @change="handleFileChange"
    >
  </div>
</template>
<script lang="ts">
import { defineComponent, ref ,PropType} from 'vue'
import { uploadFileRequest } from '../hooks/comonRequest'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction=(file: File) => boolean;
export default defineComponent({
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload:{
      type:Function as PropType<CheckFunction>
    }
  },
  inheritAttrs:false,
  emits:['file-uploader','file-uploader-error'],
  setup(props,context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if(props.beforeUpload){
         const result = props.beforeUpload(files[0])
         if(!result){
           return
         }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        uploadFileRequest(props.action,formData).then(resp => {
          fileStatus.value = 'success'
          uploadedData.value=resp.data
          context.emit('file-uploader',resp.data)
        }).catch((error) => {
          fileStatus.value = 'error'
          context.emit('file-uploader-error',{error})
        }).finally(() => {
          if (fileInput.value) {
            // fileStatus.value = 'ready'
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      fileInput,
      triggerUpload,
      fileStatus,
      uploadedData,
      handleFileChange
    }
  }
})
</script>