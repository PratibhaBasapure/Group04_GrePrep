import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { startWith, map } from 'rxjs/operators';

export interface Options {
  name: string;
  id: number;
}

@Component({
  selector: 'app-list-of-schools',
  templateUrl: './list-of-schools.component.html',
  styleUrls: ['./list-of-schools.component.css']
})

export class ListOfSchoolsComponent implements OnInit {

  filteredOptions: Observable<Options[]>;
  
  title = 'demo-deploy';
  testForm = new FormGroup({
    myControl: new FormControl(),
  });

  constructor(private router: Router) { }

  options: Options[] = [
    { name: 'Harvard University', id: 1 },
    { name: 'Stanford University', id: 2 },
    { name: 'Massachusetts Institute of Technology (MIT)', id: 3 },
    { name: 'University of California, Berkeley (UCB)', id: 4 },
    { name: 'Columbia University', id: 5 }
  ];
  breedChoosen: number = 0;

  ngOnInit(): void {
    this.filteredOptions = this.testForm.controls['myControl'].valueChanges
    .pipe(
      startWith<string | Options>(''),
      map(value => typeof value === 'string' ? value : value.name),
      map(name => name ? this._filter(name) : this.options.slice())
    );
  }

  reset() {
    this.breedChoosen = 0;
    this.testForm.controls['myControl'].setValue('');
  }

  getCard(breed: number) {
    if (breed) {
      this.breedChoosen = breed;
    } else {
      this.breedChoosen = 0;
    }
  }
  
  displayFn(breed: Options): string {
    return breed && breed.name ? breed.name : '';
  }

  private _filter(name: string): Options[] {
    if(name) {
      const filterValue = name.toLowerCase();
      return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
    }
  }
}

