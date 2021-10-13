package com.philips.meta.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.philips.meta.model.User;
import com.philips.meta.repository.UserRepository;

@Service
public class UserService {
	@Autowired private UserRepository userRepository;
	
	public boolean uniqueCpfAndEmail(User user) {
		List<User> listUser = new ArrayList<User>();
		
		try {
			listUser = userRepository.findAll();			
		} catch(Exception e) {}
		
		for (User userIndex : listUser) {
			if (userIndex.getCpf().equalsIgnoreCase(user.getCpf())
					|| userIndex.getEmail().equalsIgnoreCase(user.getEmail())) {
				return false;
			}
		}
		
		return true;
	}
	
	public boolean checkEmailInUse(String email) {
		List<User> listUser = new ArrayList<User>();
		
		try {
			listUser = userRepository.findAll();			
		} catch(Exception e) {}
		
		for (User userIndex : listUser) {
			if (userIndex.getEmail().equalsIgnoreCase(email)) {
				return true;
			}
		}
		
		return false;
	}
	
	public User loginUser(User userData) {
		User user = userRepository.findByEmail(userData.getEmail());
		
		if (user != null && user.getPassword().equalsIgnoreCase(userData.getPassword())) {
			return user;
		}
		
		return null;
	}
}
