import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Login.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (email.trim().length === 0 || password.trim().length === 0) {
        setError('Please fill in all the fields.');
        return;
      } 
      
      setError('');
      

      const requestBody = {
        query: `
          query{
            userLogin(email: "${email}", password: "${password}"){
              name
              email
              createdAt
            }
          }`
      };

      try {
        const resposta = await fetch('http://localhost:9000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const dado = await resposta.json();

        if (!resposta.ok || dado.errors) {
            
            setError(dado.errors ? dado.errors[0]?.message : 'Erro ao fazer login');
            return;
        }

        
        console.log('Login bem-sucedido:', dado.data.userLogin);
        alert("Login successful!")
        setTimeout(() => {
          navigate('/Dashboard');
        }, 500);
    } catch (error) {
        console.error('Erro na requisição:', error);
        setError('Erro ao fazer login');
    }

    };
  
    return (
      <div className="container">
        <h2 className="login">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button">Enter</button>
        </form>
        <Link to="/Cadastro"><p>Sign Up</p></Link>
      </div>
    );
  };

export default Login;