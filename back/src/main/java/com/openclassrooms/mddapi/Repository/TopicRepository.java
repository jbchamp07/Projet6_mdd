package com.openclassrooms.mddapi.Repository;


import com.openclassrooms.mddapi.Model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepository  extends JpaRepository<Topic,Long> {
}
