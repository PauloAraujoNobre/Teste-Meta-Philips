package com.philips.meta.controller;

import static org.springframework.http.ResponseEntity.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.databind.ObjectMapper;

import com.philips.meta.model.User;
import com.philips.meta.model.UserData;
import com.philips.meta.repository.UserRepository;
import com.philips.meta.service.UserService;

@RestController
@RequestMapping("/v1/user")
public class UserController 
{
	@Autowired private UserRepository userRepository;
	@Autowired private UserService userService;
	@Autowired protected ObjectMapper jsonMapper;
	
    @GetMapping("/{id}")
    @CrossOrigin(origins = "*", methods = { RequestMethod.GET}, allowedHeaders = "*")
    public ResponseEntity<?> getUserById(@PathVariable Long id)
    {
        User user = userRepository.findById(id).orElse(null);
        return user != null ? status(HttpStatus.OK).body(user) : status(HttpStatus.NOT_FOUND).body(("Item not found"));
    }
	
    @PostMapping("/login")
	@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.OPTIONS }, allowedHeaders = "*")
	public ResponseEntity<?> loginUser(@RequestBody User userData) 
	{    	
    	User user = userService.loginUser(userData);
    	
		if (user != null) {
			return status(HttpStatus.OK).body(user);
		}

        return status(HttpStatus.ACCEPTED).body(user);
	}
    
	@PostMapping
	@CrossOrigin(origins = "*", methods = { RequestMethod.POST, RequestMethod.OPTIONS }, allowedHeaders = "*")
	public ResponseEntity<?> createUser(@RequestBody User user) 
	{	
		if (userService.uniqueCpfAndEmail(user)) {
			userRepository.save(user);
			return status(HttpStatus.CREATED).body(user);
		}

        return status(HttpStatus.ACCEPTED).body(user);
	}
	
	@PutMapping("/{userId}")
	@CrossOrigin(origins = "*", methods = { RequestMethod.PUT}, allowedHeaders = "*")
	public ResponseEntity<?> updateUser(@PathVariable Long userId, @RequestBody UserData userData) 
	{	
		User user = userRepository.findById(userId).orElse(null);
		
		if (user != null) {
			if (!user.getPassword().equalsIgnoreCase(userData.getUser().getPassword()) ) {
				return status(HttpStatus.ACCEPTED).body("password");
			}
			
			if (userService.checkEmailInUse(userData.getUser().getEmail())) {
				return status(HttpStatus.ACCEPTED).body("email");
			}
			
			userData.getUser().setId(user.getId());
			userData.getUser().setCpf(user.getCpf());
			userData.getUser().setPassword(userData.getNewPassword());
			user = userData.getUser();
			userRepository.save(user);
		}

        return status(HttpStatus.OK).body(user);
	}
	
	@DeleteMapping("/{userId}")
	@CrossOrigin(origins = "*", methods = { RequestMethod.DELETE}, allowedHeaders = "*")
	public ResponseEntity<?> updateUser(@PathVariable Long userId) 
	{	
		User user = userRepository.findById(userId).orElse(null);
		
		if (user != null) {
			userRepository.delete(user);
			return status(HttpStatus.OK).body(null);
		}
		
        return status(HttpStatus.ACCEPTED).body(null);
	}
}