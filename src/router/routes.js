const routes = [
  {
    path: "/",
    // 可以设置不同的布局
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "test", component: () => import("pages/Test.vue") },
      { path: "login", component: () => import("pages/login/Index.vue") },
      { path: "about", component: () => import("pages/About.vue") },
      { path: "home", component: () => import("pages/module/Home.vue") },
    ],
  },
  {
    path: "/user",
    // 可以设置不同的布局
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "register",
        component: () => import("src/pages/user/Register.vue"),
      },
      { path: "login", component: () => import("src/pages/user/Login.vue") },
      {
        path: "forget",
        component: () => import("src/pages/user/Forget.vue"),
      },
    ],
  },
  {
    path: "/account",
    // 可以设置不同的布局
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/account/Home.vue"),
      },
      {
        path: "settings",
        component: () => import("pages/account/Settings.vue"),
      },
      { path: "home", component: () => import("pages/account/Home.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
];

export default routes;
