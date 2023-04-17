import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { chefProjet } from 'src/app/models/ChefProjet';
import { Chantier } from 'src/app/models/chantier';
import { ApiService } from 'src/app/services/api.service';
import { ModalBoxComponent } from '../modal-box/modal-box.component';

@Component({
  selector: 'app-list-chantier',
  templateUrl: './list-chantier.component.html',
  styleUrls: ['./list-chantier.component.css'],
})
export class ListProjetComponent implements OnInit {
  constructor(private api: ApiService,private modalService: NgbModal) { }
  chefProjets:chefProjet[] = [];
  Chantiers: Chantier[] = [];
  listChefProjet: chefProjet[] = [];
  chefProjetExist!:chefProjet;
  ngOnInit(): void {
    //Get all Projet
    this.api.getAllChantier().subscribe((data) => {
      this.Chantiers = data;
      this.Chantiers.forEach(element => {
      this.api.getChefProjetById(element.chefProjetId).subscribe((data)=>{
        this.listChefProjet.push(data)
      })
    });
    });

  }

  isChefProjetExist(id:any) {
    this.chefProjetExist=this.listChefProjet.find(item => item.id === id)!;
    return this.chefProjetExist
  }

 

  openModal(idChantier:any) {
    const modalRef = this.modalService.open(ModalBoxComponent); // Open the modal 
    modalRef.componentInstance.idChantier = idChantier; 

  }

  //Cloturer Projet
  cloturerChantier(id: any) {
    this.api.cloturerChantier(id).subscribe({
      
      next: (res) => {
        alert(' Chantier cloturer avec succés');
        this.Chantiers;

      },
      error: (err) => {
        alert('Error lorsque la cloturation du Chantier');
      },
    });

  }
}
