package com.openclassrooms.mddapi.Service;

import com.openclassrooms.mddapi.DTO.MessageResponse;
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

    //Get all topics
    public List<Topic> getAllTopics(){
        return topicRepository.findAll();
    }

    //User subscribe to a topic
    public MessageResponse subscription(int topicId){
        try{
            User u = userService.getUserInfo();

            Topic topic = getTopicById(topicId);
            topic.getSubcribers().add(u);
            topicRepository.save(topic);

            return new MessageResponse("Abonnement OK");
        }catch (Exception e){
            return new MessageResponse("Erreur lors de l'abonnement :" + e.getMessage());
        }
    }

    //Get all topics the user is subscribe to
    public List<Topic> getTopicsFromUser (){

        User u = userService.getUserInfo();

        return topicRepository.findAll().stream()
                .filter(t -> t.getSubcribers().stream().anyMatch(subscriber -> subscriber.getId() == u.getId()))
                .collect(Collectors.toList());
    }

    //Get a topic informations by is id
    public Topic getTopicById (long id){
        return topicRepository.findById(id).get();
    }

    //Unsubscribe user from a topic
    public MessageResponse unSubscribe(long topicId) {
        try{
            Topic topic = topicRepository.findById(topicId).get();
            User user = userService.getUserInfo();
            topic.getSubcribers().remove(user);
            topicRepository.save(topic);
            return new MessageResponse("Désabonné");
        }catch (Exception e){
            return new MessageResponse("Erreur lors du désabonnement");
        }
    }



}
