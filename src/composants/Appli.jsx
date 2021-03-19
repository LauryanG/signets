import './Appli.scss';
import Entete from './Entete';
import ListeDossiers from './ListeDossiers';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Accueil from './Accueil';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { firestore, storage } from '../firebase';
import './AjouterDossier';
import AjouterDossier from './AjouterDossier';

export default function Appli() {
  const etatUtilisateur = useState(null);
  const [utilisateur, setUtilisateur] = etatUtilisateur;

  // État des dossiers
  const etatDossiers = useState([]);
  const [dossiers, setDossiers] = etatDossiers;

  // Gestion du formulaire AjoutDossier
  const [ouvert, setOuvert] = useState(false);

  function gererFermer() {
    setOuvert(false);
  }

  function gererAjout(nom, couleur, urlImage) {
    firestore.collection('utilisateurs').doc(utilisateur.uid).collection('dossiers').add({
      nom: nom,
      couleur: couleur,
      image: urlImage,
      date_modif: firebase.firestore.FieldValue.serverTimestamp()
    }).then(
      refDoc => refDoc.get().then(
        doc => setDossiers([...dossiers, {...doc.data(), id: doc.id}])
      )
    ).catch(
      erreur => console.log(erreur.message)
    );
    setOuvert(false);
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
              <ListeDossiers etatUtilisateur={etatUtilisateur} etatDossiers={etatDossiers} />

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

// Ne peut être utilisé qu'avec certaines url d'images (celles qui proviennent de domaine qui servent les bons entêtes HTTP pour CORS)
async function sauvegarderImageDossier(urlImage, nom) {
  const reponse = await fetch(urlImage);
  const reponseImage = await reponse.blob(); // Objet binaire
  const refStorage = await storage.ref('couvertures').child(nom).put(reponseImage);
  return await refStorage.ref.getDownloadURL();
}