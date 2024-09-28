import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/Post';
import { Topic } from 'src/app/interfaces/Topic';
import { PostService } from 'src/app/services/post.service';
import { TopicServiceService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  allTopics$!: Observable<Topic[]>;
  post : Post = {
    title: '',
    description: '',
    topics: []
  };
  confirmation: string = "";

  constructor(private postService: PostService, private topicService: TopicServiceService) {
    
  }

  ngOnInit(): void {
    this.allTopics$ = this.topicService.getAll();
  }

  onSubmit() {
    if (this.post.title && this.post.topics && this.post.description) {
      this.postService.createPost(this.post).subscribe((response) => {
        this.confirmation = response;
        alert(this.confirmation);
        this.post.title = "";
        this.post.topics = [];
        this.post.description = "";
      });
    } else {
      alert('Le formulaire est invalide');
    }
  }



}
