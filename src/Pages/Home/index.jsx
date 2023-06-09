// importando o useState (Hook) para atualizar o estado de studentName
import React, { useState, useEffect } from 'react';

import './styles.css'

import { Card } from '../../components/Card'



export function Home() {
  
  // criando os estados para atualizar o nome e a lista de estudantes
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({ name: '', avatar: '' })

  //  toda vez que chamar a fun handle abaixo vai criar um objeto Novo Estudante com duas propriedades name e time

  function handleAddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };
  // passando o objeto newStudent para o estado
    setStudents(prevState => [...prevState, newStudent]);
  } 

  // o useEffect é executado automaticamente assim que a interface for renderizada
  useEffect(() => {
    fetch('https://api.github.com/users/thaislst')
      .then(response => response.json())
      .then(data => {
        setUser({
          name: data.name,
          avatar: data.avatar_url,
        })
      });
  }, []);

  return (

    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Foto de perfil Thais Santos Github" />
        </div>
      </header>
      
      <input 
        type="text" 
        placeholder="Digite seu nome..."
        onChange={e => setStudentName(e.target.value)}
        />
      <button type="button" onClick={handleAddStudent}>Adicionar</button>      
      {
        students.map( student =>  (
        <Card 
        key={student.time}
        name={student.name} 
        time={student.time}/>))
      }
    </div>

  )
}


