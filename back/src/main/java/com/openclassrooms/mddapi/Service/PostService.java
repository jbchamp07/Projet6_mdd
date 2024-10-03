package com.openclassrooms.mddapi.Service;

import com.openclassrooms.mddapi.DTO.CommentDTO;
import com.openclassrooms.mddapi.DTO.MessageResponse;
import com.openclassrooms.mddapi.DTO.PostCreationDTO;
import com.openclassrooms.mddapi.Model.Comment;
import com.openclassrooms.mddapi.Model.Post;
import com.openclassrooms.mddapi.Model.Topic;
import com.openclassrooms.mddapi.Model.User;
import com.openclassrooms.mddapi.Repository.CommentRepository;
import com.openclassrooms.mddapi.Repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserService userService;

    @Autowired
    private CommentRepository commentRepository;

    //Create a post
    public MessageResponse createPost(PostCreationDTO postDto){
        try{
            Post post = new Post();
            post.setTitle(postDto.getTitle());
            post.setDescription(postDto.getDescription());
            post.setTopics(postDto.getTopics());
            post.setCreatedAt(Date.from(Instant.now()));


            User uCreator = userService.getUserInfo();
            if(uCreator != null)
                post.setUser(uCreator);
            else
                return new MessageResponse("Erreur lors de la récuperation des infos utilsiateur");

            postRepository.save(post);
            return new MessageResponse("Post créer avec succès");
        }catch (Exception e){
            return new MessageResponse("Erreur : " + e.getMessage() + " avec le post :" + postDto.getTitle());
        }
    }

    //Get all posts the user is subscribe to
    public List<Post> getAllPosts(){
        User user = userService.getUserInfo();
        List<Post> allposts = postRepository.findAll();
        List<Post> postsOfUser = new ArrayList<>();
        for(int i = 0; i < allposts.size();i++){
            for(int j = 0; j < allposts.get(i).getTopics().size();j++){
                if(allposts.get(i).getTopics().get(j).getSubcribers().contains(user)){
                    postsOfUser.add(allposts.get(i));
                }
            }
        }
    return postsOfUser;
    }

    //Get a post by id
    public Post getPostById(long id){
        return postRepository.findById(id).get();
    }

    //Create a comment on a post
    public MessageResponse addComment(long postId, CommentDTO commentDTO){
        Comment comment = new Comment();
        comment.setPost(postRepository.findById(postId).get());
        comment.setUser(userService.getUserInfo());
        comment.setMessage(commentDTO.getMessage());
        comment.setCreatedAd(java.util.Date.from(Instant.now()));
        try{
            commentRepository.save(comment);
            return new MessageResponse("Commentaire ajouté avec succès") ;
        }catch (Exception e){
            return new MessageResponse("Erreur en ajoutant le commentaire : " + commentDTO.getMessage());
        }
    }

    //Get all comments of a post
    public List<Comment> getComments(long postId) {
        return commentRepository.findAll().stream().filter(c -> c.getPost().getId() == postId).collect(Collectors.toList());
    }

}
