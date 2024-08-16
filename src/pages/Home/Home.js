import LiveSectionHome from './LiveSectionHome';
import VisitsOverviewSection from './VisistOverviewSection';

const Home = () => {

 
  return (
    <div className="page">
      <div className="pageBody">
        <div className="pageSections">
          <LiveSectionHome />
          <VisitsOverviewSection />
        </div>
      </div>
    </div>
  );
};

export default Home;