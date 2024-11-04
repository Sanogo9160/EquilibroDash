import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-dialog-modifier-profil',
  standalone: true,
  imports: [
    MatFormField,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,


  ],
  templateUrl: './dialog-modifier-profil.component.html',
  styleUrl: './dialog-modifier-profil.component.css'
})
export class DialogModifierProfilComponent {

  profilForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogModifierProfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.profilForm = this.fb.group({
      nom: [data.nom],
      description: [data.description]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.profilForm.valid) {
      this.dialogRef.close(this.profilForm.value);
    }
  }

}
