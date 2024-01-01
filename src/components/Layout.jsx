import { Meta } from 'react-dom';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';

const Layout = ({ children }) => {
	return (
		<>
			{/* <BottomNavigation showLabels>
        <BottomNavigationAction label="Recents"/>
        <BottomNavigationAction label="Recents"/>
        <BottomNavigationAction label="Recents"/>
      </BottomNavigation> */}
			{children}
		</>
	);
};

export default Layout;
