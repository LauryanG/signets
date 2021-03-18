import './Appli.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Accueil from './Accueil';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { firestore } from '../firebase';
import './AjouterDossier';
import AjouterDossier from './AjouterDossier';

export default function Appli() {
  const etatUtilisateur = useState(null);
  const [utilisateur, setUtilisateur] = etatUtilisateur;

  // Gestion du formulaire AjoutDossier
  const [ouvert, setOuvert] = useState(false);

  function gererFermer() {
    setOuvert(false);
  }

  function gererAjout(nom, couleur, urlImage) {
    // Ajouter à Firestore ... 
    // console.log(nom, couleur, urlImage);

    firestore.collection('utilisateurs').doc(utilisateur.uid).collection('dossiers').add(
      {
        nom: nom,
        couleur: couleur,
        image: urlImage,
        date_modif: firebase.firestore.FieldValue.serverTimestamp()
      }
    ).then(
      () => setOuvert(false)
    ).catch(erreur=>console.log(erreur));
  }

  useEffect(
    () => {
      firebase.auth().onAuthStateChanged(
        util => {
          setUtilisateur(util);
          if(util) {
            firestore.collection('utilisateurs').doc(util.uid).set({
                nom: util.displayName,
                courriel: util.email,
                photo: util.photoURL,
                date_creation: firebase.firestore.FieldValue.serverTimestamp()
            }, {merge: true});
          }
        }
      ); 
    }, []
  );

  return (
    <div className="Appli">
      {
        utilisateur ?
          <>
            <Entete etatUtilisateur={etatUtilisateur} />
            <section className="contenu-principal">
              <ListeDossiers etatUtilisateur={etatUtilisateur} />

              <AjouterDossier ouvert={ouvert} gererFermer={gererFermer} gererAjout={gererAjout} />

              <Fab className="ajoutRessource" color="primary" aria-label="Ajouter dossier" onClick={()=>setOuvert(true)}>
                <AddIcon />
              </Fab>
            </section>
          </>
        :
          <Accueil etatUtilisateur={etatUtilisateur} />
      }
    </div>
  );
}
