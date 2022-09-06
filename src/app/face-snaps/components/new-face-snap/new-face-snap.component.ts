import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { FaceSnap } from '../../../core/models/face-snap.model';
import { filter, interval, map, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { FaceSnapsService } from '../../../core/services/face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-face-snap',
  templateUrl: './new-face-snap.component.html',
  styleUrls: ['./new-face-snap.component.scss']
})
export class NewFaceSnapComponent implements OnInit {
  snapForm!:FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;

  constructor(private formBuilder:FormBuilder, private faceSnapsService: FaceSnapsService, private router:Router) { }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;

    this.snapForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      imageURL: [null,  [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null]
  }, 
  {
    updateOn: 'blur'      //Refresh le valuechanges lorsque l'on quitte le focus d'un input
  });

    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map(formValue => ({
          ...formValue,               //Pour recup toutes les valeurs du formulaire
          createdDate: new Date(),
          snaps: 0,
          id: 0
      }))
  );
  }

  onSubmitForm() {
    console.log(this.snapForm.value);

    this.faceSnapsService.addFaceSnap(this.snapForm.value).pipe(
      tap((faceSnapAdd) => {
        this.router.navigateByUrl(`/facesnaps/${faceSnapAdd.id}`)
      })
    ).subscribe();
  }
}
