//  Copyright (C) 2023 Nethesis S.r.l.
//  SPDX-License-Identifier: GPL-3.0-or-later

import { isStandaloneMode } from '@/lib/config'
import { createRouter, createWebHashHistory } from 'vue-router'

const standaloneRoutes = [
  {
    path: 'dashboard',
    name: 'Dashboard',
    component: () => import('../views/standalone/StandaloneDashboardView.vue')
  },
  {
    path: 'system/subscription',
    name: 'Subscription',
    component: () => import('../views/standalone/system/SubscriptionView.vue')
  },
  {
    path: 'system/systemSettings',
    name: 'SystemSettings',
    component: () => import('../views/standalone/system/SystemSettingsView.vue')
  },
  {
    path: 'system/services',
    name: 'Services',
    component: () => import('../views/standalone/system/ServicesView.vue')
  },
  {
    path: 'system/ssh',
    name: 'SSH',
    component: () => import('../views/standalone/system/SSHView.vue')
  },
  {
    path: 'system/backup-and-restore',
    name: 'BackupAndRestore',
    component: () => import('../views/standalone/system/BackupAndRestoreView.vue')
  },
  {
    path: 'system/reboot-and-shutdown',
    name: 'RebootAndShutdown',
    component: () => import('../views/standalone/system/RebootAndShutdownView.vue')
  },
  {
    path: 'network/interfaces-and-devices',
    name: 'Interfaces',
    component: () => import('../views/standalone/network/InterfacesAndDevicesView.vue')
  },
  {
    path: 'network/multi-wan',
    name: 'MultiWAN',
    component: () => import('../views/standalone/network/MultiWanView.vue')
  },
  {
    path: 'firewall/zones-and-policies',
    name: 'ZonesAndPolicies',
    component: () => import('../views/standalone/firewall/ZonesAndPolicies.vue')
  },
  {
    path: 'firewall/port-forward',
    name: 'PortForward',
    component: () => import('../views/standalone/firewall/PortForward.vue')
  }
]

function getStandaloneRoutes() {
  return standaloneRoutes.map((route) => {
    return {
      path: '/standalone/' + route.path,
      name: 'Standalone' + route.name,
      component: route.component
    }
  })
}

function getControllerManageRoutes() {
  return standaloneRoutes.map((route) => {
    return {
      path: route.path,
      name: 'ControllerManage' + route.name,
      component: route.component
    }
  })
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: isStandaloneMode() ? '/standalone' : '/controller'
    },
    // standalone
    {
      path: '/standalone',
      redirect: '/standalone/dashboard'
    },
    ...getStandaloneRoutes(),
    // controller
    {
      path: '/controller',
      redirect: '/controller/dashboard'
    },
    {
      path: '/controller/dashboard',
      name: 'ControllerDashboard',
      component: () => import('../views/controller/ControllerDashboardView.vue')
    },
    {
      path: '/controller/logs',
      name: 'ControllerLogs',
      component: () => import('../views/controller/LogsView.vue')
    },
    {
      path: '/controller/settings',
      name: 'ControllerSettings',
      component: () => import('../views/controller/SettingsView.vue')
    },
    {
      path: '/controller/manage/:unitName',
      redirect: () => {
        return 'dashboard'
      }
    },
    {
      path: '/controller/manage/:unitName',
      name: 'ControllerManage',
      component: () => import('../StandaloneApp.vue'),
      children: getControllerManageRoutes()
    }
  ]
})

export default router
