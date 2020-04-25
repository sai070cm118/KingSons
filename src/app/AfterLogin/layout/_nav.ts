import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/Home/Dashboard',
    icon: 'icon-speedometer'
  },
  {
    title: true,
    name: 'Manage Apps'
  },
  {
    name: 'Apps',
    url: '/AppManagement/Apps',
    icon: 'icon-puzzle'
  },
  {
    name: 'App Management',
    url: '/AppManagement',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Settings',
        url: '/AppManagement/Settings',
        icon: 'icon-puzzle'
      },
      {
        name: 'Databases',
        url: '/AppManagement/Databases',
        icon: 'icon-puzzle'
      },
      {
        name: 'Procedures',
        url: '/AppManagement/Procedures',
        icon: 'icon-puzzle'
      },
      {
        name: 'Routes',
        url: '/AppManagement/Routes',
        icon: 'icon-puzzle'
      },
      {
        name: 'Email Templates',
        url: '/AppManagement/EmailTemplates',
        icon: 'icon-puzzle'
      },
      {
        name: 'Support',
        url: '/AppManagement/Support',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    title: true,
    name: 'Manage Users'
  },
  {
    name: 'Manage User',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Users',
        url: '/Users/ManageUsers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Roles',
        url: '/Users/Roles',
        icon: 'icon-puzzle'
      }
    ]
  },
  {
    title: true,
    name: 'Logger'
  },
  {
    name: 'Exceptions',
    url: '/Logs/Exceptions',
    icon: 'icon-puzzle'
  },
  {
    name: 'Event Audit',
    url: '/Logs/Events',
    icon: 'icon-puzzle'
  },
  {
    name: 'Custom Errors',
    url: '/Logs/CustomErrors',
    icon: 'icon-puzzle'
  },
  {
    title: true,
    name: 'Settings'
  },
  {
    name: 'List Of Values',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Statuses',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Types',
        url: '/base/cards',
        icon: 'icon-puzzle'
      }
    ]
  }
  // {
  //   name: 'Base',
  //   url: '/base',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Carousels',
  //       url: '/base/carousels',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Collapses',
  //       url: '/base/collapses',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Forms',
  //       url: '/base/forms',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Navbars',
  //       url: '/base/navbars',
  //       icon: 'icon-puzzle'

  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/paginations',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Switches',
  //       url: '/base/switches',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  // },
  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Brand Buttons',
  //       url: '/buttons/brand-buttons',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Icons',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'CoreUI Icons',
  //       url: '/icons/coreui-icons',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'success',
  //         text: 'NEW'
  //       }
  //     },
  //     {
  //       name: 'Flags',
  //       url: '/icons/flags',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Font Awesome',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //     {
  //       name: 'Simple Line Icons',
  //       url: '/icons/simple-line-icons',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Modals',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   divider: true
  // },
  // {
  //   title: true,
  //   name: 'Extras',
  // },
  // {
  //   name: 'Pages',
  //   url: '/pages',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Disabled',
  //   url: '/dashboard',
  //   icon: 'icon-ban',
  //   badge: {
  //     variant: 'secondary',
  //     text: 'NEW'
  //   },
  //   attributes: { disabled: true },
  // },

];
