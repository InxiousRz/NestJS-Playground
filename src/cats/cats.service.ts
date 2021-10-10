import { Injectable } from '@nestjs/common';
import { Cats } from './cats.model';

@Injectable()
export class CatsService {
  local_data: Cats[] = [];

  get(): Cats[] {
    return this.local_data;
  }

  getByID(id: number): Cats {
    let selected_cat_idx: number;
    this.local_data.forEach((value, idx) => {
      if (value.id == id) {
        selected_cat_idx = idx;
      }
    });

    if (selected_cat_idx === undefined) {
      return null;
    } else {
      return this.local_data[selected_cat_idx];
    }
  }

  add(name: string, age: number, race: string): void {
    const id = this.local_data.length + 1;
    const cats = new Cats(id, name, age, race);
    this.local_data.push(cats);
  }

  update(id: number, name: string, age: number, race: string): boolean {
    let selected_cat_idx: number;
    this.local_data.forEach((value, idx) => {
      if (value.id == id) {
        selected_cat_idx = idx;
        this.local_data[idx].name = name;
        this.local_data[idx].age = age;
        this.local_data[idx].race = race;
      }
    });

    if (selected_cat_idx === undefined) {
      return false;
    } else {
      return true;
    }
  }

  delete(id: number): boolean {
    let selected_cat_idx: number;
    this.local_data.forEach((value, idx) => {
      if (value.id == id) {
        selected_cat_idx = idx;
      }
    });

    if (selected_cat_idx === undefined) {
      return false;
    } else {
      this.local_data.splice(selected_cat_idx, 1);
      return true;
    }
  }
}
