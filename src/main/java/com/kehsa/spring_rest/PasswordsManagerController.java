package com.kehsa.spring_rest;

import com.kehsa.spring_rest.database.repositories.UsersRepository;
import com.kehsa.spring_rest.database.entities.User;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class PasswordsManagerController {
    private final UsersRepository users;
    private final SecurityConfig.PasswordData passwordData;

    public PasswordsManagerController(UsersRepository users, SecurityConfig.PasswordData passwordData) {
        this.users = users;
        this.passwordData = passwordData;
    }

    @GetMapping({
            "/api/passwords",
            "/api/passwords/{id}"
    })
    @PreAuthorize("hasRole('ADMIN')")
    public String passwords() {
        return "react";
    }

    @PatchMapping("/api/passwords/{id}")
    @ResponseBody
    @PreAuthorize("hasRole('ADMIN')")
    public String newPassword(@PathVariable int id, @RequestBody User n) {
        User u = users.findById(id).orElseThrow();
        if (n.getPassword() != null) {
            u.setPassword(passwordData.encoderPrefix+passwordData.encoder.encode(n.getPassword()));
        }
        users.save(u);
        return "OK";
    }
}