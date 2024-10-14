import { Component, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'empty-component',
  standalone: true,
  imports: [MatIcon, MatButton],
  template: `
    <div class="w-full flex flex-col items-center justify-center space-y-5">
      <mat-icon style="font-size: 150px; width: 150px; height: 150px;"
        >favorite_border</mat-icon
      >
      <h2 class="text-2xl text-center">Aun no tienes favoritos</h2>
      <div class="w-full flex justify-center">
        <button mat-flat-button class="w-full sm:w-1/2 lg:w-1/3">
          Explorar productos
        </button>
      </div>
    </div>
  `,
})
export class EmptyComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
