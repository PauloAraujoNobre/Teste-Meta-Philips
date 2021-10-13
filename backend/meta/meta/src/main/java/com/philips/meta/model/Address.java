package com.philips.meta.model;

import java.util.UUID;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.Setter;

@Entity
@Setter
public class Address {
	private UUID id;
	
	private String country;
	private String city;
	private String district;
	private String street;
	private String number;
	private String postalCode;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	public UUID getId() {
		return id;
	}
	
	@Size(min = 1, max = 50)
    @NotNull
	public String getCountry() {
		return country;
	}
	
	@Size(min = 1, max = 50)
    @NotNull
	public String getCity() {
		return city;
	}
	
	@Size(min = 1, max = 50)
    @NotNull
	public String getDistrict() {
		return district;
	}
	
	@Size(min = 1, max = 50)
    @NotNull
	public String getStreet() {
		return street;
	}
	
	@Size(min = 1, max = 50)
    @NotNull
	public String getNumber() {
		return number;
	}
	
	@Size(min = 1, max = 50)
    @NotNull
	public String getPostalCode() {
		return postalCode;
	}
}
