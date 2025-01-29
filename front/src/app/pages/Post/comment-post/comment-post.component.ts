import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
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
export class CommentPostComponent implements OnInit {
  post!: Post;
  postId: number = 0;
  comments!: Comment[];
  user!: User;

  newComment: NewComment = {message: ""};
  constructor(private postService: PostService, private route: ActivatedRoute,private userService: UserServiceService,private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = +params.get('id')!;

      this.postService.GetPostById(this.postId).subscribe(p =>{
        this.post = p;
      //TODO Error a gérer
      },error => {
        
      });
      this.postService.getComments(this.postId).subscribe(c => {
        this.comments = c;
      });

    });
    this.userService.getUserInfo().subscribe(u => {
      this.user = u;
    });
  }

  addComment() {
    if (this.newComment.message.trim()) {
      let c: Comment = {createdAt: "maintenant", message: this.newComment.message,user:this.user}

      this.postService.addComment(this.postId,this.newComment).subscribe(
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
}
