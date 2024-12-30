import React  from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';
import { FullScreenSearchModalProps } from './SearchServiceModal.types';
import { usePriceRangeModal } from './SearchServiceModal.hooks';
const FullScreenSearchModal: React.FC<FullScreenSearchModalProps> = ({ isOpen, onClose, onSearch }) => {

  const { name, setName, location, setLocation, handleSearch } = usePriceRangeModal({ isOpen, onClose, onSearch });

  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <DialogTitle>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SearchIcon style={{ marginRight: 8 }} />
            Search Parameters
          <CloseIcon style={{ cursor: 'pointer' }} onClick={onClose} />
        </div>
      </DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: 16, marginTop: 16 }}
        />
        <TextField
          fullWidth
          label="Location"
          variant="outlined"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{ marginBottom: 16 }}
        />
      </DialogContent>
      <DialogActions>
        <Button style={{ marginBottom: 28, height: '3.5rem' }} fullWidth onClick={handleSearch} variant="contained" color="primary">
          Search
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FullScreenSearchModal;
