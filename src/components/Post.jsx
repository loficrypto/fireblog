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
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">{post.title}</h1>
      {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full max-h-96 object-cover mb-6 rounded-md shadow-md" />}
      <div className="prose lg:prose-xl mx-auto">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <div className="mt-8">
        <h3 className="text-2xl font-bold mb-4 text-gray-900">Comments</h3>
        <form onSubmit={handleComment} className="mb-8">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="border p-2 w-full mb-4 rounded-md"
            placeholder="Add a comment"
          />
          <button type="submit" className="bg-blue-500 text-white p-2 rounded">Comment</button>
        </form>
        {comments.map((c, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md shadow-sm">
            {c.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Post;
