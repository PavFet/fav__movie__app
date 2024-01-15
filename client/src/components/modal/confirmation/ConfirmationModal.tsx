import React from 'react'
import './confirmationModal.scss'

interface ConfirmationModalProps {
  onToggle: () => void;
  onConfirm: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({onToggle, onConfirm}) => {
  return (
    <div className='confirmation__modal__overlay'>
      <div className="confirmation__modal__content">
        <h4>Are you sure?</h4>
        <div className="confirmation__buttons__block">
          <button onClick={onConfirm} className='confirmation__button --yes'>Yes</button>
          <button onClick={onToggle} className='confirmation__button --no'>No</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal