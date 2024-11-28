import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-admin-cart',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-cart.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCartComponent {}
