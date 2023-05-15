import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Chantier } from 'src/app/models/chantier';
import { ApiService } from 'src/app/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Utilisateur } from 'src/app/models/utilisateur';
import { ModalBoxComponent } from '../modal-box/modal-box.component';

@Component({
  selector: 'app-list-chantier',
  templateUrl: './list-chantier.component.html',
  styleUrls: ['./list-chantier.component.css'],
})
export class ListProjetComponent implements OnInit {
  constructor(private toastr:ToastrService,private api: ApiService,private modalService: NgbModal) { }
  Chantiers: Chantier[] = [];
  listChefProjet: Utilisateur[] = [];
  chefProjetArray: { key: Chantier; value: Utilisateur | null}[] = [];

  pageSize= 6; // the number of items per page
  page = 1; 
  ngOnInit(): void {
    //Get all Projet
    let i=-1
    this.api.getAllChantier().subscribe((data) => {
      data.forEach(chantier => {
        i++
      if(chantier.UtilisateurId)
      this.api.getChefProjetById(chantier.UtilisateurId).subscribe((res)=>
        {   this.chefProjetArray.push( { key: chantier, value: res}) // Store etage  and chefProjet 


          } 
   
         )
         else if (!chantier.UtilisateurId) {
          this.chefProjetArray[i]={ key: chantier, value: null}
         }

    });

    });

  }

  openModal(idChantier:any) {
    const modalRef = this.modalService.open(ModalBoxComponent); // Open the modal    
    let foundKey: Chantier | null = null;
    let index:number;
    for (const t of this.chefProjetArray) {
      if (t.key.id == idChantier) {
        foundKey = t.key;
        index=this.chefProjetArray.indexOf(t)
        break;
      }
    }
    if (foundKey !== null) {
      modalRef.componentInstance.idChantier = idChantier; 
      modalRef.componentInstance.chantier= foundKey;
      modalRef.result.then((result) => {
       
           // Update the parent variable with the updated value
          this.chefProjetArray[index] ={key:result.newChantier,value:result.ChefProjet}

      })
    } else {
      this.modalService.dismissAll();
      this.toastr.error( "problème d'ouverture de page",'Echoué');

    }
       

  }

  //Cloturer Projet
  cloturerChantier(id: any) {
    this.api.cloturerChantier(id).subscribe({
      next: () => {
        this.toastr.success( 'Chantier cloturer avec succés','Réussir');
        
        const foundChantier = this.chefProjetArray.find(e => e.key.id == id);
        if (foundChantier) {
          foundChantier.key.etat = true;
        }
      },
      error: () => {
        this.toastr.error( "Error lorsque la cloturation du Chantier",'Echoué');

      },
    });

  }
}
