import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
      <div style={styles.container}>
        <h2 style={styles.login}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
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
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" style={styles.button}>Enter</button>
        </form>
        <Link to={"/Cadastro"}><p>Sign Up</p></Link>
      </div>
    );
  };
  
  const styles = {
    container: {
      maxWidth: '250px',
      margin: '300px auto',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
    },
    login:{
        marginLeft: "90px",
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
  

export default Login;