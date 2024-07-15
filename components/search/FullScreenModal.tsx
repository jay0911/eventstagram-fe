import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

interface FullScreenModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (name: string, tags: string[]) => void;
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ isOpen, onClose, onSearch }) => {
  const [name, setName] = useState('');
  const [tags, setTags] = useState('');

  const handleSearch = () => {
    onSearch(name, tags.split(',').map(tag => tag.trim()));
    onClose();
  };

  useEffect(() => {
    console.log(isOpen)
  }, [isOpen]);

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
          label="Tags (comma separated)"
          variant="outlined"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
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

export default FullScreenModal;
