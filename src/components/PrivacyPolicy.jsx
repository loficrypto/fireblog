// PrivacyPolicy.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy - My Blog</title>
      </Helmet>
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
        <p>Last updated: [Date]</p>

        <p>
          At My Blog, accessible from www.myblog.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by My Blog and how we use it.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Log Files</h2>
        <p>
          My Blog follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Cookies and Web Beacons</h2>
        <p>
          Like any other website, My Blog uses ‘cookies’. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Google DoubleClick DART Cookie</h2>
        <p>
          Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL – <a href="https://policies.google.com/technologies/ads">https://policies.google.com/technologies/ads</a>
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Our Advertising Partners</h2>
        <p>
          Some of advertisers on our site may use cookies and web beacons. Our advertising partners are listed below. Each of our advertising partners has their own Privacy Policy for their policies on user data.
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Google</li>
        </ul>

        <h2 className="text-2xl font-bold mt-4 mb-2">Third Party Privacy Policies</h2>
        <p>
          My Blog's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. You may find a complete list of these Privacy Policies and their links here: Privacy Policy Links.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Children's Information</h2>
        <p>
          Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity. My Blog does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Online Privacy Policy Only</h2>
        <p>
          This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in My Blog. This policy is not applicable to any information collected offline or via channels other than this website.
        </p>

        <h2 className="text-2xl font-bold mt-4 mb-2">Consent</h2>
        <p>
          By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
        </p>
      </div>
    </>
  );
};

export default PrivacyPolicy;
