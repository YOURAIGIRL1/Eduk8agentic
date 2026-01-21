/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import { BlogIndex, CategoryPage, ArticlePage } from './components/blog/BlogPages';
import AIAgentAudit from './components/AIAgentAudit';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/audit" element={<AIAgentAudit />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:categorySlug" element={<CategoryPage />} />
        <Route path="/blog/:categorySlug/:articleSlug" element={<ArticlePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);