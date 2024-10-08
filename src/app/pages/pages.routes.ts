import { Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";

export const PagesRoutes: Routes = [
    {
      path: '',
      //component: '',
      data: {
        title: 'Starter Page',
      },
      canActivate:[AuthGuard],
    }
]