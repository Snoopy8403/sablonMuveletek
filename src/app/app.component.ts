import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  elemek: string[] = [];
  folyamatbanVan: boolean = false;

  ngOnInit(): void {
    this.elemekLekerdezese();
  }

  elemekLekerdezese() {
    this.folyamatbanVan = true;
    fetch('https://kodbazis.hu/api/cimek')
      .then((res) => res.json())
      .then((tartalom) => {
        this.elemek = tartalom;
      })
      .catch(() => {
        alert('Hiba történt!');
      })
      .finally(() => {
        this.folyamatbanVan = false;
      });
  }

  elemTorlese(i: number) {
    fetch('https://kodbazis.hu/api/cimek' + i, { method: 'DELETE' }).then(
      () => {
        this.elemekLekerdezese();
      }
    );
  }

  onSubmit(e: any) {
    e.preventDefault();
    const ujErtek = e.target.elements.cim.value;
    fetch('https://kodbazis.hu/api/cimek', {
      method: 'POST',
      body: JSON.stringify({
        cim: ujErtek,
      }),
    }).then(() => {
      this.elemekLekerdezese();
    });
    e.target.reset();
  }
}
