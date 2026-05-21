import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import Header from "../layout/Header";
import PageContent from "../layout/PageContent";
import Footer from "../layout/Footer";
import ScrollToTop from "./ScrollToTop";

export default function AppRouter() {
  return (
    <Router>
      <ScrollToTop />
      <div className="w-full overflow-x-hidden">
        <Header />
        <PageContent />
        <Footer />

        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </Router>
  );
}
