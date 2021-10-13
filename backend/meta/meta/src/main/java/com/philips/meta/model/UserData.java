package com.philips.meta.model;

import lombok.Setter;

@Setter
public class UserData {
	private User user;
	private String newPassword;
	
	public User getUser() {
		return user;
	}
	
	public String getNewPassword() {
		return newPassword;
	}
}
