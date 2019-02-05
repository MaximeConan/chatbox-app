import React, { Component, createRef } from 'react'
import './App.css'
import './animation.css'

// Components persos
import Formulaire from './components/Formulaire'
import Message from './components/Message'

// Firebase
import base from './base.js'

// Animations
import { CSSTransition, TransitionGroup } from 'react-transition-group'

class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo
  }

  messagesRef = createRef()

  // On synchronise la BDD au montage de notre app
  componentDidMount () {
    // 1er param : racine de ma BDD, 2ème param : options
    base.syncState('/', {
      context: this,
      state: 'messages'
    })
  }

  // Lorsque le state est mis à jour (ajout d'un message), on adapte le scroll
  componentDidUpdate () {
    const ref = this.messagesRef.current
    ref.scrollTop = ref.scrollHeight
  }

  addMessage = message => {
    const messages = { ...this.state.messages }
    messages[`message-${Date.now()}`] = message
    // On boucle sur notre objet messages pour n'avoir que 10 messages dans notre chat
    Object
      .keys(messages)
      .slice(0, -10)
      .forEach(key => {
        messages[key] = null
      })

    this.setState({ messages })
  }

  // On vérifie si notre utilisateur connecté est celui qui envoi le form
  isUser = pseudo => pseudo === this.state.pseudo

  render () {
    const messages = Object
      .keys(this.state.messages)
      .map(key => (
        <CSSTransition
          timeout={500}
          classNames='fade'
          key={key}>
          <Message
            isUser={this.isUser}
            pseudo={this.state.messages[key].pseudo}
            message={this.state.messages[key].message}
          />
        </CSSTransition>
      ))

    return (
      <div className='box'>
        <div>
          <div className='messages' ref={this.messagesRef}>
            <TransitionGroup className='message'>
              { messages }
            </TransitionGroup>
          </div>
          <Formulaire
            length={140}
            pseudo={this.state.pseudo}
            addMessage={this.addMessage}
          />
        </div>
      </div>
    )
  }
}

export default App
