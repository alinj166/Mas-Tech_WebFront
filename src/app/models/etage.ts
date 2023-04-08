import { Plan } from "./plan";

export class Etage {
    constructor(
        public id?: number, 
        public numero?: string,
        public description?:String,
        public chantierId?:number,
        public plan?:Plan,
        
       
    ){}
        
}
