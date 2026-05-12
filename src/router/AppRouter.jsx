import { BrowserRouter as Router } from "react-router-dom";
import Header from "../layout/Header";
import PageContent from "../layout/PageContent";
import Footer from "../layout/Footer";

export default function AppRouter() {
  return (
    <Router>
      <Header />
      <PageContent />
      <Footer />
    </Router>
  );
}