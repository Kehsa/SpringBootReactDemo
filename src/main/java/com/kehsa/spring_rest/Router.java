package com.kehsa.spring_rest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class Router {

    @GetMapping({
            "/",
            "/goods",
            "/editor",
            "/test"
    })
    private String react() {
        return "react";
    }

//    @GetMapping("/api/chtototam")
//    @PreAuthorize("hasRole('ADMIN')")
//    public String admins() {
//        return "react";
//    }

    /*
    // TODO delete me
    @PostMapping("/test")
    @ResponseBody
    public String test(@RequestParam Map<String, String> m, @RequestBody Optional<String> s) {
        if (s.isPresent()) System.out.println(s.get());
        else System.out.println("have no body");
        System.out.println(m);
        return "OK";
    }*/
}