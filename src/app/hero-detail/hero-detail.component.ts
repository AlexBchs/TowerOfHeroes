import {Component, Input, OnInit} from '@angular/core';
import { Hero } from '../model/heroes';
import {HeroService} from "../services/hero.service";
import {ActivatedRoute} from "@angular/router";
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero | undefined;

  constructor(private HeroServ: HeroService, private location: Location, private route: ActivatedRoute)
  {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')); //Récupère le id dans le'URL
    this.HeroServ.getHero(id).subscribe(h => this.hero = h);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.hero) {
      this.HeroServ.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

}
