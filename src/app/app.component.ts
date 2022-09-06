import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, Subject, take, takeUntil, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  // interval$!:Observable<string>;
  // private destroy$!: Subject<boolean>;

  ngOnInit(): void {
    // this.interval$ = interval(1000).pipe(
    //   filter(value=>value % 3 === 0),
    //   map(value=> {
    //     if(value % 2 === 0) return `Je suis ${value} et je suis pair`
    //     else return `Je suis ${value} et je suis impair`
    //   }),
    //   tap(text => console.log(text))
    // );

    // interval(1000).pipe(
    //   take(3),
    //   tap(console.log),
    // ).subscribe();

    // this.destroy$ = new Subject<boolean>();

    // interval(1000).pipe(
    //   tap(console.log),
    //   takeUntil(this.destroy$)
    // ).subscribe();
  }

  ngOnDestroy():void {
    // this.destroy$.next(true);
  }
}



//exemple observable avec op :

//- bas niveau --------------------------

// export class AppComponent implements OnInit {
//   interval$!:Observable<string>;

//   ngOnInit(): void {
//     this.interval$ = interval(1000).pipe(
//       filter(value=>value % 3 === 0),
//       map(value=> {
//         if(value % 2 === 0) return `Je suis ${value} et je suis pair`
//         else return `Je suis ${value} et je suis impair`
//       }),
//       tap(text => console.log(text))
//     );
//   }
// }

//- Haut niveau -------------------------

// lightObservable$.pipe(
//   mergeMap(color => getTrainObservable$(color))
// ).subscribe();



// lightObservable$.pipe(
//   concatMap(color => getTrainObservable$(color))
// ).subscribe();



// lightObservable$.pipe(
//   exhaustMap(color => getTrainObservable$(color))
// ).subscribe();



// lightObservable$.pipe(
//   switchMap(color => getTrainObservable$(color))
// ).subscribe();

/*
mergeMap  assure la mise en parallèle : l'Observable extérieur peut souscrire aux Observables intérieurs suivants sans attendre que les précédents soient complétés. 

concatMap  assure la mise en série : il attend que les Observables intérieurs complètent avant de souscrire aux suivants– même si l'Observable extérieur émet plusieurs fois. Les Observables intérieurs seront traités en séquence à la suite.

exhaustMap  assure le traitement complet d'une souscription avant d'observer une nouvelle émission de l'Observable extérieur. Si d’autres demandes sont faites entre temps, elles ne seront pas prises en compte. 

switchMap  traite la dernière demande de souscription de l’Observable extérieur et annule toute souscription précédente non-complétée.
*/