import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NewComment } from 'src/app/dto/NewComment';
import { Comment } from 'src/app/interfaces/Comment';
import { Post } from 'src/app/interfaces/Post';
import { User } from 'src/app/interfaces/User';
import { PostService } from 'src/app/services/post.service';
import { UserServiceService } from 'src/app/services/user.service';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.scss']
})
export class CommentPostComponent implements OnInit, OnDestroy {
  post!: Post;
  postId: number = 0;
  comments!: Comment[];
  user!: User;
  private destroy$ = new Subject<void>();
  
  newComment: NewComment = {message: ""};
  constructor(private postService: PostService, private route: ActivatedRoute,private userService: UserServiceService,private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap
    .pipe(takeUntil(this.destroy$))
    .subscribe(params => {
      this.postId = +params.get('id')!;

      this.postService.GetPostById(this.postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(p =>{
        this.post = p;
      //TODO Error a gérer
      },error => {
        
      });
      this.postService.getComments(this.postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(c => {
        this.comments = c;
      });

    });
    this.userService.getUserInfo()
    .pipe(takeUntil(this.destroy$))
    .subscribe(u => {
      this.user = u;
    });
  }

  addComment() {
    if (this.newComment.message.trim()) {
      let c: Comment = {createdAt: "maintenant", message: this.newComment.message,user:this.user}

      this.postService.addComment(this.postId,this.newComment)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        response => {
          this.comments.push(c);
        alert("Commentaire ajouté avec succès");
      },
      error => {
        alert("Erreur lors de l'ajout du commentaire");
      });


      this.newComment.message = ''; // Réinitialisez le champ de texte
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete(); 
  }

}
