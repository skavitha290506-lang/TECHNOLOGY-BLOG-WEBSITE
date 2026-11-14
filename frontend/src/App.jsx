
import React from "react";
import "./App.css";

import Header from "./components/Header";
import Hero from "./components/Hero";
import FeaturedArticle from "./components/FeaturedArticle";
import About from "./components/About";
import BlogCard from "./components/BlogCard";
import Admin from "./components/Admin";
import Login from "./components/Login";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="technova-app">
      <Header />

      <main>
        <Hero />
        <FeaturedArticle />
        <About />
        <BlogCard />
        <Admin />
        <Login />
      </main>

      <Footer />
    </div>
  );
}

export default App;
