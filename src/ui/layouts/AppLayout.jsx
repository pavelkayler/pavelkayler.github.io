import { Header } from "../components/header/Header.jsx";
import { UserBar } from "../components/userBar/UserBar.jsx";

const AppLayout = ({ children }) => {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-content">{children}</main>
      <UserBar />
    </div>
  );
};

export { AppLayout };
