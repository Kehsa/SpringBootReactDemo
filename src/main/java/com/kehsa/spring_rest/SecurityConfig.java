package com.kehsa.spring_rest;

import com.kehsa.spring_rest.database.entities.User;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Optional;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@EnableJpaAuditing(auditorAwareRef = "auditorProvider")
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    private static final String REMEMBER_ME_SECRET_KEY = "huecret";

    private final MyUserDetailsService userService;

    public SecurityConfig(MyUserDetailsService userService) {
        this.userService = userService;
    }

    @Bean
    public AuditorAware<User> auditorProvider() {/*@EntityListeners(AuditingEntityListener.class)*/
        /*@LastModifiedBy @ManyToOne @JsonProperty(access = JsonProperty.Access.READ_ONLY)*/
        return  () -> Optional.of(
                ((MyUserDetailsService.MyUser) SecurityContextHolder
                        .getContext().getAuthentication().getPrincipal()).getUser()
        );
    }

    @Bean
    public PasswordData passwordData() {
        return new PasswordData();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }


    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService);//auth.inMemoryAuthentication().withUser("admin").password("{noop}123").roles("ADMIN");
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring().antMatchers("/src/**", "/favicon.ico");
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.authorizeRequests()
                .antMatchers("/test**").permitAll()
                .anyRequest().authenticated()
                .and().formLogin()
                .and().rememberMe().key(REMEMBER_ME_SECRET_KEY);
    }

    static class PasswordData {
        public final String encoderPrefix = "{bcrypt}";
        public final PasswordEncoder encoder = new BCryptPasswordEncoder();
    }
}