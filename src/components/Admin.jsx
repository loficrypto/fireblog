// Admin.jsx
import React, { useState } from 'react';
import { db, storage } from './firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import ReactMarkdown from 'react-markdown';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    if (image) {
      const storageRef = ref(storage, `images/${image.name}`);
      await uploadBytes(storageRef, image);
      imageUrl = await getDownloadURL(storageRef);
    }
    await addDoc(collection(db, 'posts'), { title, content, imageUrl });
    setTitle('');
    setContent('');
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      <div>
        <label className="block mb-2">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-4"
        />
      </div>
      <div>
        <label className="block mb-2">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 w-full mb-4"
        />
      </div>
      <div>
        <label className="block mb-2">Image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      <ReactMarkdown className="mt-4">{content}</ReactMarkdown>
    </form>
  );
};

export default Admin;
