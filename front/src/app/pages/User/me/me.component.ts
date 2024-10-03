import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/interfaces/Topic';
import { User } from 'src/app/interfaces/User';
import { TopicServiceService } from 'src/app/services/topic.service';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit {

  user!: User;

  topics!: Topic[];
  constructor(private userService: UserServiceService, private topicService: TopicServiceService) { }

  ngOnInit(): void {
    this.userService.getUserInfo().subscribe(u => {
      this.user = u;
    });
    this.topicService.getUserTopics().subscribe(t => {
      this.topics = t;
    });
  }


  onSubmit() {
    this.userService.updateUser(this.user).subscribe(
      response => {
        alert("Modification éffectué avec succès");
      },
      error => {
        alert("Erreur lors de la modification");
      }
    );
  }

  unsubscribe(topicId: number) {
    this.topicService.unSubscribe(topicId).subscribe(
      response => {
        alert("Désabonnement OK");
      },
      error => {
        alert("Erreur lors du Désabonnement");
      }
    );
  }
}
