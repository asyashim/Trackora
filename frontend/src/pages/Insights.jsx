
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Insights = () => {
  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <Header />

        <div className="insights-page">
          <h1>Insights</h1>
          <p>
            Track your job search progress and application activity.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Insights;
