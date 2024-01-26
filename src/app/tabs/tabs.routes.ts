import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'leaderboard',
        loadComponent: () =>
          import('../leaderboard/leaderboard.page').then((m) => m.LeaderboardPage),
      },
      {
        path: 'settings',
        loadComponent: () =>
          import('../settings/settings.page').then((m) => m.SettingsPage),
      },
      {
        path: 'task1',
        loadComponent: () =>
          import('../task1/task1.page').then((m) => m.Task1Page),
      },
      {
        path: 'task2',
        loadComponent: () =>
          import('../task2/task2.page').then((m) => m.Task2Page),
      },
      {
        path: 'task3',
        loadComponent: () =>
          import('../task3/task3.page').then((m) => m.Task3Page),
      },
      {
        path: 'task4',
        loadComponent: () =>
          import('../task4/task4.page').then((m) => m.Task4Page),
      },
      {
        path: '',
        redirectTo: '/tabs/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full',
  },
];
