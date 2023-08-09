import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "antd/dist/antd.css";
import Layout from "./HOC/Layout/Layout";
import DetailMovie from "./UserView/Pages/DetailMovie/DetailMovie";
import HomePage from "./UserView/Pages/HomePage/HomePage";
import LoginPage from "./UserView/Pages/LoginPage/LoginPage";
import TheatresListPage from "./UserView/Pages/TheatresListPage/TheatresListPage";
import BookingPage from "./UserView/Pages/BookingPage/BookingPage";
import SelectSeat from "./UserView/Pages/BookingPage/SelectSeat/SelectSeat";
import BookingConfirmation from "./UserView/Pages/BookingPage/BookingConfirmation";
import SecureView from "./HOC/SecureView";
import LoadingScreen from "./UserView/Components/LoadingScreen/LoadingScreen";
import RegisterPage from "./UserView/Pages/LoginPage/RegisterPage";
import UnderDevelopedPage from "./UserView/Pages/UnderDevelopedPage/UnderDevelopedPage";
import ProfilePage from "./UserView/Pages/Profile/ProfilePage";

function App() {
  return (
    <div>
      <LoadingScreen />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout Component={HomePage} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/register"
            element={<Layout Component={RegisterPage} />}
          />
          <Route
            path="/theatres/"
            element={<Layout Component={TheatresListPage} />}
          />
          <Route
            path="/detail/:maPhim"
            element={<Layout Component={DetailMovie} />}
          />
          <Route
            path="/booking/:maPhim"
            element={<Layout Component={BookingPage} />}
          />
          <Route
            path="/selectseat/:maLichChieu"
            element={
              <SecureView>
                <Layout Component={SelectSeat} />
              </SecureView>
            }
          />
          <Route
            path="/booking-confirm/:maLichChieu"
            element={
              <SecureView>
                <Layout Component={BookingConfirmation} />
              </SecureView>
            }
          />
          <Route
            path="/underDeveloped"
            element={<Layout Component={UnderDevelopedPage} />}
          />

          {/* Profile page */}
          <Route
            path="/profile"
            element={
              <SecureView>
                <Layout Component={ProfilePage} />
              </SecureView>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
