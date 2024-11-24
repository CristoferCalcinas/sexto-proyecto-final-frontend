import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [],
  templateUrl: './edit-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class EditProductComponent { }
