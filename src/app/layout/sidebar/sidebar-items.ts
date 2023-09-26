import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
  {
    path: '',
    title: 'MENUITEMS.MAIN.TEXT',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: [],
  },
  {
    path: '',
    title: 'MENUITEMS.HOME.TEXT',
    icon: 'monitor',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'dashboard/main',
        title: 'MENUITEMS.HOME.LIST.DASHBOARD1',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: 'dashboard/dashboard2',
        title: 'MENUITEMS.HOME.LIST.DASHBOARD2',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: 'dashboard/dashboard3',
        title: 'MENUITEMS.HOME.LIST.DASHBOARD3',
        icon: '',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
    ],
  },

  {
    path: '',
    title: 'Pedidos',
    icon: 'keyboard_double_arrow_down',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/pedidos/lista',
        title: 'Lista',
        icon: 'keyboard_double_arrow_down',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/pedidos/asignacion',
        title: 'Asignación',
        icon: 'keyboard_double_arrow_down',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ],
  },
  {
    path: '',
    title: '-- Informes',
    icon: '',
    class: '',
    groupTitle: true,
    submenu: [],
  },
  {
    path: '',
    title: 'Empresas',
    icon: 'keyboard_double_arrow_down',
    class: 'ml-sub-menu',
    groupTitle: false,
    submenu: [
      {
        path: '/informes/empresa/lista',
        title: 'Lista',
        icon: 'keyboard_double_arrow_down',
        class: 'ml-menu2',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/informes/empresa/detalle',
        title: 'Detalle',
        icon: 'keyboard_double_arrow_down',
        class: 'ml-menu2',
        groupTitle: false,
        submenu: []
      },
    ]
  },
  {
    path: '',
    title: 'Personas',
    icon: 'keyboard_double_arrow_down',
    class: 'ml-sub-menu',
    groupTitle: false,
    submenu: [
      {
        path: '/informes/persona/lista',
        title: 'Lista',
        icon: 'keyboard_double_arrow_down',
        class: 'ml-menu2',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/informes/persona/detalle',
        title: 'Detalle',
        icon: 'keyboard_double_arrow_down',
        class: 'ml-menu2',
        groupTitle: false,
        submenu: []
      },
    ]
  },
];
