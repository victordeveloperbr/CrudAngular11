import { TutorialService } from './../../services/tutorial.service';
import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit {
  tutorials?: Tutorial[];
  currentTutorial?: Tutorial;
  currentIndex = -1;
  title = '';

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
    this.carregarTutoriais();
  }

  // carregar tutorials
  carregarTutoriais(): void {
    this.tutorialService.getAll()
    .subscribe(
      data => {
        this.tutorials = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  // recarregar lista
  atualizarLista(): void {
    this.carregarTutoriais();
    this.currentTutorial = undefined;
    this.currentIndex = -1;
  }

  // atribuir tutorial ativo
  atribuirTutorialAtivo(tutorial: Tutorial, index: number): void {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removerTodosTutoriais(): void {
    this.tutorialService.deleteAll()
    .subscribe(
      res => {
        console.log(res);
        this.atualizarLista();
      },
      error => {
        console.log(error);
      });
  }

  procurarPorTitulo(): void {
    this.tutorialService.findByTitle(this.title)
    .subscribe(
      data => {
        this.tutorials = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

}
