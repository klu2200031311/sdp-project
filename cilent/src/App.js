import { Routes, Route } from 'react-router-dom';
import Index from './Index/Index';
import AdminLogin from './Index/AdminLogin';
import StudentLogin from './Index/StudentLogin';
import AdminIndex from './AdminIndex/AdminIndex';
import StudentIndex from './StudentIndex/StudentIndex';
import AdminDashboard from './AdminIndex/AdminDashboard';
import StudentDashboard from './StudentIndex/StudentDashboard';
import AddClass from './AdminIndex/AddClass';
import Error from './Error/Error';
import ManageClass from './AdminIndex/ManageClass';
import EditClass from './AdminIndex/EditClass';
import ChangePassword from './AdminIndex/ChangePassword';
import AddStudent from './AdminIndex/AddStudent';
import ManageStudent from './AdminIndex/ManageStudent';
import EditStudent from './AdminIndex/EditStudent';
import AddStudentNotice from './AdminIndex/AddStudentNotice';
import ManageStudentNotice from './AdminIndex/ManageStudentNotice';
import EditStudentNotice from './AdminIndex/EditStudentNotice';
import ManagePublicNotice from './AdminIndex/ManagePublicNotice';
import EditPublicNotice from './AdminIndex/EditPublicNotice';
import AddPublicNotice from './AdminIndex/AddPublicNotice';
import Search from './AdminIndex/Search';
import DateReport from './AdminIndex/DateReport';
import StudentDetail from './AdminIndex/StudentDetail';
import Change_Password from './StudentIndex/Change_Password';
import Profile from './StudentIndex/Profile';
import StudentNotice from './StudentIndex/StudentNotice';

function App() {
  return (
   
      <Routes>
        <Route path="/index" element={<Index />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
 
        <Route path="/" element={<AdminIndex />}>
          <Route path='' element={<AdminDashboard />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/addclass" element={<AddClass />} />
          <Route path="/manageclass" element={<ManageClass />} />
          <Route path="/editclass/:id" element={<EditClass />} />
          <Route path="/addStudent/" element={<AddStudent />} />
          <Route path="/manageStudent/" element={<ManageStudent />} />
          <Route path="/editStudent/:id" element={<EditStudent />} />
          <Route path="/addStudentNotice/" element={<AddStudentNotice />} />
          <Route path="/manageStudentNotice/" element={<ManageStudentNotice />} />
          <Route path="/editStudentNotice/:id" element={<EditStudentNotice />} />
          <Route path="/addPublicNotice/" element={<AddPublicNotice />} />
          <Route path="/editPublicNotice/:id" element={<EditPublicNotice />} />
          <Route path="/managePublicNotice/" element={<ManagePublicNotice />} />
          <Route path="/search/" element={<Search />} />
          <Route path="/searchReport/" element={<DateReport />} />
          <Route path="/studentDetail/:id" element={<StudentDetail />} />
        </Route>

        <Route path="/student" element={<StudentIndex />}>
          <Route path='' element={<StudentDashboard />} />
          <Route path='change_Password' element={<Change_Password />} />
          <Route path='profile' element={<Profile />} />
          <Route path='studentNotice' element={<StudentNotice />} />
        </Route>
      
        <Route path="*" element={<Error />} ></Route>
      </Routes>
  );
}

export default App;
