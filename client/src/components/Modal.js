import React from 'react';
import ReactDOM from 'react-dom';
import history from '../history';

const ModalWrapper = props => {
  return (
    <div
      onClick={() => history.push('/')}
      className='ui dimmer modals visible active'
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className='ui standart modal visible active'
      >
        <div className='header'>{props.title}</div>
        <div className='content'>{props.content}</div>
        <div className='actions'>{props.actions}</div>
      </div>
    </div>
  )
}

const Modal = props => {
  return ReactDOM.createPortal(
    <ModalWrapper {...props} />,
    document.querySelector('#modal')
  )
}

export default Modal;
