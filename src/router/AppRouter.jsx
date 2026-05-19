import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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

        <ToastContainer
          position="top-right"
          autoClose={2500}
        />
      </div>
    </Router>
  );
}