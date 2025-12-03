import { Header } from "../components/header/Header.jsx";

const AppLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Header />
      {children}
    </div>
  );
};

export { AppLayout };
