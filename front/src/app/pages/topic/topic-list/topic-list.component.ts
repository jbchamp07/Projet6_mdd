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

  constructor(private topicService: TopicServiceService) { }

  ngOnInit(): void {
    this.topicService.getAll().subscribe(t => {
      this.topics = t;
    });
  }
  

  subscribe(topicId: number) {
    this.topicService.addSubToTopic(topicId).subscribe(t => {
      alert(t);
    })

    }

}
