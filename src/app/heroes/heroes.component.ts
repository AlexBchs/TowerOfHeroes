import { Component, OnInit } from '@angular/core';
import { Hero } from '../model/heroes';
import { HeroService } from "../services/hero.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroServ: HeroService) {}

  getHeroes(): void {
    this.heroServ.getHeroes().subscribe(h => this.heroes = h);
  }
  ngOnInit(): void {
    this.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroServ.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero) {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroServ.deleteHero(hero.id).subscribe();
  }
}
