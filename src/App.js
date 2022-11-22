
import React , {createContext, useEffect, useState}from 'react'
import { Route, Routes } from 'react-router-dom';
import { BookDetail } from './BookDetail';
import { LandingPage } from './LandingPage'
export  const contextData=createContext()
export  const contextSearchData=createContext()
export const ContextTheame=createContext()
function App() {
  const[BookDetail1,setBookDetail1]=useState([])
  const[detail,setDetail]=useState([])
  
  return (
    <div className="App">
       <contextData.Provider value={{BookDetail1,setBookDetail1 }}>
       <contextSearchData.Provider value={{detail,setDetail}}>
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/BookDetail' element={<BookDetail/>}></Route>
      </Routes>
      </contextSearchData.Provider>
      </contextData.Provider>
      
      </div>
  )
}
export default App;

