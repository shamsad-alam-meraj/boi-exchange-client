import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import BorrowMessage from "./components/BorrowPage/BorrowMessage";
import BorrowPage from "./components/BorrowPage/BorrowPage";
import BuyNow from "./components/BuyNow/BuyNow";
import ExchangeMessage from "./components/ExchangePage/ExchangeMessage";
import ExchangePage from "./components/ExchangePage/ExchangePage";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MyProfile from "./components/MyProfile/MyProfile";
import Navbar from "./components/Navbar/Navbar";
import NotFound from "./components/NotFound/NotFound";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import SignUp from "./components/SignUp/SignUp";
import Store from "./components/Store/Store";
import RequireAdmin from "./components/RequireAdmin/RequireAdmin";
import RequestsPage from "./components/RequestsPage/RequestsPage";
import ExchangeRequestAccept from "./components/RequestsPage/ExchangeRequestAccept";
import BorrowRequestAccept from "./components/RequestsPage/BorrowRequestAccept";
import Users from "./components/AdminDashboard/Users";
import LibrarianManage from "./components/AdminDashboard/LibrarianManage";
import Books from "./components/AdminDashboard/Books";
import AddBook from "./components/AdminDashboard/AddBook";
import RequireLibrarian from "./components/RequireLibrarian/RequireLibrarian";
import LibrarianDashboard from "./components/LibrarianDashboard/LibrarianDashboard";
import { Toaster } from "react-hot-toast";
import EditProfile from "./components/EditProfile/EditProfile";
import Profile from "./components/Profile/Profile";
import ForgotPassword from "./components/Login/ForgotPassword";
import Orders from "./components/Orders/Orders";

function App() {
  return (
    <div className="lg:px-2 px-1 w-full">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<SignUp></SignUp>}></Route>
        <Route path="/store" element={<Store></Store>}></Route>

        <Route path="/dashboard" element={<MyProfile></MyProfile>}></Route>
        <Route path="/exchange" element={<ExchangePage></ExchangePage>}></Route>
        <Route path="/borrow" element={<BorrowPage></BorrowPage>}></Route>
        <Route path="/requests" element={<RequestsPage></RequestsPage>}></Route>
        <Route path="/myProfile" element={<Profile></Profile>}></Route>

        <Route
          path="/forgotPassword"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route
          path="/editProfile"
          element={<EditProfile></EditProfile>}
        ></Route>
        <Route
          path="/exchangeAcceptance/:bookId"
          element={<ExchangeRequestAccept></ExchangeRequestAccept>}
        ></Route>
        <Route
          path="/borrowAcceptance/:bookId"
          element={<BorrowRequestAccept></BorrowRequestAccept>}
        ></Route>
        <Route
          path="/exchange/:bookId"
          element={
            <RequireAuth>
              <ExchangeMessage></ExchangeMessage>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/borrow/:bookId"
          element={
            <RequireAuth>
              <BorrowMessage></BorrowMessage>
            </RequireAuth>
          }
        ></Route>
        <Route
          path="buyNow/:bookId"
          element={
            <RequireAuth>
              <BuyNow></BuyNow>
            </RequireAuth>
          }
        ></Route>
        {/* Admin Dashboard  */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <AdminDashboard></AdminDashboard>
            </RequireAdmin>
          }
        ></Route>
        <Route path="/admin/dashboard/users" element={<Users></Users>}></Route>
        <Route
          path="/admin/dashboard/librarians"
          element={<LibrarianManage></LibrarianManage>}
        ></Route>
        <Route path="/admin/dashboard/books" element={<Books></Books>}></Route>
        <Route
          path="/admin/dashboard/books/addBook"
          element={<AddBook></AddBook>}
        ></Route>
        <Route
          path="/admin/dashboard/orders"
          element={<Orders></Orders>}
        ></Route>
        {/* Librarian Dashboard  */}
        <Route
          path="/librarian/dashboard"
          element={
            <RequireLibrarian>
              <LibrarianDashboard></LibrarianDashboard>
            </RequireLibrarian>
          }
        ></Route>
        <Route
          path="/librarian/dashboard/books"
          element={<Books></Books>}
        ></Route>
        <Route
          path="/librarian/dashboard/books/addBook"
          element={<AddBook></AddBook>}
        ></Route>
        <Route
          path="/librarian/dashboard/orders"
          element={<Orders></Orders>}
        ></Route>
        {/* All  */}
        <Route path="*" element={<NotFound></NotFound>}></Route>
      </Routes>
      <Toaster position="top-center"></Toaster>
    </div>
  );
}

export default App;
