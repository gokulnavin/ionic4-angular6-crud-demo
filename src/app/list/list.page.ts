import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})

export class ListPage implements OnInit {
  classrooms: any;

  async getClassrooms() {
    //const loading = await this.loadingController.create({
    //  content : 'Loading..'
    //});
    
    //await loading.present();
    await this.api.getClassroom()
      .subscribe(res => {
        console.log(res);
        this.classrooms = res;
        //loading.dismiss();
      }, err => {
        console.log(err);
        //loading.dismiss();
      });
  }
  
  constructor(public api: RestApiService, public loadingController: LoadingController) {
    
  }

  ngOnInit() {
    this.getClassrooms();
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
