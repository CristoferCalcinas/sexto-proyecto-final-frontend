import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatListModule, MatSelectionList } from '@angular/material/list';
import { SupplierService } from '../../../../../services/supplier.service';

@Component({
  selector: 'app-delete-supplier-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
    MatListModule,
    AsyncPipe,
  ],
  templateUrl: './delete-supplier-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteSupplierDialogComponent {
  private supplierService = inject(SupplierService);
  public suppliers$ = this.supplierService.getSuppliers();
  @ViewChild('supp') supplierList!: MatSelectionList;

  deletSuppliers() {
    const selectedOptions = this.supplierList.selectedOptions.selected;
    const selectedSuppliers = selectedOptions.map((option) => option.value);

    if (!selectedSuppliers.length) return;
    this.supplierService.deleteSuppliers(selectedSuppliers).subscribe(() => {
      this.suppliers$ = this.supplierService.getSuppliers();
    });
  }
}
