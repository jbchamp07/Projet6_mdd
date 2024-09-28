package com.openclassrooms.mddapi.Service;

import com.openclassrooms.mddapi.Model.Topic;
import com.openclassrooms.mddapi.Model.User;
import com.openclassrooms.mddapi.Repository.TopicRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TopicService {
    @Autowired
    private TopicRepository topicRepository;
    @Autowired
    private UserService userService;

    public List<Topic> getAllTopics(){
        return topicRepository.findAll();
    }

    public String subscription(int topicId){
        try{
            //TODO get user by euthenticate
            User u = new User();
            u.setUsername("u");
            u.setId(1);
            u.setEmail("a.a@gmail.com");
            u.setCreatedAt(null);
            u.setPassword("p");

            Topic topic = getTopicById(topicId);
            topic.getSubcribers().add(u);
            topicRepository.save(topic);

            return "Abonnement OK";
        }catch (Exception e){
            return "Erreur lors de l'abonnement :" + e.getMessage();
        }
    }
    public List<Topic> getTopicsFromUser (){

        User u = userService.getUserInfo();
        //TODO Gerer le filtre
        return topicRepository.findAll().stream().filter(t -> t.getSubcribers().contains(u)).collect(Collectors.toList());

    }
    public Topic getTopicById (long id){
        return topicRepository.findById(id).get();
    }
    /*public String createTopic(Topic topic){
        try{
            topicRepository.save(topic);
        }catch (Exception e){
            return "Error creating topic : " + topic.getName();
        }
        return "topic created";
    }
    public String deleteTopic(long id){
        try{
            topicRepository.deleteById(id);
        }catch (Exception e){
            return "Error deleting topic : " + getTopicById(id).getName();
        }
        return "topic deleted";
    }
    public String updateTopic(Topic topic){
        try{
            topicRepository.save(topic);
        }catch (Exception e){
            return "Error updating topic : " + topic.getName();
        }
        return "topic updated";
    }*/


}
