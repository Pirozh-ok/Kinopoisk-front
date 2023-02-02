import {createRouter, createWebHashHistory} from "vue-router";
import LoginComponent from "./components/LoginComponent.vue";
import MainWindowComponent from "./components/MainWindowComponent.vue";
import PasswordRecoveryComponent from "@/components/PasswordRecoveryComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/login', component: LoginComponent},
        {path: '/main', component: MainWindowComponent},
        {path: '/recovery-password', component: PasswordRecoveryComponent},
        {path: '/registration', component: PasswordRecoveryComponent}
    ]
})