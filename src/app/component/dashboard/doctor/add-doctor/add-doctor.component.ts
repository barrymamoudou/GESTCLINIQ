import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-add-doctor',
  templateUrl: './add-doctor.component.html',
  styleUrls: ['./add-doctor.component.css']
})
export class AddDoctorComponent implements OnInit {
  addFormGroup!:FormGroup
  title !: string;
  name !:string;
  mobile !:string;
  email !:string;
  birthdate !:string;
  gender !:string;
  qualification !:string;
  id !:string;


  dapartement : string []=['cadiologie','orthopedics','radiologie'];
  actionButton:string='Enregistrement'

  constructor(private fb:FormBuilder,@Inject(MAT_DIALOG_DATA) public  data:any, private dialogRef:MatDialogRef<AddDoctorComponent>,
  private api:ApiService) {
    this.title=data.title;
    this.name=data.name
    this.mobile=data.mobile
    this.email=data.email
    this.birthdate=data.birthdate
    this.gender=data.gender
    this.qualification=data.qualification
    this.qualification=data.qualification
   }

  ngOnInit(): void {
    this.addFormGroup=this.fb.group({
      id:[this.id,[Validators.required]],
      name:[this.name,[Validators.required]],
      mobile:[this.mobile,[Validators.required,Validators.minLength(9),Validators.maxLength(9)]],
      email:[this.email,[Validators.required,Validators.email]],
      dapartement:[this.dapartement,[Validators.required]],
      gender:[this.gender,[Validators.required]],
      birthdate:[this.birthdate,[Validators.required]],
      qualification:[this.qualification,[Validators.required]],
    })


  }
  cancel(){
    this.dialogRef.close();
  }
  register(){
    if(this.addFormGroup.valid){
      this.api.addDoctor(this.addFormGroup.value).subscribe({
        next:(res)=>{
          console.log(res);

          swal.fire('Success', 'doctor','success')
          this.addFormGroup.reset();
          this.dialogRef.close(this.addFormGroup.value);
         // this.dialogRef.close('save')
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }



}
