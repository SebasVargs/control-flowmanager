
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/"
  },
  {
    "renderMode": 2,
    "route": "/home"
  },
  {
    "renderMode": 2,
    "route": "/login"
  },
  {
    "renderMode": 2,
    "route": "/register"
  },
  {
    "renderMode": 2,
    "route": "/register/step2"
  },
  {
    "renderMode": 2,
    "route": "/register/step3"
  },
  {
    "renderMode": 2,
    "route": "/forgot-password"
  },
  {
    "renderMode": 2,
    "route": "/dashboard"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/profile"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/calendar"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/todo"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/todo/home-todo"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/todo/add-task"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/todo/achieved"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/todo/maps-todo"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/todo/today-todo"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/maps"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/graphic"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/topics"
  },
  {
    "renderMode": 2,
    "route": "/dashboard/info"
  },
  {
    "renderMode": 2,
    "redirectTo": "/",
    "route": "/**"
  }
],
  assets: {
    'index.csr.html': {size: 2309, hash: '93e9a261ea901881fcffaf8c4f4f2b1ef4cb63c694a7c7a6d87d707fbad9b30c', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1122, hash: '884e4a7745eda9b66dab8aef81db437730cff96815ef4f1c54343f14c6f30653', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'register/index.html': {size: 17899, hash: 'e07c51ba2fac23c92146d50542d90f2586728d4c1a3b20d449013c71c11e4f1f', text: () => import('./assets-chunks/register_index_html.mjs').then(m => m.default)},
    'home/index.html': {size: 25513, hash: 'ecfdb9029904d30494aa511dc6d9f87cf46213fb770db5c1e1b941ae373becd4', text: () => import('./assets-chunks/home_index_html.mjs').then(m => m.default)},
    'login/index.html': {size: 8789, hash: '0ceb0f45949ecc0a296ae36f16ea843be35f37912dec6b520c71e17f193a7303', text: () => import('./assets-chunks/login_index_html.mjs').then(m => m.default)},
    'index.html': {size: 25503, hash: 'fb079d0ef13cda832135e11ae1ee07f427bf67a65fc9fa08f636e949bcb8e075', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'forgot-password/index.html': {size: 2622, hash: 'a0fc21374975b33227c59bf19d9028655706e20d851202afbbb7617258c0cc79', text: () => import('./assets-chunks/forgot-password_index_html.mjs').then(m => m.default)},
    'register/step2/index.html': {size: 27110, hash: '935b477d3259026176804a7863532662241d3299fe61a22a69de9bd10e4e817e', text: () => import('./assets-chunks/register_step2_index_html.mjs').then(m => m.default)},
    'register/step3/index.html': {size: 27126, hash: 'b323627b1d0268091817ae3048bd08b376155677314599b27e92be5f75cc7ada', text: () => import('./assets-chunks/register_step3_index_html.mjs').then(m => m.default)},
    'dashboard/index.html': {size: 11293, hash: 'a0d8965d38b53054739c0d7d65a159bf11d6e262e48fb5861eccc1e4a21e05d6', text: () => import('./assets-chunks/dashboard_index_html.mjs').then(m => m.default)},
    'dashboard/calendar/index.html': {size: 11500, hash: '9e862314f139c26e7d9e09f1bc3c87102f94d32fad6a6ff54f5d509ac5b1ab10', text: () => import('./assets-chunks/dashboard_calendar_index_html.mjs').then(m => m.default)},
    'dashboard/profile/index.html': {size: 11388, hash: '1f20aae6095d64fa6298387b1645a302436a33f6b2ac4be3588f13c2a0937cca', text: () => import('./assets-chunks/dashboard_profile_index_html.mjs').then(m => m.default)},
    'dashboard/todo/home-todo/index.html': {size: 24469, hash: '51bee718d0350b91a4f6cfcfd5a84fa5a90a02d38111bab28fa952c2048c8ad9', text: () => import('./assets-chunks/dashboard_todo_home-todo_index_html.mjs').then(m => m.default)},
    'dashboard/todo/index.html': {size: 20043, hash: '3a3646b4fa7814e3c6230ac3ebfb951d46e320b48acd229321d01cce863aa024', text: () => import('./assets-chunks/dashboard_todo_index_html.mjs').then(m => m.default)},
    'dashboard/todo/today-todo/index.html': {size: 22099, hash: 'dec376b37e98330ea4d0ce127f16b25c85243366de11b38831a6a6d79b6bd80b', text: () => import('./assets-chunks/dashboard_todo_today-todo_index_html.mjs').then(m => m.default)},
    'dashboard/todo/maps-todo/index.html': {size: 20146, hash: 'f466acd615a4dc1b7ca75c06c41cdd4e93ae3336c2aebb46a102955b93cd59e1', text: () => import('./assets-chunks/dashboard_todo_maps-todo_index_html.mjs').then(m => m.default)},
    'dashboard/todo/add-task/index.html': {size: 20143, hash: '9735dc188b3868fcae809d4074472a99eef727ac813ba798fa5458874b481e4b', text: () => import('./assets-chunks/dashboard_todo_add-task_index_html.mjs').then(m => m.default)},
    'dashboard/todo/achieved/index.html': {size: 20143, hash: 'd6cbd8266f83f1a9b0b98e0d2365abea93983132167067f44d2914f1c2e1ba69', text: () => import('./assets-chunks/dashboard_todo_achieved_index_html.mjs').then(m => m.default)},
    'dashboard/maps/index.html': {size: 11380, hash: '83391bfa318ba22a49ec3205d09e423bcff036a2a1901bdc0bfe2868c8ecde9f', text: () => import('./assets-chunks/dashboard_maps_index_html.mjs').then(m => m.default)},
    'dashboard/graphic/index.html': {size: 11388, hash: '384a3502bc29191292ba4263aa8eba12771dec5bfc75f118b4154a1b9e7becc4', text: () => import('./assets-chunks/dashboard_graphic_index_html.mjs').then(m => m.default)},
    'dashboard/topics/index.html': {size: 11384, hash: '5a56dd3494a88413e221d369fdd5a27aee1fd85d0b69da6fec21885da28552a0', text: () => import('./assets-chunks/dashboard_topics_index_html.mjs').then(m => m.default)},
    'dashboard/info/index.html': {size: 11378, hash: '1af6f021608d789219e67025e28ba822bb90c8b746cc3281eb185a7be407db33', text: () => import('./assets-chunks/dashboard_info_index_html.mjs').then(m => m.default)},
    'styles-MDXQGZEB.css': {size: 21951, hash: 'BWSgYO+hamA', text: () => import('./assets-chunks/styles-MDXQGZEB_css.mjs').then(m => m.default)}
  },
};
