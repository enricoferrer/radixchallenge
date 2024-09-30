import React, { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aqui você pode adicionar a lógica de autenticação
      if (email === '' || password === '') {
        setError('Por favor, preencha todos os campos.');
      } else {
        setError('');
        console.log('Logando com:', { email, password });
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
            <label htmlFor="password">Senha:</label>
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
          <button type="submit" style={styles.button}>Entrar</button>
        </form>
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