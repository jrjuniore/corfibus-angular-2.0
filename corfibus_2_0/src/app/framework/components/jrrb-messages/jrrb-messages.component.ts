import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IRecordExclude } from './class/IRecordExclude.interface';

@Component({
  selector: 'jrrb-messages',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './jrrb-messages.component.html',
  styleUrls: ['./jrrb-messages.component.scss']
})
export class JrrbMessagesComponent {

  constructor(private dialogRef: MatDialogRef<JrrbMessagesComponent>,
    @Inject(MAT_DIALOG_DATA) protected recordDelete: IRecordExclude) { }

}
