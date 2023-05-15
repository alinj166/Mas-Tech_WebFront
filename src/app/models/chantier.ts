
export class Chantier {
    constructor(
        public id?: number, 
        public nom?: string,
        public description?:String,
        public date_fin?:Date,
        public date_debut?:Date,
        public lieu?:String,
        public UtilisateurId?:number,
        public type?:String,
        public percentAvancement?:String,
        public percentElaboration?:String,
        public percentEstimation ?:String,
        public percentFabrication?:String,
        public categorie?:String,
        public etat  ?:boolean,
        
       
    ){}
}
