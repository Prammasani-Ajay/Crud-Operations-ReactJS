// src/CrudOperations.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const CrudOperations = () => {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [idToUpdate, setIdToUpdate] = useState(null);

  // Fetch students
  const fetchStudents = async () => {
    const querySnapshot = await getDocs(collection(db, 'students'));
    const studentsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setStudents(studentsList);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Create student
  const createStudent = async () => {
    if (name) {
      await addDoc(collection(db, 'students'), { name });
      setName('');
      fetchStudents();
    }
  };

  // Update student
  const updateStudent = async (id) => {
    const studentDoc = doc(db, 'students', id);
    await updateDoc(studentDoc, { name });
    setIdToUpdate(null);
    setName('');
    fetchStudents();
  };

  // Delete student
  const deleteStudent = async (id) => {
    await deleteDoc(doc(db, 'students', id));
    fetchStudents();
  };

  return (
    <div>
      <h1>Student CRUD Operations</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter student name"
      />
      <button onClick={idToUpdate ? () => updateStudent(idToUpdate) : createStudent}>
        {idToUpdate ? 'Update' : 'Add'} Student
      </button>

      <ul>
        {students.map(student => (
          <li key={student.id}>
            {student.name}
            <button onClick={() => {
              setIdToUpdate(student.id);
              setName(student.name);
            }}>Edit</button>
            <button onClick={() => deleteStudent(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CrudOperations;
