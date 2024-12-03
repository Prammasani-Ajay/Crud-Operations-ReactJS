// src/FileUpload.js
import React, { useState, useEffect } from 'react';
import { db, storage } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

const FileUpload = () => {
  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [fileToReplace, setFileToReplace] = useState(null);
  const [fileIdToReplace, setFileIdToReplace] = useState('');

  // Fetch files
  const fetchFiles = async () => {
    const querySnapshot = await getDocs(collection(db, 'files'));
    const filesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setFiles(filesList);
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  // Upload file
  const uploadFile = async () => {
    if (file) {
      const storageRef = ref(storage, `files/${file.name}`);
      await uploadBytes(storageRef, file);
      const url = await getDownloadURL(storageRef);

      // Save file metadata to Firestore
      await addDoc(collection(db, 'files'), { name: file.name, url });
      setFile(null);
      fetchFiles();
    }
  };

  // Delete file
  const deleteFile = async (id, fileName) => {
    const fileDoc = doc(db, 'files', id);
    await deleteDoc(fileDoc);

    // Delete from Storage
    const storageRef = ref(storage, `files/${fileName}`);
    await deleteObject(storageRef);

    fetchFiles();
  };

  // Replace file
  const replaceFile = async () => {
    if (fileToReplace && fileIdToReplace) {
      const existingFile = files.find(file => file.id === fileIdToReplace);
      
      // Delete the existing file from storage
      const storageRef = ref(storage, `files/${existingFile.name}`);
      await deleteObject(storageRef);

      // Upload the new file
      const newStorageRef = ref(storage, `files/${fileToReplace.name}`);
      await uploadBytes(newStorageRef, fileToReplace);
      const url = await getDownloadURL(newStorageRef);

      // Update file metadata in Firestore
      const fileDoc = doc(db, 'files', fileIdToReplace);
      await deleteDoc(fileDoc); // Remove old metadata
      await addDoc(collection(db, 'files'), { name: fileToReplace.name, url });

      setFileToReplace(null);
      setFileIdToReplace('');
      fetchFiles();
    }
  };

  return (
    <div>
      <h1>File Upload</h1>
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button onClick={uploadFile}>Upload File</button>

      <h2>Uploaded Files</h2>
      <ul>
        {files.map(file => (
          <li key={file.id}>
            {file.name}
            <button onClick={() => deleteFile(file.id, file.name)}>Delete</button>
            <button
              onClick={() => {
                setFileIdToReplace(file.id);
                setFileToReplace(null); // Reset the file to replace
              }}
            >
              Replace
            </button>
          </li>
        ))}
      </ul>

      {fileIdToReplace && (
        <div>
          <h3>Replace File</h3>
          <input
            type="file"
            onChange={(e) => setFileToReplace(e.target.files[0])}
          />
          <button onClick={replaceFile}>Confirm Replace</button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
