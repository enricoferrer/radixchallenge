import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import "./Cadastro.css"

const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
  
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      if (email.trim().length === 0 || password.trim().length === 0 || name.trim().length === 0 || confirmPassword.trim().length === 0) {
        setError('Please fill in all the fields.');
        return;
      } 

      if(password != confirmPassword){
        setError('Passwords don´t match in the password and confirm password fields.')
        return;
      }

      if (password.trim().length <= 6 ) {
        setError('Password must be at least 6 characters long.');
        return;
      } 
      
      const verificarEmail = async () =>{
        const requestBody = {
          query: `
            query{
            getEmailDuplicate(email: "${email}")
            }
          `
        }

        const resposta = await fetch('http://localhost:9000/graphql',{
          method: 'POST',
          body: JSON.stringify(requestBody),
          headers: {
            'Content-Type': 'application/json'
          }
        })

        const dado = await resposta.json();

        return dado.data.getEmailDuplicate;

      }

      const emailDuplicado = verificarEmail.value

      if(emailDuplicado){
        setError('Email already registered.!');
        return;
      }

      setError('');
      console.log('Cadastrado com:', { name ,email });

      const requestBody = {
        query: `
          mutation{
            createUser(userInput: {name: "${name}", email: "${email}", password: "${password}"}){
              email
              name
              password
              createdAt
            }
          }`
      };

      const cadastrar = await fetch('http://localhost:9000/graphql',{
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (cadastrar.ok) {
        alert("Registration successful!")
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    };
  
    return (
      <div className="container">
        <h2 className="signUp">Sign Up</h2>
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="name">First Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="input"
            />
          </div>
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
          <div className="input-group">
            <label htmlFor="confirmPassword">Confirm your Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="input"
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="button">Sign up</button>
        </form>
        <Link to="/"><p>Sign In</p></Link>
      </div>
    );
  };
  
export default Cadastro;