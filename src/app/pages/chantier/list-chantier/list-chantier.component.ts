import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { chefProjet } from 'src/app/models/ChefProjet';
import { Chantier } from 'src/app/models/chantier';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-chantier',
  templateUrl: './list-chantier.component.html',
  styleUrls: ['./list-chantier.component.css'],
})
export class ListProjetComponent implements OnInit {
  constructor(private api: ApiService,private cdr: ChangeDetectorRef) { }
  Chantiers: Chantier[] = [];
  listChefProjet: chefProjet[] = [];
  displayStyle = "none";
  openPopup() {
    this.displayStyle = "block";
  }


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

  //Cloturer Projet
  cloturerChantier(id: any) {
    this.api.cloturerChantier(id).subscribe({
      
      next: (res) => {
        alert(' Chantier cloturer avec succés');
        this.Chantiers;
        this.cdr.detectChanges();

      },
      error: (err) => {
        alert('Error lorsque la cloturation du Chantier');
      },
    });

  }
}
