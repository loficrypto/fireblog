import React from 'react';
import { Helmet } from 'react-helmet';

const Terms = () => {
  return (
    <>
      <Helmet>
        <title>Terms and Conditions - My Blog</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
        <p>Welcome to My Blog!</p>

        <p>These terms and conditions outline the rules and regulations for the use of My Blog's Website, located at myblog.com.</p>

        <h2 className="text-2xl font-bold mt-4">Acceptance of Terms</h2>
        <p>By accessing this website we assume you accept these terms and conditions. Do not continue to use My Blog if you do not agree to all of the terms and conditions stated on this page.</p>

        <h2 className="text-2xl font-bold mt-4">License</h2>
        <p>Unless otherwise stated, My Blog and/or its licensors own the intellectual property rights for all material on My Blog. All intellectual property rights are reserved. You may access this from My Blog for your own personal use subjected to restrictions set in these terms and conditions.</p>

        <h2 className="text-2xl font-bold mt-4">User Comments</h2>
        <p>This Agreement shall begin on the date hereof. Certain parts of this website offer the opportunity for users to post and exchange opinions and information in certain areas of the website. My Blog does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of My Blog, its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, My Blog shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>

        <h2 className="text-2xl font-bold mt-4">Hyperlinking to our Content</h2>
        <p>The following organizations may link to our Website without prior written approval:</p>
        <ul className="list-disc list-inside">
          <li>Government agencies</li>
          <li>Search engines</li>
          <li>News organizations</li>
        </ul>

        <h2 className="text-2xl font-bold mt-4">iFrames</h2>
        <p>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</p>

        <h2 className="text-2xl font-bold mt-4">Content Liability</h2>
        <p>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>

        <h2 className="text-2xl font-bold mt-4">Your Privacy</h2>
        <p>Please read our Privacy Policy.</p>

        <h2 className="text-2xl font-bold mt-4">Reservation of Rights</h2>
        <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</p>

        <h2 className="text-2xl font-bold mt-4">Removal of links from our website</h2>
        <p>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</p>

        <h2 className="text-2xl font-bold mt-4">Disclaimer</h2>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
        <ul className="list-disc list-inside">
          <li>limit or exclude our or your liability for death or personal injury;</li>
          <li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li>
          <li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li>
          <li>exclude any of our or your liabilities that may not be excluded under applicable law.</li>
        </ul>
      </div>
    </>
  );
};

export default Terms;
