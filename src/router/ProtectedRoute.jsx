import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ component: Component, ...rest }) {
  const user = useSelector((state) => state.client.user);

  return (
    <Route
      {...rest}
      render={(props) =>
        user?.email ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}