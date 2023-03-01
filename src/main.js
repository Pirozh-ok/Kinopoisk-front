import { createApp } from 'vue'
import App from './App.vue'
import router from "./router.js";
import GoogleSignInPlugin from "vue3-google-signin"

const app = createApp(App);

app.use(router);
app.use(GoogleSignInPlugin, {
    clientId: '472924981705-q8f6fdn4b64k2oceq417ur0n10q2gcr0.apps.googleusercontent.com'
})

app.directive("click-outside", {
    bind(el, binding, vnode) {
        el.clickOutsideEvent = (event) => {
            if (!(el === event.target || el.contains(event.target))) {
                vnode.context[binding.expression](event);
            }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
    },
    unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
    },
});
app.mount('#app');
app.config.devtools = true;