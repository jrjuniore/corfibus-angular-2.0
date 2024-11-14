import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { JrrbErrorsComponent } from '../jrrb-errors/jrrb-errors.component';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { LibraryUtilsClass } from '../../../share/class-utils/library-utils.class';

@Component({
  selector: 'jrrb-input',
  standalone: true,
  imports: [CommonModule, MatInputModule, ReactiveFormsModule, JrrbErrorsComponent,
    NgxMaskDirective],
  providers: [provideNgxMask()],
  templateUrl: './jrrb-input.component.html'
})
export class JrrbInputComponent {
  @Input() caption?: string;
  @Input() idInput?: string;
  @Input() maskJrrb?: string;
  @Input() isPassword?: boolean;
  @Input() isSearch?: boolean;
  @Input() isCaptionIsPlaceHolder?: boolean;
  @Input() showAccessTable?: boolean;
  @Input() fieldControl?: any
  @Output() onKeyEnter = new EventEmitter();
  @Output() onChange = new EventEmitter();
  @Output() onAccessTable = new EventEmitter();

  protected showButtonEye: boolean = false;
  protected idLabel: string = LibraryUtilsClass.NewId();

  protected ngOnInit(): void {
    this.idInput = this.idInput ?? LibraryUtilsClass.NewId();
    this.showButtonEye = this.isPassword!;
  }

  protected ToKeyUp(event: any): void {
    if (event.key.toLowerCase() == 'enter')
      this.onKeyEnter.emit();
  }

  protected ToAccessTable(): void {
    this.onAccessTable.emit();
  }

  protected ToChange(): void {
    this.onChange.emit(this.fieldControl.value);
  }
}
