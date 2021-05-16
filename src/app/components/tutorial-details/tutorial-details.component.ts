import { TutorialService } from './../../services/tutorial.service';
import { Tutorial } from './../../models/tutorial.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-tutorial-details',
  templateUrl: './tutorial-details.component.html',
  styleUrls: ['./tutorial-details.component.css']
})
export class TutorialDetailsComponent implements OnInit {

  currentTutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  mensagem = '';

  constructor(
    private tutorialService: TutorialService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.mensagem = '';
    this.obterTutorial(this.route.snapshot.params.id);
  }

  obterTutorial(id: string): void {
    this.tutorialService.get(id)
    .subscribe(
      data => {
        this.currentTutorial = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  atualizarSePublicado(status: boolean): void {
    const data: Tutorial = {
      title: this.currentTutorial.title,
      description: this.currentTutorial.description,
      published: status
    };

    this.tutorialService.update(this.currentTutorial.id, data)
      .subscribe(
        res => {
          this.currentTutorial.published = status;
          console.log(res);
          this.alertService.success(`Foi atualizado com status: ${status ? 'Publicado' : 'Não Publicado'}`, true);
        },
        error => {
          console.log(error);
        });
  }

  atualizarTutorial(): void {
    this.tutorialService.update(this.currentTutorial.id, this.currentTutorial)
      .subscribe(
        res => {
          console.log(res);
          this.alertService.success('Atualizado com Sucesso', true);
        },
        error => {
          console.log(error);
          this.alertService.danger(error, true);
        });
  }

  deletarTutorial(): void {
    this.tutorialService.delete(this.currentTutorial.id)
      .subscribe(
        res => {
          console.log(res);
          this.alertService.success('Deletado com Sucesso', true);
          this.router.navigate(['/tutorials']);
        },
        error => {
          console.log(error);
          this.alertService.danger('Não foi possível realizar a exclusão', true);
        });
  }
}
