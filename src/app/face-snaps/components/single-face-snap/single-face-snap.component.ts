import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, interval, map, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsService } from 'src/app/core/services/face-snaps.service';

@Component({
  selector: 'app-single-face-snap',
  templateUrl: './single-face-snap.component.html',
  styleUrls: ['./single-face-snap.component.scss']
})
export class SingleFaceSnapComponent implements OnInit{
  faceSnap!:FaceSnap;
  faceSnap$!: Observable<FaceSnap>;
  textButtonAddSnap!:string;

  constructor(private faceSnapsService:FaceSnapsService, private route:ActivatedRoute){

  }

  ngOnInit(){
    this.textButtonAddSnap = "Aimer";
    const faceSnapId = +this.route.snapshot.params['id'];
    //this.faceSnap = this.faceSnapsService.getFaceSnapById(faceSnapId);
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onSnap(faceSnapId: number){
    if (this.textButtonAddSnap === 'Aimer') {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'snap').pipe(
          tap(() => this.textButtonAddSnap = 'Ne plus aimer')
      );
  } else {
      this.faceSnap$ = this.faceSnapsService.snapFaceSnapById(faceSnapId, 'unsnap').pipe(
          tap(() => this.textButtonAddSnap = 'Aimer')
      );
    }
  }
}
