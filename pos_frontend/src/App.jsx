import {BrowserRouter as Router, Routes, Route, useLocation, Navigate} from "react-router-dom"
import {Home, Auth, Orders, Tables, Menu, Dashboard} from './pages'
import Header from './components/shared/Header'
import FullScreenLoader from "./components/shared/FullScreenLoader";
import { useSelector } from "react-redux";
import useLoadData from "./hooks/useLoadData";

function Layout() {

  const location = useLocation();
  const isLoading = useLoadData();
  const hideHeaderRoutes = ["/auth"];
  const { isAuth } = useSelector(state => state.user)

  if(isLoading) return <FullScreenLoader/>

  return (
    <>
      
        {!hideHeaderRoutes.includes(location.pathname) && <Header />}
        <Routes>
          <Route path="/" element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
          <Route path="/auth" element={isAuth ? <Navigate to = "/"/> : <Auth/>}/>
          <Route path="/Orders" element={<ProtectedRoutes><Orders/></ProtectedRoutes>}/>
          <Route path="/Tables" element={<ProtectedRoutes><Tables/></ProtectedRoutes>}/>
          <Route path="/menu" element={<ProtectedRoutes><Menu/></ProtectedRoutes>}/>
          <Route path="/dashboard" element={<ProtectedRoutes><Dashboard/></ProtectedRoutes>}/>
          <Route path="*" element={<div>Not Found</div>}/>
        </Routes>
        
    </>
  );  

}

function ProtectedRoutes({children}) {
   const {isAuth} = useSelector(state => state.user);
   if(!isAuth){
    return <Navigate to = "/Auth" />
   }

   return children;

}

function App() {
  
  return(
    <Router>
      <Layout/>
    </Router>
  )

}

export default App