package com.myfirstspringproject.rest_api_springboot;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class FirstControleer {

    @GetMapping("/welcome")
    public String first_api(){
        return "Welcome to first project of the spring boot";
    } 

}
