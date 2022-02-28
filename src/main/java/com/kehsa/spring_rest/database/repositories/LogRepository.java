package com.kehsa.spring_rest.database.repositories;

import com.kehsa.spring_rest.database.entities.Log;
import org.springframework.data.repository.CrudRepository;

public interface LogRepository extends CrudRepository<Log, Long> {
}