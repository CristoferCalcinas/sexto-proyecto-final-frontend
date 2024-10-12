import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'shared-title-component',
  standalone: true,
  imports: [],
  template: `
    <h1 class="uppercase font-bold text-4xl antialiased mt-3 mb-8">{{ title() }}</h1>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TitleComponentComponent {

  public title = input.required<string>();

}
