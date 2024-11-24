import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-product',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  templateUrl: './dialog-delete-product.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogDeleteProductComponent {
  readonly dialogRef = inject(MatDialogRef<DialogDeleteProductComponent>);
  readonly data = inject(MAT_DIALOG_DATA);
}
