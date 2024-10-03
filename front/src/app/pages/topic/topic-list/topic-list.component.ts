import { Component, OnInit } from '@angular/core';
import { Topic } from 'src/app/interfaces/Topic';
import { TopicServiceService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit {

  topics!: Topic[];
  userTopics!: Topic[];

  constructor(private topicService: TopicServiceService) { }

  ngOnInit(): void {
    this.topicService.getAll().subscribe(t => {
      this.topics = t;
    });
    this.topicService.getUserTopics().subscribe(ts => {
      this.userTopics = ts;
    });
  }
  
  isTopicInUserTopics(topic: Topic): boolean {
    return this.userTopics.some(userTopic => userTopic.id === topic.id);
  }

  subscribe(topicId: number) {
    this.topicService.addSubToTopic(topicId).subscribe(response => {
      alert("Abonnement ajouté");
    },
    error => {
      alert("Erreur lors de l'abonnement");
    })

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
