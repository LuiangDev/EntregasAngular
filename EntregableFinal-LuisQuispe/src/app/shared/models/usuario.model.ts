export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  direccion: string;
  telefono: string;
  perfil: 'admin' | 'usuario';
}
