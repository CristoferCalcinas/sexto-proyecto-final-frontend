import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'shared-auth-layout',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './auth-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLayoutComponent {
  public authTitle = input.required<string>();
}
