import React from 'react'

const Message = ({ pseudo, message, isUser }) => {
  if (isUser(pseudo)) {
    // Si c'est notre utilisateur connecté
    return (
      <p className='user-message'>
        <strong>Moi : </strong>{message}
      </p>
    )
  } else {
  // Affichage des messages des autres utilisateurs
    return (
      <p className='not-user-message'>
        <strong>{pseudo} : </strong>{message}
      </p>
    )
  }
}

export default Message
