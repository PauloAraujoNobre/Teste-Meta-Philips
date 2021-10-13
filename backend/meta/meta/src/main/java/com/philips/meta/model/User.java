package com.philips.meta.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Setter;

@Entity
@Setter
@Table(name = "user", schema = "public")
public class User 
{
	private Long id;
	
	private String name;
	private String cpf;
	private String email;
	private String password;
	private String birthDate;
	private String address;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	public Long getId() {
		return id;
	}

    @Size(min = 1, max = 50)
    @NotNull
	public String getName() {
		return name;
	}
    
    @Size(min = 1, max = 50)
    @NotNull
	public String getEmail() {
		return email;
	}
    
    @Size(min = 1, max = 50)
    @NotNull
	public String getPassword() {
		return password;
	}
    
    @Size(min = 1, max = 250)
    @NotNull
	public String getCpf() {
		return cpf;
	}

    @Size(min = 1, max = 250)
    @NotNull
	public String getBirthDate() {
		return birthDate;
	}

    @Size(min = 1, max = 250)
    @NotNull
	public String getAddress() {
		return address;
	}
}
