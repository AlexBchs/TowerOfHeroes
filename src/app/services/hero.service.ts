import {Injectable} from '@angular/core';
import {Hero} from '../model/heroes';
import {HEROES} from '../seeder/heroes-seeder';
import {catchError, Observable, of, tap} from 'rxjs';
import {MessageService} from "./message.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})

export class HeroService {
  constructor(private msgServ: MessageService, private http: HttpClient) {
  }

  private heroesURL = 'api/heroes';
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesURL).pipe(
      tap(_ => this.log('fetched all the heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', [])));
  }

  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesURL}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  private log(msg: string) {
    this.msgServ.add(`HeroService : ${msg}`);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesURL, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id} to the value ${hero.name}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesURL, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Added hero ${hero.name} with the id ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }

  deleteHero(id: number) {
    const url = `${this.heroesURL}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  searchHeroes(search: string): Observable<Hero[]> {
    if (!search.trim()) {
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesURL}/?name=${search}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${search}"`) :
        this.log(`no heroes matching "${search}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }


}
