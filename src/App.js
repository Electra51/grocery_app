import { Button } from "antd";
import "./App.css";
import AppHeader from "./Components/Header";
import AppFooter from "./Components/Footer";
import PageContent from "./Components/PageContent";
function App() {
  return (
    <div className="App">
      <AppHeader />
      <PageContent />
      <AppFooter />
    </div>
  );
}

export default App;
