import {createRouter, createWebHashHistory} from "vue-router";
import LoginComponent from "./components/LoginComponent.vue";
import MainWindowComponent from "./components/MainWindowComponent.vue";
import PasswordRecoveryComponent from "@/components/PasswordRecoveryComponent.vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import TestComponent from "./components/TestComponent.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', component: LoginComponent},
        {path: '/login', component: LoginComponent},
        {path: '/main', component: MainWindowComponent},
        {path: '/recovery-password', component: PasswordRecoveryComponent},
        {path: '/registration', component: RegisterComponent},
        {path: '/test', component: TestComponent}
    ]
})