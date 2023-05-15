export class Utilisateur {

constructor(
   public id?: number,
    public imageURL?:string,
   public numTel?:string ,
   public passwordHash?:string,
   public cin?:string ,
   public role? :string,
    public nom?:string,
    public prenom?:string,
    public email?:string,
    ){}

}
