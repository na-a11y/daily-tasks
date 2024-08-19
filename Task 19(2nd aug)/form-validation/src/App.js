import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for form fields and errors
  const [form, setForm] = useState({ fullname: '', email: '', phone: '', password: '' });
  const [errors, setErrors] = useState({ fullname: '', email: '', phone: '', password: '' });

  // Custom exception classes
  class ValidationError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }

  class StorageError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
    }
  }

  // Validate individual form fields
  const validateField = (name, value) => {
    switch (name) {
      case 'fullname':
        if (!value) throw new ValidationError('Full name is required', 400);
        else if (!/^[A-Z]/.test(value)) throw new ValidationError('Full name must start with a capital letter', 400);
        break;
      case 'email':
        if (!value) throw new ValidationError('Email is required', 400);
        else if (!/\S+@\S+\.\S+/.test(value)) throw new ValidationError('Invalid email format', 400);
        break;
      case 'phone':
        if (!value) throw new ValidationError('Phone number is required', 400);
        else if (!/^[789]\d{9}$/.test(value)) throw new ValidationError('Phone number must start with 7, 8, or 9 and be 10 digits', 400);
        break;
      case 'password':
        if (!value) throw new ValidationError('Password is required', 400);
        else if (value.length < 6) throw new ValidationError('Password must be at least 6 characters', 400);
        else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(value)) throw new ValidationError('Password must contain lowercase, uppercase, number, and special character', 400);
        break;
      default:
        break;
    }
  };

  // Handle form field changes and validate
  const handleChange = (e) => {
    const { name, value } = e.target;
    try {
      setForm({ ...form, [name]: value });
      validateField(name, value);
      setErrors({ ...errors, [name]: '' });
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(`Error ${error.statusCode}: ${error.message}`);
        setErrors({ ...errors, [name]: error.message });
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { fullname, email, phone, password } = form;
    let valid = true;
    let newErrors = { fullname: '', email: '', phone: '', password: '' };

    // Validate all fields before submission
    try {
      validateField('fullname', fullname);
    } catch (error) {
      valid = false;
      newErrors.fullname = error.message;
      console.error(`Error ${error.statusCode}: ${error.message}`);
    }

    try {
      validateField('email', email);
    } catch (error) {
      valid = false;
      newErrors.email = error.message;
      console.error(`Error ${error.statusCode}: ${error.message}`);
    }

    try {
      validateField('phone', phone);
    } catch (error) {
      valid = false;
      newErrors.phone = error.message;
      console.error(`Error ${error.statusCode}: ${error.message}`);
    }

    try {
      validateField('password', password);
    } catch (error) {
      valid = false;
      newErrors.password = error.message;
      console.error(`Error ${error.statusCode}: ${error.message}`);
    }

    if (valid) {
      try {
        // Store data in localStorage
        localStorage.setItem('formData', JSON.stringify(form));
        alert('Form data saved successfully!');
        console.log('Status 200: Form data saved successfully');
      } catch (error) {
        console.error('Error 500: Error saving form data', error);
      }
    } else {
      setErrors(newErrors);
    }
  };

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const storedData = localStorage.getItem('formData');
      if (storedData) {
        setForm(JSON.parse(storedData));
      }
      console.log('Status 200: Data loaded successfully');
    } catch (error) {
      console.error('Error 500: Error loading form data', error);
    }
  }, []);

  return (
    <div className="App">
      <h1>Registration Form Using ReactJS</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="fullname">Full Name:</label>
          <input
            id="fullname"
            name="fullname"
            type="text"
            value={form.fullname}
            onChange={handleChange}
          />
         
        </div>
        {errors.fullname && <p className="error">{errors.fullname}</p>}

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
         
        </div>
        {errors.email && <p className="error">{errors.email}</p>}

        <div className="form-group">
          <label htmlFor="phone">Phone Number:</label>
          <input
            id="phone"
            name="phone"
            type="text"
            value={form.phone}
            onChange={handleChange}
          />
         
        </div>
        {errors.phone && <p className="error">{errors.phone}</p>}

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          
        </div>
        {errors.password && <p className="error">{errors.password}</p>}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
