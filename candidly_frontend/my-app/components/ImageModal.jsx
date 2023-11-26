import {useEffect} from 'react';
import Modal from 'react-modal';
import Image from 'next/image';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '80%',
  },
};

Modal.setAppElement('#__next'); // Set the root element for accessibility

const ImageModal = ({ isOpen, onClose, images }) => {
    useEffect(() => {
        const body = document.body;
        
        if (isOpen) {
          body.style.overflow = 'hidden';
        } else {
          body.style.overflow = 'auto';
        }
    
        return () => {
          body.style.overflow = 'auto';
        };
      }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose} style={customStyles}>
      <div className="modal-content">
        {images.map((image, index) => (
          <Image key={index} src={image} alt={`Image ${index}`} className="modal-image" width={1000} height={1000} />
        ))}
      </div>
      <div className='flex justify-end'>
        <button onClick={onClose} className='bg-black text-white py-1 mt-2 rounded-lg px-5'>Close</button>
      </div>
    </Modal>
  );
};

export default ImageModal;
