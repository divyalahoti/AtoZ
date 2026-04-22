import { useLocation } from "react-router-dom";
import Navbar from './../components/Navbar/Navbar';
import Footer from "../components/Footer/Footer";


const Layout = ({ children }) => {
    const location = useLocation();
    const isAdmin = location.pathname.startsWith("/admin");

    return (
        <>
            {!isAdmin && <Navbar />}
            {children}
            {!isAdmin && <Footer />}
        </>
    );
};

export default Layout;