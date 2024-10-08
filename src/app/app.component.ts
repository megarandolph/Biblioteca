import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'Biblioteca';
  isLoading = false;

  constructor(private loadingService: LoadingService){
    this.loadingService.loading$.subscribe((loading: boolean) => {
      this.isLoading = loading;
    });
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
