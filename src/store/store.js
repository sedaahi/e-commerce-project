import { applyMiddleware, compose, createStore } from "redux";

// Async action (thunk) desteği sağlar.
// API istekleri gibi asenkron işlemler yapılabilsin diye kullanılır.
import { thunk } from "redux-thunk";

// Redux action ve state değişimlerini console'da izlemek için kullanılır.
import { createLogger } from "redux-logger";

// Uygulamadaki tüm reducer'ların birleştirildiği ana reducer.
import rootReducer from "./reducers/rootReducer";

const logger = createLogger();

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      thunk,  // async işlemler
      logger, // debug amaçlı loglama
    ),
  ),
);

export default store;