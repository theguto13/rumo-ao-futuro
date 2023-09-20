import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import CKEditor from '@ckeditor/ckeditor5-vue'

createApp(App)
  .use(router)
  .use(CKEditor, {
    editor: ClassicEditor
  })
  .mount('#app')