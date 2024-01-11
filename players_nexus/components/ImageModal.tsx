import React from 'react';
import Modal from 'react-modal';

const customStyles: Modal.Styles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
    maxHeight: '80%',
  },
};

Modal.setAppElement('#__next'); // For accessibility

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Image Modal"
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl cursor-pointer">
        &times;
      </button>
      {imageUrl && <img src={imageUrl} alt="Full-size Screenshot" className="w-full h-full" />}
    </Modal>
  );
};

export default ImageModal;
