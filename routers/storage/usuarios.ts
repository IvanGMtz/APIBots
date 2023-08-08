import { Expose, Transform } from 'class-transformer';
import { IsDefined} from 'class-validator';
export class User{
    @Expose({ name: 'id' })
    _id: string;

    @Expose({ name: 'cc' })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro cc es obligatorio"}}})
    cc: number;

    @Expose({ name: 'name' })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro name es obligatorio"}}})
    nombre: string;

    @Expose({ name: 'surname' })
    @Transform(({ value }) => { if (value) return value; else "Faker"})
    apellido: string;

    @Expose({ name: 'age' })
    @IsDefined({message: ()=>{ throw {status:422, message: "El parametro age es obligatorio"}}})
    edad: number;
    
    constructor(collection:Partial<User>) {
      Object.assign(this, collection)
      this.cc=1;
      this.nombre = "Faker";
      this.edad=1;
  }
}