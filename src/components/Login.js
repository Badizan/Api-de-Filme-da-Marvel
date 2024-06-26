import React, { useState } from 'react';
import '../components/Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!email) newErrors.email = 'Email é obrigatório';
    if (!password) newErrors.password = 'Senha é obrigatória';
    else if (password.length < 8) newErrors.password = 'Senha deve ter no mínimo 8 caracteres';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      onLogin();
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Senha</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit" disabled={!email || !password || password.length < 8}>Entrar</button>
      </form>
    </div>
  );
};

export default Login;
