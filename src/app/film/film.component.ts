import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Film } from '../models/film';
import { Actor } from '../models/actor';
import { fromEvent } from '../../../node_modules/rxjs';


@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {

  actors: Actor[] = [
    new Actor(1, 'Penelope', 'Cruz'),
    new Actor(2, 'Burt', 'Temple'),
    new Actor(3, 'John', 'Cruz'),
    new Actor(4, 'Bob', 'Allen'),
    new Actor(5, 'Dan', 'Weist'),
    new Actor(6, 'Tom', 'Temple'),
    new Actor(7, 'Harry', 'Bolger'),
    new Actor(8, 'Dean', 'Malden'),
    ];

  films: Film[] = [
    new Film(1, 'Academy Dinosaur',
    'A Epic Drama of a Feminist And a Mad Scientist who must Battle a Teacher in The Canadian Rockies',
    2008, 'G', 120, [this.actors[5], this.actors[6], this.actors[7]]),
    new Film(2, 'Ace Goldfinger',
    'A Astounding Epistle of a Database Administrator And a Explorer who must Find a Car in Ancient China',
    2001, 'R', 48, [this.actors[3], this.actors[0], this.actors[4]]),
    new Film(3, 'Adaptation Holes',
    'A Astounding Reflection of a Lumberjack And a Car who must Sink a Lumberjack in A Baloon Factory',
    2008, 'PG', 120, [this.actors[0], this.actors[1]])
  ];


  selected = null;
  showAllFilms = null;
  newFilm: Film = new Film();
  createNewFilm = null;
  editFilm: null;
  ratings = ['R', 'G', 'PG13', 'NC17', 'PG'];

  selectedActor = null;
  showAllActors = null;
  newActor: Actor = new Actor();
  createNewActor = null;
  editActor: null;

  countFilms() {
    return this.films.length;
  }

  displayFilm(film) {
    this.selected = film;
  }

  displayAllFilms() {
  this.showAllFilms = this.films;
  this.selected = null;
  this.createNewFilm = null;
  }

  displayFilmTable() {
    this.selected = null;
  }

  createNewFilmItem () {
    this.createNewFilm = !null;
  }

  generateFilmId() {
    return this.films[this.countFilms() - 1].id + 1;
  }

  setEditFilm() {
    this.editFilm = Object.assign({}, this.selected);
  }

  deleteFilm() {
    this.films.splice(this.selected.id - 1, 1);
    this.selected = null;
  }

  resetFilm() {
    this.editFilm = null;
  }

  addFilm(form: NgForm) {
    this.newFilm.id = this.generateFilmId();
    this.newFilm.title = form.value.title;
    this.newFilm.description = form.value.description;
    this.newFilm.rating = form.value.rating;
    this.newFilm.length = form.value.length;
    this.newFilm.releaseYear = form.value.releaseYear;
    this.films.push(this.newFilm);
    this.newFilm = new Film();
    form.reset();
    this.createNewFilm = null;
    this.selected = null;
  }

  updateFilm(form: NgForm) {
    const i = this.editFilm.id - 1;
    this.films[i].title = form.value.title;
    this.films[i].description = form.value.description;
    this.films[i].rating = form.value.rating;
    this.films[i].length = form.value.length;
    this.films[i].releaseYear = form.value.releaseYear;
    this.films[i].actors.push(this.actors[form.value.actors - 1]);
    this.resetFilm();
    this.selected = null;
  }

  countActors() {
    return this.actors.length;
  }


  displayActor (actor) {
    this.selectedActor = actor;
  }

  displayAllActors () {
  this.showAllActors = this.actors;
  this.selected = null;
  this.createNewActor = null;
  }

  displayTable() {
    this.selectedActor = null;
  }

  createNewActorItem () {
    this.createNewActor = !null;
  }

  generateActorId() {
    return this.actors[this.countActors() - 1].id + 1;
  }

  setEditActor() {
    this.editActor = Object.assign({}, this.selectedActor);
  }

  deleteActor() {
    this.actors.splice(this.actors.indexOf(this.selectedActor), 1);
    console.log(this.selectedActor);
    for (let i = 0; i < this.films.length; i++) {
      for (let j = 0; j < this.films[i].actors.length; j++) {
        console.log(this.films[i].actors[j]);
        console.log(this.selectedActor);
        if (this.films[i].actors[j] === this.selectedActor) {
          this.films[i].actors.splice(j, 1);
          console.log(this.films[i].actors);
        }
      }
    }
    this.selectedActor = null;
  }

  resetActor() {
    this.editActor = null;
  }

  addActor(form: NgForm) {
    this.newActor.id = this.generateActorId();
    this.newActor.firstName = form.value.firstName;
    this.newActor.lastName = form.value.lastName;
    this.actors.push(this.newActor);
    this.newActor = new Actor();
    form.reset();
    this.createNewActor = null;
    this.selectedActor = null;
  }

  updateActor(form: NgForm) {
    const i = this.editActor.id - 1;
    this.actors[i].firstName = form.value.firstName;
    this.actors[i].lastName = form.value.lastName;
    this.resetActor();
    this.selectedActor = null;
  }

  constructor() { }

  ngOnInit() {
  }

}
