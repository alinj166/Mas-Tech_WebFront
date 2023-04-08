import { Data } from "@angular/router";

export class Chantier {
    constructor(
        public id?: number, 
        public nom?: string,
        public description?:String,
        public date_debut?:Data,
        public date_fin?:Date,
        public lieu?:String,
        public chefProjetId?:String,
        public chefChantierId?:String,
        public type?:String,
        public percentAvancement?:String,
        public percentElaboration?:String,
        public percentEstimation ?:String,
        public percentFabrication?:String,
        public categorie?:String,
        public etat  ?:boolean,
        
       
    ){}
}
