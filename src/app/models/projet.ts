import { Data } from "@angular/router";

export class Projet {
    constructor(
        public id?: number, 
        public nom?: string,
        public description?:String,
        public start_date?:Date,
        public end_date?:Data,
        public lieu?:String,
        public chefProjetId?:String,
        public budget?:Number,
        
       
    ){}
}
