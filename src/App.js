import { Button } from "antd";
import "./App.css";
function App() {
  return (
    <div className="App">
      <AppHeader />
      <PageContent />
      <AppFooter />
    </div>
  );
}

function AppHeader() {
  return <div className="appHeader">AppHeader</div>;
}
function AppFooter() {
  return <div className="appFooter">AppFooter</div>;
}
function PageContent() {
  return <div className="pageContent">PageContent</div>;
}

export default App;
