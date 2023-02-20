import {createRouter, createWebHashHistory} from "vue-router";
import LoginComponent from "./components/LoginComponent.vue";

export default createRouter({
    history: createWebHashHistory(),
    routes: [
        {path: '/', component: LoginComponent},
        {path: '/login', component: LoginComponent, name: "login-page"},
        {path: '/main', component: import("./components/MainWindowComponent.vue"), name: "main-page"},
        {path: '/recovery-password', component: import("./components/PasswordRecoveryComponent.vue"), name: "recovery-password-page"},
        {path: '/registration', component: import("./components/RegisterComponent.vue"), name: "registration-page"},
        {path: '/movie/:id', component: import("./components/AboutMovieComponent.vue"), name: "about-movie-page"},
        {path: '/:catchAll(.*)', component: import("./components/NotFound.vue"), name: "not-found-page"}
    ]
})