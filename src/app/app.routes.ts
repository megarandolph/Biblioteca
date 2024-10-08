import { Routes } from '@angular/router';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path:'', 
        component: AppComponent,
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
