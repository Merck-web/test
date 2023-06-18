import {RouterPages} from "src/scripts/scripts";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: {
      name:  RouterPages.ACCOUNT.MAIN,
    },
    children: [
      {
        name: RouterPages.ACCOUNT.MAIN,
        path: 'main',
        component: () => import('pages/IndexPage.vue')
      },
      {
        name: RouterPages.ACCOUNT.CREATE,
        path: 'create',
        component: () => import('pages/Create.vue')
      },
      {
        name: RouterPages.ACCOUNT.EDIT,
        path: 'edit',
        component: () => import('pages/Edit.vue')
      }
    ]
  },

]

export default routes
