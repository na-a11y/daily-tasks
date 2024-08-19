package com.example.registration_form.controller;

import com.example.registration_form.model.User;
import com.example.registration_form.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
public class RegistrationController {
    @Autowired
    private UserService userService;

    @GetMapping("/register")
    public String showRegistrationForm(Model model) {
        model.addAttribute("user", new User());
        return "register"; // Returns the register.html template
    }

    @PostMapping("/register")
    public String registerUser(@Valid @ModelAttribute("user") User user,
            BindingResult bindingResult, Model model) {
        if (bindingResult.hasErrors()) {
            return "register"; // Return to register.html if validation errors exist
        }
        if (userService.findByEmail(user.getEmail()) != null) {
            model.addAttribute("emailError", "Email already registered");
            return "register"; // Return to register.html if email already exists
        }
        userService.saveUser(user);
        return "redirect:/success"; // Redirect to /success after successful registration
    }

    @GetMapping("/success")
    public String registrationSuccess() {
        return "success"; // Returns the success.html template
    }
}
