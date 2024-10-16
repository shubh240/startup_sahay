import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as API from '../../utils/api.service';
import { TOAST_ERROR } from '../../utils/common.service';

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async(body) => {
    try{
        const {code,message,data} = await API.signupApi(body);
        if (code === '1') {
          navigate('/login');
        }
    }
    catch(e){
        TOAST_ERROR(e.message)
    }
    
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Sign Up</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                id="username"
                {...register('username', { required: 'Username is required' })}
                placeholder="Enter your username"
              />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: 'Invalid email address'
                  }
                })}
                placeholder="Enter your email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="mobile" className="form-label">Mobile Number</label>
              <input
                type="text"
                className={`form-control ${errors.mobile_number ? 'is-invalid' : ''}`}
                id="mobile"
                {...register('mobile_number', {
                  required: 'Mobile number is required',
                  pattern: {
                    value: /^\d{10}$/,
                    message: 'Enter a valid 10-digit mobile number'
                  }
                })}
                placeholder="Enter your 10-digit mobile number"
              />
              {errors.mobile_number && <div className="invalid-feedback">{errors.mobile_number.message}</div>}
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                  id="password"
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters'
                    }
                  })}
                  placeholder="Enter your password"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: 'pointer' }}
                  onClick={togglePasswordVisibility}
                >
                  <i className={!showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                </span>
              </div>
              {errors.password && <div className="text-danger">{errors.password.message}</div>}
            </div>

            <div className="mb-3 position-relative">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="input-group">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                  id="confirmPassword"
                  {...register('confirmPassword', {
                    required: 'Confirm password is required',
                    validate: (value) =>
                      value === document.getElementById('password').value || 'Passwords do not match',
                  })}
                  placeholder="Confirm your password"
                />
                <span
                  className="input-group-text"
                  style={{ cursor: 'pointer' }}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <i className={!showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                </span>
              </div>
              {errors.confirmPassword && (
                <div className="text-danger">{errors.confirmPassword.message}</div>
              )}
            </div>

            <button type="submit" className="btn btn-primary w-100">Sign Up</button>
          </form>
          <div className="text-center mt-3">
            Already have an account? 
            <Link to="/login" className="btn btn-link">Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
