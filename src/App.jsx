// Uygulamadaki tüm sayfa yönlendirmelerini yöneten router yapısı.
import AppRouter from "./router/AppRouter";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { verifyToken } from "./store/actions/clientActions";
import { fetchCategoriesIfNeeded } from "./store/actions/productActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());

    // Kategoriler daha önce yüklenmemişse API'den çekilir.
    // Böylece kategori verileri uygulama genelinde kullanılabilir hale gelir.
    dispatch(fetchCategoriesIfNeeded());
  }, [dispatch]);

  return <AppRouter />;
}

export default App;