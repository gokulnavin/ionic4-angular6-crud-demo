import { Component, OnInit } from '@angular/core';

import { LoadingController, AlertController } from '@ionic/angular';
import { RestApiService } from '../rest-api.service';
import { ActivatedRoute, Router  } from '@angular/router';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {

  classroomForm: FormGroup;
  students: FormArray;

  async getClassroom(id) {
    const loading = await this.loadingController.create({
      //content: 'Loading'
    });
    await loading.present();
    await this.api.getClassroomById(id).subscribe(res => {
      //console.log(res);
      this.classroomForm.controls['Id'].setValue(res.Id);
      this.classroomForm.controls['ClassName'].setValue(res.ClassName);
      let controlArray = <FormArray>this.classroomForm.controls['students'];
      res.Students.forEach(std => {
        controlArray.push(this.formBuilder.group({
          Id: 0 ,
          StudentName: ''
        }));
      });
      for(let i=0;i<res.Students.length;i++) {
        controlArray.controls[i].get('Id').setValue(res.Students[i].Id);
        controlArray.controls[i].get('StudentName').setValue(res.Students[i].StudentName);
      }
      //console.log(this.classroomForm);
      loading.dismiss();
    }, err => {
      console.log(err);
      loading.dismiss();
    });
  }

  createStudent(): FormGroup {
    return this.formBuilder.group({
      StudentName: ''
    });
  }
  
  addBlankStudent(): void {
    this.students = this.classroomForm.get('Students') as FormArray;
    this.students.push(this.createStudent());
  }


  async deleteStudent(control, index) {

    let id = control[index].value.Id;

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
            this.api.deleteStudent(id)
              .subscribe(res => {
                  //control.pop(index);
                  let classId = this.route.snapshot.paramMap.get('id') ;
                  window.location.href = '/detail/'+ classId ;
                }, (err) => {
                  console.log(err);
                });
          }
        }
      ]
    });

    await alert.present();
  }

  async updateClassroom(){
    //console.log(this.route.snapshot.paramMap.get('id'));
    await this.api.updateClassroom(this.route.snapshot.paramMap.get('id'), this.classroomForm.value)
    .subscribe(res => {
        let id = res['Id'];
        //console.log(id);
        //this.router.navigate(['/detail', JSON.stringify(id)]);
        //this.router.navigateByUrl('/detail/1');
        window.location.href = '/detail/'+ id ;
      }, (err) => {
        console.log(err);
      });
  }

  constructor(public api: RestApiService,
    public loadingController: LoadingController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder) {
      this.getClassroom(this.route.snapshot.paramMap.get('id'));
      this.classroomForm = this.formBuilder.group({
        'Id': [null, Validators.required],
        'ClassName' : [null, Validators.required],
        'students' : this.formBuilder.array([])
      });
    }

  ngOnInit() {
    console.log('nav');
  }

}
