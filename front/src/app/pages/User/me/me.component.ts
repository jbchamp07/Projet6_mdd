import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Topic } from 'src/app/interfaces/Topic';
import { User } from 'src/app/interfaces/User';
import { TopicServiceService } from 'src/app/services/topic.service';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit, OnDestroy {

  user!: User;
  private destroy$ = new Subject<void>();
  topics!: Topic[];
  constructor(private userService: UserServiceService, private topicService: TopicServiceService) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
    .pipe(takeUntil(this.destroy$))
    .subscribe(u => {
      this.user = u;
    });
    this.topicService.getUserTopics()
    .pipe(takeUntil(this.destroy$))
    .subscribe(t => {
      this.topics = t;
    });
  }


  onSubmit() {
    this.userService.updateUser(this.user)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {
        alert("Modification éffectué avec succès");
      },
      error => {
        alert("Erreur lors de la modification");
      }
    );
  }

  unsubscribe(topicId: number) {
    this.topicService.unSubscribe(topicId)
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      response => {
        alert("Désabonnement OK");
      },
      error => {
        alert("Erreur lors du Désabonnement");
      }
    );
  }

  logOut() {
    this.userService.logout();
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete(); 
    }

}
