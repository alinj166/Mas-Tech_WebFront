import { Component, OnInit } from '@angular/core';
import { Chantier } from 'src/app/models/chantier';
import { Etage } from 'src/app/models/etage';
import { Plan } from 'src/app/models/plan';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-list-etage',
  templateUrl: './list-etage.component.html',
  styleUrls: ['./list-etage.component.css']
})
export class ListEtageComponent implements OnInit {

  constructor(private api: ApiService) { }
  etages: Etage[] = [];
  plans: Plan[] = [];
  image:any;
selectImage(event:any)
{
  if(event.target.files.length>0)
  {
    const file=event.target.file.files[0]
    this.image=file
  }   
}

onSubmit(id:any)
{
  const formData=new FormData()
  formData.append('image',this.image)

  this.api.postPlan(formData).subscribe(
    (res)=>alert(res),
    (err)=>alert(err)
  )
}
  ngOnInit(): void {
    
  //Get Etages by id  chantier
  this.api.getAllEtageByChantier(1).subscribe((data) => {
    this.etages = data;
    this.etages.forEach(element => {
  
      //Get Etages by id etage
          this.api.getPlanByEtage(element.id).subscribe((data)=>{
            this.plans.push(data);
          }
          )
  
          })
  });

 

}

}
