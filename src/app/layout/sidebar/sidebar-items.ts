import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [

  {
    path: '',
    title: '-- GERENCIA',
    icon: 'fa-solid fa-desktop',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: 'dashboard/main',
        title: 'Reportes Gerenciales 1',
        icon: 'fa-solid fa-file-invoice',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: 'dashboard/dashboard2',
        title: 'Reportes Gerenciales 2',
        icon: 'fa-solid fa-file-invoice',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
      {
        path: 'dashboard/dashboard3',
        title: 'Reportes Gerenciales 3',
        icon: 'fa-solid fa-file-invoice',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [],
      },
    ],
  },

  {
    path: '',
    title: '-- PRODUCCIÓN',
    icon: 'fa-brands fa-product-hunt',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      {
        path: '/situacion/lista',
        title: 'Situación',
        icon: 'fa-solid fa-sitemap',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/despacho/lista',
        title: 'Despacho',
        icon: 'fa-regular fa-envelope',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/pedidos/lista',
        title: 'Pedidos',
        icon: 'fa-solid fa-receipt',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/pedidos/asignacion-empleados',
        title: 'Asignación',
        icon: 'fa-solid fa-clipboard-user',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/informes/empresa/lista',
        title: 'Empresas',
        icon: 'fa-solid fa-building',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '/informes/persona/lista',
        title: 'Personas',
        icon: 'fa-solid fa-user-tie',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      // {
      //   path: '#',
      //   title: 'Plantillas',
      //   icon: '',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   submenu: []
      // },
    ],
  },
  {
    path: '',
    title: '-- ADMINISTRACIÓN',
    icon: 'fa-solid fa-a',
    class: 'menu-toggle',
    groupTitle: false,
    submenu: [
      // {
      //   path: '#',
      //   title: 'Facturación',
      //   icon: 'fa-solid fa-file-invoice-dollar',
      //   class: 'ml-menu',
      //   groupTitle: false,
      //   submenu: []
      // },
      {
        path: '#',
        title: 'Reportes',
        icon: 'fa-solid fa-chart-column',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
      {
        path: '',
        title: 'Mantenimiento',
        icon: 'fa-solid fa-sliders',
        class: 'ml-menu',
        groupTitle: false,
        submenu: [
          {
            path: 'mantenimiento/personal/lista',
            title: 'Personal',
            icon: '',
            class: 'ml-menu-2',
            groupTitle: true,
            submenu: [],
          },
          {
            path: 'mantenimiento/abonado/lista',
            title: 'Abonado',
            icon: '',
            class: 'ml-menu-2',
            groupTitle: true,
            submenu: [],
          },
          {
            path: 'mantenimiento/agente/lista',
            title: 'Agente',
            icon: '',
            class: 'ml-menu-2',
            groupTitle: true,
            submenu: [],
          },
        ]
      },
      {
        path: '#',
        title: 'Cupones',
        icon: 'fa-solid fa-ticket',
        class: 'ml-menu',
        groupTitle: false,
        submenu: []
      },
    ]
  }
];
