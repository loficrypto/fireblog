import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import useSEO from './useSEO';
import { Helmet } from 'react-helmet';

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [relatedPosts, setRelatedPosts] = useState([]);

  useSEO({
    title: post ? post.title : 'Loading...',
    description: post ? post.content.substring(0, 150) : 'Loading...',
    keywords: post ? post.tags.join(', ') : 'Loading...'
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

    const fetchRelatedPosts = async () => {
      const relatedPostsCollection = collection(db, 'posts');
      const querySnapshot = await getDocs(relatedPostsCollection);
      const allPosts = querySnapshot.docs.map((doc) => doc.data());
      setRelatedPosts(allPosts.filter(p => p.category === post.category && p.id !== id));
    };

    fetchPost();
    fetchComments();
    fetchRelatedPosts();
  }, [id]);

  const handleComment = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, `posts/${id}/comments`), { text: comment });
    setComments([...comments, { text: comment }]);
    setComment('');
  };

  if (!post) return <div>Loading...</div>;

  return (
    <>
      <Helmet>
        <title>{post.title}</title>
        <meta name="description" content={post.content.substring(0, 150)} />
        <meta name="keywords" content={post.tags.join(', ')} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "image": post.imageUrl,
            "author": {
              "@type": "Person",
              "name": "Your Name"
            },
            "datePublished": post.publishedDate,
            "articleBody": post.content
          })}
        </script>
      </Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-900">{post.title}</h1>
        {post.imageUrl && <img src={post.imageUrl} alt={post.title} className="w-full max-h-96 object-cover mb-6 rounded-md shadow-md" />}
        <div className="prose lg:prose-xl mx-auto">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={dracula}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
              iframe({ node, ...props }) {
                return <div className="iframe-container"><iframe {...props} /></div>;
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
        <div className="mt-4">
          <p className="text-sm text-gray-500">Category: {post.category}</p>
          <p className="text-sm text-gray-500">Tags: {post.tags.join(', ')}</p>
          <p className="text-sm text-gray-500">Reading Time: {post.readingTime} min</p>
          <p className="text-sm text-gray-500">Published Date: {new Date(post.publishedDate).toLocaleDateString()}</p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-bold mb-4 text-gray-900">Related Posts</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                <h4 className="text-xl font-bold">{relatedPost.title}</h4>
                <p>{relatedPost.content.substring(0, 100)}...</p>
                <Link to={`/post/${relatedPost.id}`} className="text-blue-500 hover:underline">Read more</Link>
              </div>
            ))}
          </div>
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
    </>
  );
};

export default Post;
