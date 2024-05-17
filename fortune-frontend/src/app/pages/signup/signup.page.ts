import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storageService.js/storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
 public signUpForm:FormGroup;
public errorText=''

  constructor(private storageService:StorageService,private router:Router,private apiService:ApiService,private fb:FormBuilder) {
    this.signUpForm=this.fb.group({
      name:[''],
      email:[''],
      password:['']
    })
  }
   

  ngOnInit() {
    
  }

  signUpSubmit(){
    console.log(this.signUpForm.value,' aha')

    this.apiService.post('add-user',this.signUpForm.value).subscribe((res:any)=>{
      console.log('adduser res',res)
      if (res.errType==='already exists'){
          this.errorText='User already exists'
          setTimeout(() => {
            this.errorText=''
          }, 2000);
      }
      else if (res.added){
        
        this.storageService.setItem('userId',res.added.id).then(async()=>{
         await this.storageService.setItem('email',res.added.email)
         await this.storageService.setItem('token',res.token)
         await this.storageService.setItem('prem',false)
          this.router.navigate(['tabs'])
        })
            
      }
    })
  }

}
