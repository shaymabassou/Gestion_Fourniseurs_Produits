import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container'; 
import Nav from 'react-bootstrap/Nav'; 
import Navbar from 'react-bootstrap/Navbar'; 
import { Link, useLocation } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';
import './Nav.css'; // Importez le fichier CSS

function BasicExample() { 
    const navigate = useNavigate();

    // Gérer la déconnexion
    const handleLogout = () => {
        // Supprimer token, isAuth du stockage local 
        localStorage.removeItem('token');
        localStorage.removeItem('isAuth');
        // Rediriger vers la page de connexion
        navigate('/auth/login');
    };   

    // Gérer l'authentification
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Récupérer l'état de l'authentification depuis le stockage local
        const isAuth = localStorage.getItem('isAuth') === 'true';
        setIsAuthenticated(isAuth);
    }, [location]);

    // Condition pour déterminer si le lien actif est "Home"
    const isActiveLinkHome = location.pathname === '/';

    return ( 
        <div className={isActiveLinkHome ? 'home-background' : ''}>
            <Navbar bg="light" data-bs-theme="light" expand="lg" className="fixed-top">
                <Container>
                   <Navbar.Brand href="/">Home</Navbar.Brand> 
                    <Nav className="me-auto">
                        {/* Afficher le lien de déconnexion si l'utilisateur est authentifié */}
                        {isAuthenticated ? (
                            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                        ) : (
                            <>
                              <Nav.Link><Link to={'contactpage'}>Contact</Link></Nav.Link>
                               <Nav.Link><Link to={'auth/login'}>Log in</Link></Nav.Link>
                                <Nav.Link><Link to={'auth/register'}>Register</Link></Nav.Link>
                            </>
                        )}
                    </Nav>
                </Container>
            </Navbar>
        </div>
    ); 
} 

export default BasicExample;
