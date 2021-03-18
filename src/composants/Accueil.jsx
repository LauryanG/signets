import './Accueil.scss';
import firebase from 'firebase/app';
import { widgetFirebaseui } from '../firebase';
import 'firebaseui/dist/firebaseui.css';
import { useState, useEffect } from 'react';

export default function Accueil({etatUtilisateur}) {
  const [utilisateur, setUtilisateur] = etatUtilisateur;

  useEffect(
    () => widgetFirebaseui.start("#connexion-firebaseui", {
      signInOptions: [
        {
          provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
          fullLabel: 'Connexion avec Google'
        }
      ]
    }), [utilisateur]
  );

  return (
    <div className="Accueil">
      <h3 className="logo">Signets <span>beta</span></h3>
      <h2 className="amorce">Organisez vos signets,<br />c'est simple comme bonjour.</h2>
      <h4 className="etiquette">Connexion à Signets</h4>
      <div id="connexion-firebaseui"></div>
    </div>
  );
}