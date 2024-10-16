import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as API from '../../utils/api.service'
import { TOAST_ERROR } from '../../utils/common.service';
import Cookies from 'js-cookie';

const LoginForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [loginMethod, setLoginMethod] = useState('email'); // Default to email
  const [showPassword, setShowPassword] = useState(false);

  
  const onSubmit = async(body) => {
    if (loginMethod === 'email') {
      body.email = body.identifier
    }
    else{
      body.mobile_number = body.identifier
    }
    try{
        const {code,message,data} = await API.login(body);
        if (code == 1) {
          Cookies.set('userDetails', JSON.stringify(data), { expires: 2 });
          Cookies.set('token', data.token, { expires: 2 });
          navigate('/');
        }
    }
    catch(e){
        TOAST_ERROR(e.message);
    }
    
  };


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginMethodChange = (method) => {
    setLoginMethod(method);
    reset(); 
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Login</h2>

          <div className="btn-group mb-3" role="group" aria-label="Login Method">
            <button
              type="button"
              className={`btn ${loginMethod === 'email' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLoginMethodChange('email')}
            >
              Login with Email
            </button>
            <button
              type="button"
              className={`btn ${loginMethod === 'mobile' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => handleLoginMethodChange('mobile')}
            >
              Login with Mobile
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Conditional Input Field based on Login Method */}
            <div className="mb-3">
              <label htmlFor="identifier" className="form-label">
                {loginMethod === 'email' ? 'Email Address' : 'Mobile Number'}
              </label>
              <input
                type="text"
                className={`form-control ${errors.identifier ? 'is-invalid' : ''}`}
                id="identifier"
                {...register('identifier', {
                  required: `${loginMethod === 'email' ? 'Email is required' : 'Mobile number is required'}`,
                  validate: (value) => {
                    if (loginMethod === 'mobile') {
                      return /^\d{10}$/.test(value) || 'Must be a valid 10-digit mobile number';
                    }
                    return /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value) || 'Must be a valid email address';
                  },
                })}
                placeholder={`Enter your ${loginMethod === 'email' ? 'email' : '10-digit mobile number'}`}
              />
              {errors.identifier && <div className="invalid-feedback">{errors.identifier.message}</div>}
            </div>

            {/* Password Field */}
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
                      message: 'Password must be at least 6 characters',
                    },
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

            <button type="submit" className="btn btn-primary w-100">Login</button>
          </form>

          <div className="text-center mt-3">
            Don't have an account? 
            <Link to="/signup" className="btn btn-link">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
