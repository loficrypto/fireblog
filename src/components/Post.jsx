// Post.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebaseConfig';
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import useSEO from './useSEO';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  useSEO({
    title: post ? post.title : 'Loading...',
    description: post ? post.content.substring(0, 150) : 'Loading...',
    keywords: post ? post.title.split(' ').join(', ') : 'Loading...'
  });

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'posts', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
    };

    const fetchComments = async () => {
      const commentsCollection = collection(db, `posts/${id}/comments`);
      const querySnapshot = await getDocs(commentsCollection);
      setComments(querySnapshot.docs.map((doc) => doc.data()));
    };

    fetchPost();
    fetchComments();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `posts/${id}/comments`), { text: comment });
    setComments([...comments, { text: comment }]);
    setComment('');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="mb-4" />}
      <ReactMarkdown>{post.content}</ReactMarkdown>
      <div className="mt-4">
        <h3 className="text-xl font-bold mb-2">Comments</h3>
        <form onSubmit={handleComment} className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full mb-2"
            placeholder="Add a comment"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Comment</button>
        </form>
        {comments.map((c, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
