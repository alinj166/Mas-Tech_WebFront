import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Chantier } from 'src/app/models/chantier';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Utilisateur } from 'src/app/models/utilisateur';

@Component({
  selector: 'app-modal-box',
  templateUrl: './modal-box.component.html',
  styleUrls: ['./modal-box.component.css']
})
export class ModalBoxComponent implements OnInit {
  @Input() idChantier: any; 
  @Input()chantier!: Chantier;   
  ChefProjet!: Utilisateur; 
  
  dropdownSettings:IDropdownSettings={};
  allChefProjets: Utilisateur[] = [];
  idChefProjet!:number;
  dropdownList:any = [];

  constructor(private toastr:ToastrService,private api: ApiService,private activeModal:NgbActiveModal) { }
 //get all Chefprojet
 getAllChefProjet() {
  this.api.getAllChefProjet().subscribe((data) => {
    this.allChefProjets = data;
  });
}
  ngOnInit(): void {
    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
    };


    this.getAllChefProjet()
  }

  affecterChefProjet() {
   let  oldChantier!: Chantier;
    let newChantier!: Chantier;
    oldChantier = Object.assign({}, this.chantier); // Create a clone of this.chantier
  
    this.api.affecterChefProjet(this.idChantier,this.idChefProjet)
      .subscribe({
        next: (res:any) => {
          this.toastr.success( 'chef Projet Affecté avec succés','Réussir');
          newChantier=res.chantier
              this.api.getChefProjetById(newChantier.UtilisateurId).subscribe((data)=>{
                this.ChefProjet=data
                let dataSend = {
                  ChefProjet: this.ChefProjet,
                  newChantier: newChantier
                }; 
                this.activeModal.close(dataSend);
                            })
                        

          

        },
      
        error: () => {
          this.toastr.error( "Error lorsque l'affectation du chef Projet",'Echoué');


        }
      })
  }

  

}
