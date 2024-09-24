import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  elemek = ['elso elem', 'masodik elem', 'harmadik elem'];

  onSubmit(e: any) {
    e.preventDefault();
    const ujErtek = e.target.elements.cim.value;
    this.elemek.push(ujErtek);
    e.target.reset();
  }

  elemTorlese(id: number) {
    this.elemek.splice(id, 1);
  }
}
