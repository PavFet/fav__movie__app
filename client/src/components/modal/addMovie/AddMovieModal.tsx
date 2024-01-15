import React, { useState, useEffect } from 'react';
import './addMovieModal.scss'; // Add styles in Modal.css

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: string;
}

const AddMovieModal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    setIsVisible(isOpen);

    if (isOpen) {
      const timeoutId = setTimeout(() => {
        onClose();
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, onClose]);

  return (
    <div className={`modal ${isVisible ? 'visible' : ''}`}>
      <div className="modal-content">
        <p>{children}</p>
        <div></div>
      </div>
    </div>
  );
};

export default AddMovieModal;