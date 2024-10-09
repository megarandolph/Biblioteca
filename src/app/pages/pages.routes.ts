import { Routes } from "@angular/router";
import { AuthGuard } from "../auth.guard";
import { UsuarioComponent } from "./usuario/usuario.component";
import { CategoriaComponent } from "./categoria/categoria.component";
import { AutorComponent } from "./autor/autor.component";
import { LibroComponent } from "./libro/libro.component";
import { BibliotecaComponent } from "./biblioteca/biblioteca.component";

export const PagesRoutes: Routes = [
    {
      path: 'usuario',
      component: UsuarioComponent,
      data: {
        title: 'Usuario',
      },
      canActivate:[AuthGuard],
    },
    {
        path: 'categoria',
        component: CategoriaComponent,
        data: {
          title: 'Categoria',
        },
        canActivate:[AuthGuard],
    },
    {
        path: 'autor',
        component: AutorComponent,
        data: {
          title: 'Autores',
        },
        canActivate:[AuthGuard],
    },
    {
        path: 'libro',
        component: LibroComponent,
        data: {
          title: 'Libros',
        },
        canActivate:[AuthGuard],
    },
    {
        path: 'biblioteca',
        component: BibliotecaComponent,
        data: {
          title: 'biblioteca',
        }        
    }
]