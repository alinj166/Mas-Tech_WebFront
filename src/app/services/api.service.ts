 import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Projet } from '../models/projet';
import { chefProjet } from '../models/ChefProjet';

const URL=environment.apiUrl;

const headers = new HttpHeaders({
  'Content-Type': 'application/json',
});





 const requestOptions = { headers: headers };
 @Injectable({
   providedIn: 'root'
 })
export class ApiService {

  constructor(   private http:HttpClient ) { }



// Get All projets
 public getAllProjet():Observable <Projet[]> {
  return this.http.get<Projet[]>(URL+'/projets')
  
}


// Get  projets by Id
public getProjetById(id:string):Observable <Projet> {
  return this.http.get<Projet>(URL+'/projets/'+id)
  
}
// Add projet
public addProjet(service:Projet):Observable <Projet> {
  return this.http.post<Projet>(URL+'/projets',service); 
}

// Delete projet 
public deleteProjet(id:number) {
  return this.http.delete<Projet>(URL+'/Projets/'+id);

}

// put Projet
public putProjet(service:Projet,id:string):Observable <chefProjet> {
  return this.http.put<Projet>(URL+'/Projets/'+id,service,requestOptions);
}
// Get ALL chefProjet
public getAllChefProjet():Observable <chefProjet[]> {
  return this.http.get<chefProjet[]>(URL+'/chefProjets')



}

// Add ChefProjet
public addChefProjet(service:chefProjet):Observable <chefProjet> {
  return this.http.post<chefProjet>(URL+'/chefProjets',service,requestOptions) 
   
}

// put ChefProjet
public putChefProjet(service:chefProjet,id:number):Observable <chefProjet> {
  return this.http.put<chefProjet>(URL+'/chefProjets/'+id,service,requestOptions);
}

// Delete chefProjet
 public deleteChefProjet(id:number):Observable <chefProjet> {
  return this.http.delete<chefProjet>(URL+'/chefProjets/'+id );

}
// Get ALL chefProjet
public getAllProjetByChef(id:any):Observable <Projet[]> {
  return this.http.get<Projet[]>(URL+'/chefProjets/'+id+'/projets');
  



}
}




