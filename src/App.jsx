import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header/Header';
import Courses from './components/Courses/Courses';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import CourseDetails from './components/Courses/components/CourseDetails/CourseDetails';

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='registration' element={<Registration />} />
				<Route path='login' element={<Login />} />
				<Route path='courses' element={<Courses />} />
				<Route path='courses/:id' element={<CourseDetails />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
