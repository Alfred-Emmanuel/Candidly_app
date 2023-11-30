import { useEffect,useState } from 'react';
import Modal from 'react-modal';
import Image from 'next/image';
import Loading from '@/app/loading';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%',
    maxHeight: '95vh',  
    overflow: 'hidden'
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    zIndex: 999, 
  },
};

Modal.setAppElement('#__next'); 

const ImageModal = ({ isOpen, onClose, images }) => {
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };

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
      <div className="modal-content flex items-center justify-center">
        {images.map((image, index) => (
          <>
            <div key={index} className={`relative flex items-center  ${loading ? 'block' : 'hidden'}`}>
              <Loading />
            </div>        
            <Image
              key={index} 
              src={image} 
              alt={`Image ${index}`} 
              className={`md:object-contain max-h-[85vh] w-full ${loading ? 'hidden' : 'block'}`}
              width={1000} 
              height={100} 
              onLoad={handleImageLoad}
              />
          </>
        ))}
      </div>
      <div className='flex justify-end'>
        <button onClick={onClose} className='bg-black text-white py-1 mt-2 rounded-lg px-5'>Close</button>
      </div>
    </Modal>
  );
};

export default ImageModal;
