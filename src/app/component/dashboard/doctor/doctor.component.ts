import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AddDoctorComponent } from './add-doctor/add-doctor.component';
import { DonneDoctor } from './add-doctor/doctor';


@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.css']
})
export class DoctorComponent implements OnInit {
  dtOptions: DataTables.Settings = {}
  doctors!:any;
  dtTrigger:Subject<any>=new Subject<any>();
  donnes : DonneDoctor[]=[];
  editData: any;
  addFormGroup: any;
  constructor( public dialog:MatDialog,private api:ApiService) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',


    };
    this.getAll()
  }
  openDoctor(){

    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;

    dialogConfig.data={
      title:'Registre doctor'
    }
    const dialogRef=this.dialog.open(AddDoctorComponent,dialogConfig);


  }

  getAll(){

    this.api.getAll().subscribe({
      next:(res)=>{
        console.log(res)
       this.donnes=res['doctor'];
       this.dtTrigger.next(null)
      },
      error:(err)=> {
          alert('erreur')
      },
    })
  }


  editDoctor(item:any){
    if(item){
      return ;
    }
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose=true;
    dialogConfig.autoFocus=true;
    dialogConfig.data.item;
    dialogConfig.data.title='Edit doctor';
    dialogConfig.data.birthdate=item.birthdate.toDate();


    const dialogRef=this.dialog.open(AddDoctorComponent,dialogConfig);
    dialogRef.afterClosed().subscribe(data => {
      if(data){
        console.log(data);

       this.api.UpdateDotor(this.addFormGroup.value,this.editData.id);

      }
    })


  }
}
