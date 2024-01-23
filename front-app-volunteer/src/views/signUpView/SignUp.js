// SignUp.js
import React from 'react';
import './SignInSignUp.css';

const SignUp = ({ onSignInClick }) => {
  return (
    <form className="sign-up-form">
      <h2 className="title">Sign Up</h2>
      <div className="input-field">
        <i className="fas fa-user"></i>
        <input type="text" placeholder="Username" />
      </div>
      <div className="input-field">
        <i className="fas fa-envelope"></i>
        <input type="email" placeholder="Email" />
      </div>
      <div className="input-field">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Password" />
      </div>
      <input type="submit" value="Sign Up" className="btn solid" />
      <p className="social-text">Or Sign up with social platforms</p>
      <div className="social-media">
        {/* ... Le reste du code JSX pour les icônes de médias sociaux ... */}
      </div>
      <button type="button" className="btn transparent" onClick={onSignInClick}>
        Sign In
      </button>
    </form>
  );
};

export default SignUp;
