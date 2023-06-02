import { useEffect, useState, useContext } from 'react';
import { Stack, Container, Typography, Grid } from '@mui/material';
import CustomButton from '../../share/components/CustomButton';
import NoteCard from './components/NoteCard';
import NoteDetailModal from './components/NoteDetailModal';
import NoteCreateModal from './components/NoteCreateModal';
import NoteEditModal from './components/NoteEditModal';
import GlobalContext from '../../share/Context/GlobalContext';
import Cookies from 'js-cookie';
import Axios from '../../share/AxiosInstance';
import { AxiosError } from 'axios';

const Home = () => {
  const { user, setStatus } = useContext(GlobalContext);

  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetail, setOpenDetail] = useState(false);
  const [targetNote, setTargetNote] = useState({});
  const [notes, setNotes] = useState([]);

  // useEffect(() => {
    // TODO: Implement get notes by user's token
    // 1. check if user is logged in
    // const userToken = Cookies.get('UserToken');
    // if (userToken !== undefined && userToken !== 'undefined') {
      // 2. call API to get notes
      // Axios.get('/notes', { headers: { Authorization: `Bearer ${userToken}` } }).then((res) => {
       // 3. set notes to state
        // setNotes(res.data.data);
      // });
    // }
  // }, [user]);

  // Note Create Modal
  const handleNoteCreateOpen = () => {
    if (!user) {
      setStatus({
        msg: 'You must login to create note',
        severity: 'error',
      });
    } else {
      setOpenCreate(true);
    }

    setTimeout(() => setStatus(), 1000);
  };
  const handleNoteCreateClose = () => {
    setOpenCreate(false);
  };

  // Note Edit Modal
  const handleNoteEditOpen = () => {
    setOpenEdit(true);
  };
  const handleNoteEditClose = () => {
    setOpenEdit(false);
  };

  // Note Detail Modal
  const handleNoteDetailOpen = () => {
    setOpenDetail(true);
  };
  const handleNoteDetailClose = () => {
    setOpenDetail(false);
  };

  const handleTargetNoteChange = (note) => {
    setTargetNote(note);
    handleNoteDetailOpen();
  };

  // Edit Note
  const handleEdit = () => {
    handleNoteDetailClose();
    handleNoteEditOpen();
  };

  // Delete Note
  const handleDelete = async () => {
    // TODO: Implement delete note
    try{
    // 1. call API to delete note
    const userToken = Cookies.get('UserToken');
    const response = await Axios.delete(`/note/${targetNote.id}`, {
      headers: {Authorization: `Bearer ${userToken}`}, 
    });
    // 2. if successful, set status and remove note from state
    if(response.data.success){
      setStatus({severity: 'success', msg: 'Delete note successfully'});
      setNotes(notes.filter((n) => n.id !==targetNote.id));
      handleNoteDetailClose();
    }
  }catch(error){
     // 3. if delete note failed, check if error is from calling API or not
     if(error instanceof AxiosError && error.response){
      setStatus({severity: 'error', msg: error.response.data.error});
     }else{
      setStatus({severity: 'error', msg: error.message});
     }
  }
   
  };

  return (
      <Container maxWidth="md">
        <Stack direction="row" justifyContent="flex-start" alignItems="center" marginBottom={4}>
  <Typography fontSize={50} color="white" marginLeft={0} position="absolute" top={0} left={0}>
    NoteApp
  </Typography>
</Stack>
        <NoteDetailModal
          note={targetNote}
          open={openDetail}
          handleClose={handleNoteDetailClose}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
        <NoteEditModal note={targetNote} open={openEdit} handleClose={handleNoteEditClose} setNotes={setNotes} />
        <NoteCreateModal open={openCreate} handleClose={handleNoteCreateClose} setNotes={setNotes} />
        <CustomButton text="Create" handle={handleNoteCreateOpen} fontSize={24} fontWeight={'bold'} />
    
        {user ? (
          notes.length === 0 ? (
            <Typography textAlign="center" fontSize={20} color="white" fontWeight="bold" marginTop={30}>
              You haven't created any notes! <br />
              Create your own notes
            </Typography>
          ) : (
            <Grid container spacing={3}>
              {notes.map((note, index) => (
                <Grid item xs={4} key={index}>
                  <NoteCard title={note.title} date={note.updatedAt} handleClick={() => handleTargetNoteChange(note)} />
                </Grid>
              ))}
            </Grid>
          )
        ) : (
          <Typography textAlign="center" fontSize={20} color="white" fontWeight="bold" marginTop={20}>
            No note available! <br />
            You must login first to create your own note! <br/><br/><br/>

            "Keeping note will help you to be a productive person"

          </Typography>
        )}
      </Container>
    
  );
};

export default Home;
