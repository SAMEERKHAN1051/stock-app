import { Component } from '@angular/core';

@Component({
  selector: 'app-mainsection',
  templateUrl: './mainsection.component.html',
  styleUrls: ['./mainsection.component.scss'],
})
export class MainsectionComponent {
  currentDate(): string {
    const date = new Date();
    return date.toISOString();
  }
}
