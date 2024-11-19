import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { JrrbButtonComponent } from '../jrrb-button/jrrb-button.component';
import { JrrbFormHeaderComponent } from './jrrb-form-header.component';
import { LibraryUtilsClass } from '../../share/class-utils/library-utils.class';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'jrrb-form-report-args',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, FormsModule, JrrbButtonComponent, JrrbFormHeaderComponent],
  templateUrl: './jrrb-form-report-args.component.html'
})
export class JrrbFormReportArgsComponent implements OnInit {
  @Input() showPrintParams: boolean = true;
  @Input() classContainer?: string;
  @Input() classColSize: number = 12;
  @Input() captionReport?: string;
  @Input() captionParams: string = 'Informe os parâmetros do relatório';
  @Input() messageInfo?: string;
  @Output() onPrint = new EventEmitter();

  protected classRowCenter: string = LibraryUtilsClass.GetClassRow('py-2 justify-content-center');
  protected classColPrint: string  = LibraryUtilsClass.GetClassCol(6);
  protected classCol?: string;
  protected printParams: boolean = true;

  public ngOnInit(): void {
    this.classCol = LibraryUtilsClass.GetClassCol(this.classColSize);
  }

  protected ToPrint(): void {
    this.onPrint.emit(this.printParams);
  }

}
