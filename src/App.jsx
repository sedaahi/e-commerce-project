import AppRouter from "./router/AppRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { verifyToken } from "./store/actions/clientActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return <AppRouter />;
}

export default App;