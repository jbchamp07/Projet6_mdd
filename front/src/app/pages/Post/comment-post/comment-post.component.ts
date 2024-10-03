import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { NewComment } from 'src/app/dto/NewComment';
import { Comment } from 'src/app/interfaces/Comment';
import { Post } from 'src/app/interfaces/Post';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-comment-post',
  templateUrl: './comment-post.component.html',
  styleUrls: ['./comment-post.component.scss']
})
export class CommentPostComponent implements OnInit {
  post!: Post;
  postId: number = 0;
  comments!: Comment[];

  newComment: NewComment = {message: ""};
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = +params.get('id')!;

      this.postService.GetPostById(this.postId).subscribe(p =>{
        this.post = p;
      });
      this.postService.getComments(this.postId).subscribe(c => {
        this.comments = c;
      });

    });
    
  }

  addComment() {
    if (this.newComment.message.trim()) {
      
      this.postService.addComment(this.postId,this.newComment).subscribe(
        response => {
        alert("Commentaire ajouté avec succès");
      },
      error => {
        alert("Erreur lors de l'ajout du commentaire");
      });


      this.newComment.message = ''; // Réinitialisez le champ de texte
    }
  }
}
