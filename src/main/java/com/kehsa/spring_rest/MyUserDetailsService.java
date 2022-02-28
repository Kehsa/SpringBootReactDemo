package com.kehsa.spring_rest;

import com.kehsa.spring_rest.database.repositories.UsersRepository;
import com.kehsa.spring_rest.database.entities.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public class MyUserDetailsService implements UserDetailsService {
    private final UsersRepository users;

    public MyUserDetailsService(UsersRepository users) {
        this.users = users;
    }

    @Override
    public UserDetails loadUserByUsername(String s) throws UsernameNotFoundException {
        var u = users.findByLogin(s);
        if (u == null) throw new UsernameNotFoundException(s);
        UserDetails b = org.springframework.security.core.userdetails.User.builder()
                .username(u.getLogin())
                .password(u.getPassword())
                .roles(u.getRole().split(" "))
                .build();
        return new MyUser(u, b.getUsername(), b.getPassword(), b.getAuthorities());
    }

    public static class MyUser extends org.springframework.security.core.userdetails.User implements UserDetails {
        private final int id;
        private final User user;

        public MyUser(User u, String username, String password, Collection<? extends GrantedAuthority> authorities) {
            super(username, password, authorities);
            this.id = u.getId();
            this.user = u;
        }

        public int getId() {
            return id;
        }
        public User getUser() {
            return user;
        }
    }
}
