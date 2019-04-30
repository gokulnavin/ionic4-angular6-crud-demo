import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
})
export class DetailPage implements OnInit {

  classroom: any = {};

  async getClassroom() {
    //const loading = await this.loadingController.create({
    //  content: 'Loading'
    //});
    //await loading.present();
    await this.api.getClassroomById(this.route.snapshot.paramMap.get('id'))
      .subscribe(res => {
        //console.log(res);
        this.classroom = res;
        //loading.dismiss();
      }, err => {
        console.log(err);
        //loading.dismiss();
      });
  }


  async delete(id) {

    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: '<strong>Are you sure you want to delete the record?</strong>',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ok',
          handler: () => {
            //console.log('Confirm Okay');
             this.api.deleteClassroom(id)
                .subscribe(res => {
                  //loading.dismiss();
                  //this.location.back();
                  //this.classroom = res;
                  window.location.href = '/list' ;
                }, err => {
                  console.log(err);
                  //loading.dismiss();
                });
          }
        }
      ]
    });

    await alert.present();
  }

  async delete1(id) {
    //const loading = await this.loadingController.create({
    //  content: 'Deleting'
    //});
    //await loading.present();
    await this.api.deleteClassroom(id)
      .subscribe(res => {
        //loading.dismiss();
        //this.location.back();
        //this.classroom = res;
        window.location.href = '/list' ;
      }, err => {
        console.log(err);
        //loading.dismiss();
      });
  }

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    public router: Router) {
      this.getClassroom();
      //nav chk
     }

  ngOnInit() {
    this.getClassroom();
  }

}
