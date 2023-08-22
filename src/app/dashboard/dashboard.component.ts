import {Component, OnInit} from '@angular/core';
import { Hero } from '../model/heroes';
import {HeroService} from "../services/hero.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private HeroServ: HeroService) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes() {
    this.HeroServ.getHeroes().subscribe(h => this.heroes = h.slice(0,5));
  }
}
