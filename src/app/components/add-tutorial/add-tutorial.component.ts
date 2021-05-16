import { TutorialService } from './../../services/tutorial.service';
import { Component, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/models/tutorial.model';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.css']
})
export class AddTutorialComponent implements OnInit {

  tutorial: Tutorial = {
    title: '',
    description: '',
    published: false
  };

  enviado = false;

  constructor(private tutorialService: TutorialService) { }

  ngOnInit(): void {
  }

  salvarTutorial(): void {
    const data = {
      title: this.tutorial.title,
      description: this.tutorial.description
    };

    this.tutorialService.create(data)
    .subscribe(
      res => {
        console.log(res);
        this.enviado = true;
      },
      error => {
        console.log(error);
      });
  }

  novoTutorial(): void {
    this.enviado = false;
    this.tutorial = {
      title: '',
      description: '',
      published: false
    };
  }

}
