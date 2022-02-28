package com.kehsa.spring_rest.database.repositories;

import com.kehsa.spring_rest.database.entities.SubGroup;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface SubGroupsRepository extends CrudRepository<SubGroup, Integer> {
    @Override
    @Query("select g from SubGroup g where g.deleted = false")
    Iterable<SubGroup> findAll();
}