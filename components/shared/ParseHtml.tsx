'use client';

import Prism from 'prismjs';
import parse from 'html-react-parser';


import { useEffect } from 'react';

interface ParseHtmlParams {
  content: string;
}
const ParseHtml = ({ content }: ParseHtmlParams) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return <div className="markdown">{parse(content)}</div>;
};

export default ParseHtml;
