import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Topic } from 'src/app/interfaces/Topic';
import { TopicServiceService } from 'src/app/services/topic.service';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-topic-list',
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.scss']
})
export class TopicListComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  topics!: Topic[];
  userTopics!: Topic[];

  constructor(private topicService: TopicServiceService) { }

  ngOnInit(): void {
    this.topicService.getAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe(t => {
      this.topics = t;
    });
    this.topicService.getUserTopics()
    .pipe(takeUntil(this.destroy$))
    .subscribe(ts => {
      this.userTopics = ts;
    });
  }
  
  isTopicInUserTopics(topic: Topic): boolean {
    return this.userTopics.some(userTopic => userTopic.id === topic.id);
  }

  subscribe(topicId: number) {
    this.topicService.addSubToTopic(topicId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(response => {
      window.location.reload();
      alert("Abonnement ajouté");
    },
    error => {
      alert("Erreur lors de l'abonnement");
    })

    }

    unsubscribe(topicId: number) {
      this.topicService.unSubscribe(topicId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          window.location.reload();
          alert("Désabonnement OK");
        },
        error => {
          alert("Erreur lors du Désabonnement");
        }
      );
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete(); 
    }

}
