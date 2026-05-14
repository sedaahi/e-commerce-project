import { BrowserRouter as Router } from "react-router-dom";
import Header from "../layout/Header";
import PageContent from "../layout/PageContent";
import Footer from "../layout/Footer";
export default function AppRouter() {
  return (
    <Router>
      <div className="w-full overflow-x-hidden">
        <Header />
        <PageContent />
        <Footer />
      </div>
    </Router>
  );
}