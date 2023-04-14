import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Home from '../home/Home'
import Login from '../login/Login'
import Search from '../search/Search'
import Result from '../result/Result'
import './App.scss'
import { connect } from 'react-redux'

function App(props) {
  const { isAuth } = props
  // console.log(props)

  return (
    <>
      <BrowserRouter>
        <Header />
        <main className='main'>
          <div className='wrapper'>
            <Routes>
              <Route path={'/'} element={<Home />} />
              <Route path={'/login'} element={isAuth ? <Navigate to="/" replace /> : <Login />} />
              <Route path={'/search'} element={isAuth ? <Search /> : <Navigate to="/" replace />} />
              <Route path={'/result'} element={isAuth ? <Result /> : <Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default connect(
  state => ({
    isAuth: state.isAuth
  })
)(App);
