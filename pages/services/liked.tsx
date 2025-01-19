
import LikedServicesList from 'components/likedServices/LikedServicesList';
import withAuth from 'pages/auth/withAuth';

const LikedServicesPage: React.FC = () => {
    return (
      <div className="container mx-auto">
         <LikedServicesList />
      </div>
    );
  };
  
  export default withAuth(LikedServicesPage);