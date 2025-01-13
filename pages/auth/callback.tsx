import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { jwtDecode } from 'jwt-decode';
import { cookieService } from '../../utils/cookieService';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/auth/authSlice';

interface JwtPayload {
    sub: string;
    email: string;
    name: string;
    exp: number;
}

const AuthCallback = () => {
    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        const { token } = router.query;
        
        if (token && typeof token === 'string') {
            try {
                // Store token in cookie
                cookieService.setToken(token);
                
                // Decode token
                const decodedToken = jwtDecode<JwtPayload>(token);
                
                // Update both cookie and Redux state
                cookieService.setUser(decodedToken);
                dispatch(setUser(decodedToken));

                // Redirect to dashboard
                router.push('/');
            } catch (error) {
                console.error('Error decoding token:', error);
                router.push('/login?error=invalid_token');
            }
        }
    }, [router.query, dispatch]);

    return <div>Loading...</div>;
};

export default AuthCallback;