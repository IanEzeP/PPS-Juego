import { Injectable } from '@angular/core';
import { Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User,
  sendEmailVerification
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public loggedUser: any;

  public logueado: boolean = false;
  public email: string = "";
  public perfil: string = "";
  public id: number = 0;
  public nombre: string = "";
  public sexo: string = "";
  // Esto está mal, debería guardar una instancia de Usuario con todos los datos cargados

  constructor(private auth: Auth) { }

  async logIn(email: string, password: number) 
  {
    try 
    {
      const credential = signInWithEmailAndPassword(this.auth, email, password.toString());
      this.logueado = true;

      return credential;
    } catch (error) 
    {
      return null;
    }
  }

  async logOut()
  {
    this.logueado = false;
    this.email = '';
    this.perfil = "";
    this.nombre = '';
    this.id = 0;
    this.sexo = '';
    this.loggedUser = undefined;
    
    return await signOut(this.auth);
  }

  async register(email : string, password : number)
  {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password.toString());
      await this.logIn(email, password);
      const user = userCredential.user;

      if(user != null)
      {
        await sendEmailVerification(user);
        this.logueado = false;
      }
  }
  
  get usuarioActual() : User | null
  {
    return this.auth.currentUser
  }
  
  cambiarUsuarioActual(usuario : User | null)
  {
    return this.auth.updateCurrentUser(usuario)
  }
}
