import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
) {
  return function WithAuthComponent(props: P) {
    const router = useRouter();
    const { isAuthenticated, isLoaded } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
      if (isLoaded && !isAuthenticated) {
        router.replace({
          pathname: '/login',
          query: { returnUrl: router.asPath }
        });
      }
    }, [isAuthenticated, isLoaded, router]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
}