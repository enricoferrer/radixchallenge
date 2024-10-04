import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
        setError('Por favor, preencha todos os campos.');
        return;
      } 

      if(password != confirmPassword){
        setError('Senhas diferentes nos campos senha e confirmar senha')
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
        setError('Email já cadastrado!');
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
        alert("Cadastro realizado com sucesso!")
        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    };
  
    return (
      <div style={styles.container}>
        <h2 style={styles.signUp}>Sign Up</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
            <label htmlFor="name">First Name:</label>
            <input
              type="name"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirm your Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button} >Sign up</button>
        </form>
        <Link to={"/"}><p>Sign In</p></Link>
      </div>
    );
  };
  
  const styles = {
    container: {
      maxWidth: '250px',
      margin: '180px auto',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    },
    signUp:{
        marginLeft: "80px",
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: "",
      justifyContent:'',
    },
    inputGroup: {
      marginBottom: '15px',
      marginLeft: '15px'
    },
    input: {
      padding: '10px',
      fontSize: '15px',
      border: '1px solid #ccc',
      borderRadius: '0px',
    },
    button: {
      padding: '10px',
      fontSize: '16px',
      backgroundColor: '#01cf00',
      color: '#ffffff',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
    },
  };
  

export default Cadastro;