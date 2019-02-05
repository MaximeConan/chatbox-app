import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyA8xPVXth4SQZYYPcu6NvxhJB0tjhWgWoc',
  authDomain: 'chatbox-app-27912.firebaseapp.com',
  databaseURL: 'https://chatbox-app-27912.firebaseio.com'
})

const base = Rebase.createClass(firebase.database())

export { firebaseApp }

export default base
