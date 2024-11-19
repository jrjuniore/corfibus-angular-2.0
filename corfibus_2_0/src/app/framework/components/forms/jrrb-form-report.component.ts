import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { JrrbButtonComponent } from '../jrrb-button/jrrb-button.component';
import { JrrbSelectComponent } from '../jrrb-select/jrrb-select.component';
import { BaseController } from '../../main/base.controller';
import { JrrbSelectTypeList } from '../jrrb-select/jrrb-select-list.type';
import { LibraryUtilsClass } from '../../share/class-utils/library-utils.class';
import { JrrbFormHeaderComponent } from './jrrb-form-header.component';

class JrrbReportController extends BaseController { }

@Component({
  selector: 'jrrb-form-report',
  standalone: true,
  imports: [CommonModule, MatCardModule, JrrbButtonComponent, JrrbSelectComponent, JrrbFormHeaderComponent],
  templateUrl: './jrrb-form-report.component.html'
})
export class JrrbFormReportComponent {
  @Input() classCol: string = LibraryUtilsClass.GetClassCol(12);
  @Input() captionReportHeader?: string;
  @Input() captionReport?: string;
  @Input() captionList?: string;
  @Input() selectList?: JrrbSelectTypeList[];
  @Input() fieldControl?: any;
  @Input() fieldNameValue?: string;
  @Input() fieldNameCaption?: string;
  @Output() onPrint = new EventEmitter();

  protected controller: JrrbReportController = new JrrbReportController();

  protected ToPrint(): void {
    this.onPrint.emit();
  }
}
