import { Switch, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";

export default function PageContent() {
  return (
    <main>
      <Switch>
        <Route exact path="/" component={HomePage} />
      </Switch>
    </main>
  );
}