import { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const useSEO = ({ title, description, keywords }) => {
  useEffect(() => {
    document.title = title;
    document.head.querySelector('meta[name="description"]').content = description;
    document.head.querySelector('meta[name="keywords"]').content = keywords;
  }, [title, description, keywords]);

  return (
    <Helmet>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
    </Helmet>
  );
};

export default useSEO;
