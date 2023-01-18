import {createRouter, createWebHashHistory} from "vue-router";
import LoginComponent from "./components/LoginComponent.vue";
import MainWindowComponent from "./components/MainWindowComponent.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/login', component: LoginComponent},
        {path: '/main', component: MainWindowComponent}
    ]
})