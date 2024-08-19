package com.springrest.springrest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.springrest.springrest.entites.Course;
import com.springrest.springrest.services.CourseService;

@RestController
public class MyController {
	 
	@Autowired
	private CourseService courseServices;
	private Object courseService;
	
	@GetMapping("/home")
	public String home() {
		return "Welcome to courses application";
	}
	
	// it will get all courses
	@GetMapping("/courses")
	public List<Course> getCourses()
	{
		
		return this.courseServices.getCourses();
		
	}
	
	// for single ones
	@GetMapping("/courses/{courseId}")
	public Course getCourse(@PathVariable String courseId) {
		return this.courseServices.getCourse(Long.parseLong(courseId));
	}
	
	//post request
	@PostMapping("/courses")
	public Course addCourse(@RequestBody Course course) {
		return ((CourseService) this.courseService).addCourse(course);
	}
	
	@PutMapping("/courses/{courseId}")
	public Course updateCourse(@RequestBody Course course, @PathVariable String courseId) {
		return this.courseServices.updateCourse(Long.parseLong(courseId), course);
	}
	
	// delete request to delete a course
	@DeleteMapping("/courses/{courseId}")
	public void deleteCourse(@PathVariable String courseId) {
		this.courseServices.deleteCourse(Long.parseLong(courseId));
	}
}
