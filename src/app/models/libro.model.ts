export interface Libro {
    libroId: number;
    titulo: string | null;
    descripcion: string | null;
    fechaPublicacion: string | null;
    status: boolean | null;
    categorias: (number | null)[];
    autores: (number | null)[];
}