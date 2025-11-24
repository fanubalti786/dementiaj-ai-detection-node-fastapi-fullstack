import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import Newsletter from '../components/Newsletter'
import Footer from '../components/Footer'
import FAQSection from '../components/FaqSection'

export default function Home() {
  return (
    <div>
      <Navbar/>
      <Header/>
      <BlogList/>
      <FAQSection/>
      <Newsletter/>
      <Footer/>
    </div>
  )
}
