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
    alert('Method not implemented.');
  }

  unsubscribe(arg0: any) {
    alert('Method not implemented.');
  }
}
