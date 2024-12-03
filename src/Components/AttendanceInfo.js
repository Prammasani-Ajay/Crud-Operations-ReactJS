import React, { useState, useEffect } from 'react';
import studentsData from './studentsData.json'; // Adjust path if needed

const AttendanceInfo = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    setAttendanceData(studentsData);
  }, []);

  // Function to handle view action
  const handleView = (student) => {
    setSelectedStudent(student);
  };

  // Filter students based on selected date
  const filteredStudents = attendanceData.filter(student =>
    student.attendance.some(att => att.date === selectedDate && att.status === 'Present')
  );

  return (
    <div style={{ display: 'flex', padding: '20px' }}>
      {/* Attendance List Section */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h1>Attendance List</h1>
        <label htmlFor="attendance-date">Select Attendance Date : </label>
        <input
          type="date"
          id="attendance-date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ margin: '10px 0', padding: '8px', width: '200px' }} // Adjusted width
        />
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ border: '1px solid black', padding: '8px' }}>Attendance Status</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Student Name</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Mobile Number</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Batch</th>
              <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  {student.attendance.find(att => att.date === selectedDate)?.status}
                </td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.studentName}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.mobileNumber}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>{student.batch}</td>
                <td style={{ border: '1px solid black', padding: '8px' }}>
                  <button onClick={() => handleView(student)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Details Section */}
      <div style={{ flex: 1 }}>
        {selectedStudent ? (
          <div style={{ padding: '20px', border: '1px solid black', marginTop: "140px" }}>
            <h2>Student Details</h2>
            <p><strong>Name:</strong> {selectedStudent.studentName}</p>
            <p><strong>Mobile Number:</strong> {selectedStudent.mobileNumber}</p>
            <p><strong>Email ID:</strong> {selectedStudent.emailId}</p>
            <p><strong>Batch:</strong> {selectedStudent.batch} (Batch Number: {selectedStudent.batchNumber})</p>
            <p><strong>Stream:</strong> {selectedStudent.stream}</p>
            <p><strong>Year Passed Out:</strong> {selectedStudent.yearPassedOut}</p>
            <p><strong>Gender:</strong> {selectedStudent.gender}</p>
            <p><strong>Fee Due:</strong> ${selectedStudent.feeDue}</p>
            <p><strong>Date of Birth:</strong> {selectedStudent.dob}</p>
            {/* <p><strong>Attendance:</strong></p>
            <ul>
              {selectedStudent.attendance.map((att, index) => (
                <li key={index}>{att.date}: {att.status}</li>
              ))}
            </ul> */}
          </div>
        ) : (
          <h2>Select a student to view details</h2>
        )}
      </div>
    </div>
  );
};

export default AttendanceInfo;

