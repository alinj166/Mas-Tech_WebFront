import { Component, OnInit } from '@angular/core';
import { Projet } from 'src/app/models/projet';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-projet',
  templateUrl: './list-projet.component.html',
  styleUrls: ['./list-projet.component.css'],
})
export class ListProjetComponent implements OnInit {
  constructor(private api: ApiService) { }
  projets: Projet[] = [];

  ngOnInit(): void {
    //Get all Projet
    this.api.getAllProjet().subscribe((data) => {
      this.projets = data;
    });
  }

  //Delete Projet
  deletProjet(id: any) {
    this.api.deleteProjet(id).subscribe({
      next: (res) => {
        alert(' Projet supprimer avec succés');
      },
      error: (err) => {
        alert('Error lorsque la suppression du projet');
      },
    });
  }
}
