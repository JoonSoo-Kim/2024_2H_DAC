package com.test.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestMainController {

	@GetMapping("/api/data")
	public String test() {
		return "Hello React!";
	}
}