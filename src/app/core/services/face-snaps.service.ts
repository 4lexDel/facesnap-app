import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FaceSnap } from '../models/face-snap.model';
import { filter, interval, map, Observable, Subject, take, takeUntil, tap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaceSnapsService {
  faceSnaps$!:Observable<FaceSnap[]>;

  constructor(private http: HttpClient){}

  getAllFaceSnaps(): Observable<FaceSnap[]> {
    return this.http.get<FaceSnap[]>('https://my-json-server.typicode.com/4lexDel/facesnaps/facesnaps');
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`https://my-json-server.typicode.com/4lexDel/facesnaps/facesnaps/${faceSnapId}`);
  }

  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    return this.getFaceSnapById(faceSnapId).pipe(
      map(faceSnap => ({
          ...faceSnap,
          snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1)    //Technique !
      })),
      switchMap(updatedFaceSnap => this.http.put<FaceSnap>(     //Peu importe vu que les obs exterieur emmettent 1 fois !! 
          `https://my-json-server.typicode.com/4lexDel/facesnaps/facesnaps/${faceSnapId}`,
          updatedFaceSnap)
      )
    );
  }

  addFaceSnap(formValue: { title: string, description: string, imageURL: string, location?: string }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map(facesnaps => [...facesnaps].sort((a,b) => a.id - b.id)),
      map(sortedFacesnaps => sortedFacesnaps[sortedFacesnaps.length - 1]),
      map(previousFacesnap => ({
         ...formValue,
         snaps: 0,
         createdDate: new Date(),
         id: previousFacesnap.id + 1
     })),
     switchMap(newFacesnap => this.http.post<FaceSnap>(
         'https://my-json-server.typicode.com/4lexDel/facesnaps/facesnaps',
         newFacesnap)
     )
    );
  }
}