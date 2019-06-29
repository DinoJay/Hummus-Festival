import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import '../css/style.css';
import '../css/index.css';

import App from '../app/index'


function IndexPage() {
  return (
    <>
      <SEO
        title="Home"
        keywords={[`Humus`, `festival`, `dance`, `music`, 'torino', 'turin']}
      />
    <App/>
    </>
  );
}

export default IndexPage;
