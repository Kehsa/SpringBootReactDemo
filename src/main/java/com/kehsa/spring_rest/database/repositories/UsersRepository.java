package com.kehsa.spring_rest.database.repositories;

import com.kehsa.spring_rest.database.entities.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.security.access.prepost.PreAuthorize;

import java.util.List;

public interface UsersRepository extends CrudRepository<User, Integer> {

    User findByLogin(String login);
    List<User> findAllByOrderByName();
    List<User> findByNameContaining(String name);

    @Override @PreAuthorize("hasRole('ADMIN')")
    <S extends User> S save(S s);
}