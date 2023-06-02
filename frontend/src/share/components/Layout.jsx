import { useMemo, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container} from '@mui/material';
import Narbar from './Navbar';
import AuthModal from '../modal/auth/AuthModal';
import SnackBarMessage from '../SnackBarMessage';
import GlobalContext from '../Context/GlobalContext';

const Layout = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [status, setStatus] = useState('');
  const handleOpen = () => setOpenLoginModal(true);
  const handleClose = () => setOpenLoginModal(false);

  const [user, setUser] = useState();
  const globalContextValue = useMemo(() => {
    return {
      user,
      setUser,
      setStatus,
    };
  }, [user]);

  const generatekey = () => {
    return Math.random();
  };
  return (
    <GlobalContext.Provider value={globalContextValue}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'black',
          backgroundSize: '300% 300%',
        }}
      >
        <Container maxWidth="xl">
          <Narbar handleOpen={handleOpen} user={user} setUser={setUser} />
          <Outlet />
        </Container>
        <AuthModal open={openLoginModal} handleClose={handleClose} setStatus={setStatus} setUser={setUser} />
        
        {status ? (
          <SnackBarMessage key={generatekey()} open={status.open} severity={status.severity} message={status.msg} />
        ) : null}
      </Box>
    </GlobalContext.Provider>
  );
};

export default Layout;
