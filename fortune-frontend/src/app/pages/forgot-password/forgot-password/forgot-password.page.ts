import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
    public newPassword:String=''
  constructor(private apiService:ApiService, private route:ActivatedRoute) { }

  ngOnInit() {

  }

  resetClickHandler(){
    const uuid=this.route.snapshot.paramMap.get('uuid')
    this.apiService.post(`password/updatepassword`,{uuid:uuid,newPassword:this.newPassword}).subscribe((res:any)=>{
      
      
    })
  }


}
