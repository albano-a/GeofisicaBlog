import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow bg-background-50">
          <AppRoutes></AppRoutes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
