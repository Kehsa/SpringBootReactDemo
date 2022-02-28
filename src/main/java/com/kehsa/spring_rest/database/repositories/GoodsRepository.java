package com.kehsa.spring_rest.database.repositories;

import com.kehsa.spring_rest.database.entities.Good;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface GoodsRepository extends CrudRepository<Good, Long> {
    @Override
    @Query("select g from Good g where g.deleted = false")
    Iterable<Good> findAll();
}
