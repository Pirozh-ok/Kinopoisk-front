import { createApp } from 'vue'
import App from './App.vue'
import router from "./router.js";
//import gAuthPlugin from 'vue3-google-oauth2'
import GoogleSignInPlugin from "vue3-google-signin"

const app = createApp(App);
app.use(router);
// const gAuthOptions = {
//     clientId: '472924981705-q8f6fdn4b64k2oceq417ur0n10q2gcr0.apps.googleusercontent.com',
//     scope: 'email',
//     prompt: 'consent'
// }
// app.use(gAuthPlugin, gAuthOptions);
app.use(GoogleSignInPlugin, {
    clientId: '472924981705-q8f6fdn4b64k2oceq417ur0n10q2gcr0.apps.googleusercontent.com'
})
app.mount('#app');
app.config.devtools = true;