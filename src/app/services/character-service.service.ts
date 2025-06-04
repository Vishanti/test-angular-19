import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { delay } from 'rxjs';

export interface CharacterResponseModel {
  items: CharacterModel[];
  meta: Meta;
  links: Links;
}

export interface CharacterModel {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: Gender;
  description: string;
  image: string;
  affiliation: string;
  deletedAt: null;
}

export enum Gender {
  Female = "Female",
  Male = "Male",
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

interface CharacterState {
  characters: Map<number, CharacterModel>;
  loading: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private http = inject(HttpClient);
  private readonly BASE_URL = 'https://dragonball-api.com/api';
  private readonly getCharacgtersApi = '/characters?limit=100';

  #characterState = signal<CharacterState>({
    loading: true,
    characters: new Map<number, CharacterModel>()
  });

  public loading = computed(() => this.#characterState().loading);
  public characters = computed(() => Array.from(this.#characterState().characters.values()));

  constructor() {
    this.getCharacterList();
  }


  getCharacterList() {
    this.http.get<CharacterResponseModel>(this.BASE_URL + this.getCharacgtersApi)
      .pipe(delay(5000))
      .subscribe(res => {
        res.items.forEach(character => {
          this.#characterState().characters.set(character.id, character);
        });

        this.#characterState.set({
          loading: false,
          characters: this.#characterState().characters
        });
      });

  }
}
