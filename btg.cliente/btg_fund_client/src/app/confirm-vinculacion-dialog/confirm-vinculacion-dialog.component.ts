import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogRef,
} from '@angular/material/dialog';
import { UserService } from '../services/user-service';
import { Usuario } from '../models';
import { CommonModule, CurrencyPipe, NgFor } from '@angular/common';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-confirm-vinculacion-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    CurrencyPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './confirm-vinculacion-dialog.component.html',
  styleUrl: './confirm-vinculacion-dialog.component.css',
})
export class ConfirmVinculacionDialogComponent {
  id_fondo: string | undefined;
  nombre: string | undefined;
  cantindad: number | undefined;

  checkoutForm = this.formBuilder.group({
    correo: "",
    numero: "",
  });
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ConfirmVinculacionDialogComponent>,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit() {
    this.id_fondo = this.data['id_fondo'];
    this.nombre = this.data['nombre'];
    this.cantindad = this.data['cantidad'];

    console.log(this.id_fondo);
  }
  save() {
    this.dialogRef.close(this.checkoutForm.value);
  }
  close() {
    this.dialogRef.close();
  }
  get usuario(): Usuario | null {
    return this.userService.usuario;
  }

  onSubmit(): void {
  }
}
