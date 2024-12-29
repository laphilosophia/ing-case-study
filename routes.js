import './dev/views/add-employee';
import './dev/views/employees';

export const views = [
  {
    name: 'employees',
    path: '/',
    component: 'employees-view',
  },
  {
    name: 'add-employee',
    path: '/add',
    component: 'add-employee',
  },
];

export const routes = [
  {
    path: '/',
    component: 'ing-case-study',
    children: [...views],
  },
];
