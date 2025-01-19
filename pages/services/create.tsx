import withAuth from 'pages/auth/withAuth';
import CreateService from '../../components/createService/CreateService';

const CreateServiceMainPage: React.FC = () => {
    return (
      <div className="container mx-auto">
        <CreateService />
      </div>
    );
  };
  
  export default withAuth(CreateServiceMainPage);
  