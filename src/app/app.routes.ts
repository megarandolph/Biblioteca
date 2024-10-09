import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';

export const routes: Routes = [
    {
        path:'', 
        component: LayoutComponent,
        data: {
          title: 'Biblioteca'
        },
        children: [
            {
                path: 'pages',
                loadChildren: () =>
                  import('./pages/pages.routes').then((m) => m.PagesRoutes),
            }
        ]
      }
];
