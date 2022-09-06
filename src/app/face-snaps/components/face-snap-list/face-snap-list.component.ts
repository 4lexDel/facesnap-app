import { Component, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subject, take, takeUntil, tap } from 'rxjs';
import { FaceSnap } from 'src/app/core/models/face-snap.model';
import { FaceSnapsService } from 'src/app/core/services/face-snaps.service';

@Component({
  selector: 'app-face-snap-list',
  templateUrl: './face-snap-list.component.html',
  styleUrls: ['./face-snap-list.component.scss']
})
export class FaceSnapListComponent implements OnInit {
  faceSnaps$!:Observable<FaceSnap[]>;

  constructor(private faceSnapsService: FaceSnapsService){        //Le fait d'ajouter public/private direct dans le constructeur permet d'automatiquement créer une propriété dans la classe
  }

  ngOnInit() {
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
  }

}


