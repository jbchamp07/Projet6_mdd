import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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

  newComment: string = '';
  constructor(private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.postId = +params.get('id')!;

      this.postService.GetPostById(this.postId).subscribe(p =>{
        this.post = p;
      });

    });
  }

  addComment() {
    if (this.newComment.trim()) {
      const comment = {
        user: { name: 'Pseudo de l’utilisateur' }, // Remplacez ceci par l’utilisateur actuel
        text: this.newComment,
      };

      // Ajoutez le commentaire à la liste des commentaires
      //this.post.comments.push(comment);
      this.newComment = ''; // Réinitialisez le champ de texte
    }
  }
}
