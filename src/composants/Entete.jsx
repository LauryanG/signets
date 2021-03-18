import './Entete.scss';
import Avatar from '@material-ui/core/Avatar'; 
import Button from '@material-ui/core/Button';
import firebase from 'firebase/app';

export default function Entete({etatUtilisateur}) {
  const [utilisateur, setUtilisateur] = etatUtilisateur;

  function gererDeconnexion() {
    firebase.auth().signOut();
  }

  return (
    <header className="Entete">
      <div className="logo">
        Signets
        <Button 
          className="btn-deconnexion"
          variant="outlined"
          size="small"
          onClick={gererDeconnexion}>
          Déconnexion
        </Button>
      </div>
      <div className="utilisateur">{utilisateur.displayName} <Avatar className="avatar" alt={utilisateur.displayName} src={utilisateur.photoURL} /></div>
    </header>
  );
}