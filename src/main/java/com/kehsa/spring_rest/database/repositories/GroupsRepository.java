package com.kehsa.spring_rest.database.repositories;

import com.kehsa.spring_rest.database.entities.Group;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface GroupsRepository extends CrudRepository<Group, Integer> {
    @Override
    @Query("select g from Group g where g.deleted = false")
    Iterable<Group> findAll();
}