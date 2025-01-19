
import withAuth from 'pages/auth/withAuth';
import MyServicesList from '../../components/myServices/MyServicesList';

const MyServicesListMainPage: React.FC = () => {
    return (
      <div className="container mx-auto">
        <MyServicesList />
      </div>
    );
  };
  
  export default withAuth(MyServicesListMainPage);
  
