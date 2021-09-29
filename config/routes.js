export default [
  {
    path: '/',
    component: '../layouts/BlankLayout',
    routes: [
      {
        path: '/login',
        component: '../layouts/LoginLayout',
        routes: [
          {
            name: 'login',
            path: '/login',
            component: './Login',
          },
        ],
      },
      {
        path: '/',
        component: '../layouts/SecurityLayout',
        routes: [
          {
            path: '/',
            component: '../layouts/BasicLayout',
            authority: ['admin', 'user'],
            routes: [
              {
                path: '/',
                redirect: '/dashboard',
              },
              {
                path: '/dashboard',
                name: 'dashboard',
                icon: 'PieChartOutlined',
                component: '@/pages/Dashboard',
              },
              {
                path: '/equipment',
                name: 'equipment',
                icon: 'DesktopOutlined',
                component: '@/pages/Equipment',
              },
              {
                path: '/administrators-right',
                name: 'administratorsRight',
                icon: 'UserOutlined',
                component: '@/pages/AdministratorsRight',
              },
              {
                path: '/users-manage',
                name: 'usersManage',
                icon: 'TeamOutlined',
                component: '@/pages/UserManage',
              },
              {
                path: '/repair-manage',
                name: 'repairManage',
                icon: 'ApiOutlined',
                component: '@/pages/RepairManage',
              },
              {
                path: '/maintain-manage',
                name: 'maintainManage',
                icon: 'FormatPainterOutlined',
                component: '@/pages/MaintainManage',
              },
              {
                path: '/notice-manage',
                name: 'noticeManage',
                icon: 'BellOutlined',
                component: '@/pages/NoticeManage',
              },
              {
                path: '/duty',
                name: 'duty',
                icon: 'CalendarOutlined',
                component: '@/pages/Duty',
              },
              {
                path: '/timetable-set',
                name: 'timetableSet',
                icon: 'FieldTimeOutlined',
                component: '@/pages/TimetableSet',
              },
              {
                path: '/classroom-borrow',
                name: 'classroomBorrow',
                icon: 'ProfileOutlined',
                component: '@/pages/ClassroomBorrow',
              },
              {
                path: '/software-install',
                name: 'softwareInstall',
                icon: 'WindowsOutlined',
                component: '@/pages/SoftwareInstall',
              },
              {
                path: '/purchase',
                name: 'purchase',
                icon: 'ShoppingCartOutlined',
                component: '@/pages/Purchase',
              },
              {
                path: '/video-upload',
                name: 'videoUpload',
                icon: 'PlaySquareOutlined',
                component: '@/pages/VideoUpload',
              },
              {
                component: './404',
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
    ],
  },
  {
    component: './404',
  },
];
