import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from 'src/app/interfaces/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  //list of posts
  posts$!: Observable<Post[]>;


  constructor(private postService: PostService) {
   }

  ngOnInit(): void {
    this.posts$ = this.postService.getAll();
    console.log(this.posts$);
  }
  
  //Sorting posts
  selectedSortOption: any;
  onSortChange() {
    }
}
