import React from 'react'
import Footer from './Components/Footer/Footer.jsX'
import {Outlet} from 'react-router-dom'
import Header from './Components/Header/Header'
function Layout() {
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}
export default Layout
