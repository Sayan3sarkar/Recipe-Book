import { Component, OnInit, Input, Output } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  @Input() message: string;
  @Output() closed = new Subject();

  constructor() { }

  ngOnInit(): void {
  }

  public onClose() {
    this.closed.next(null);
  }

}
