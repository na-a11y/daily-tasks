package com.springrest.springrest.services;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.springrest.springrest.entites.Course;

@Service
public class CourseServiceImpl implements CourseService {

	List<Course> list;
	
    public CourseServiceImpl() {
		
    	list = new ArrayList<>();
    	list.add(new Course(145, "Java Core", "its a crash course of java"));
    	list.add(new Course(123, "spring boot Core", "its a crash course of spring boot"));
	}
	
	@Override
	public List<Course> getCourses() {
		return list;
	}

	@Override
	public Course getCourse(long courseId) {
		Course c = null;
		for (Course course : list) {
			if (course.getId() == courseId) {
				c = course;
				break;
			}
		}
		return c;
	}
	
	@Override
	public Course addCourse(Course course) {
		list.add(course);
		return course;
	}

	@Override
	public Course updateCourse(long courseId, Course course) {
		for (Course c : list) {
			if (c.getId() == courseId) {
				c.setTitle(course.getTitle());
				c.setDescription(course.getDescription());
				return c;
			}
		}
		return null;
	}
	
	@Override
	public void deleteCourse(long courseId) {
		list.removeIf(course -> course.getId() == courseId);
	}
}
