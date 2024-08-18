import LiveSectionHome from './LiveSectionHome';
import VisitsOverviewSection from './VisistOverviewSection';
import { useEffect } from 'react';
import { setTitle } from '../../components/Header';
import MediaSectionHome from './MediaOverviewSection';

const Home = () => {

  useEffect(() => {
    setTitle("Home");
  }, []);


  return (
    <div className="page">
      <div className="pageBody">
        <div className="HomePage">
          <LiveSectionHome />
          <VisitsOverviewSection />
          <MediaSectionHome />
        </div>
      </div>
    </div>
  );
};

export default Home;