import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useState } from 'react';
import { TwitterPicker } from 'react-color';

export default function AjouterDossier({ouvert, gererFermer, gererAjout}) {
  const [nom, setNom] = useState('');
  const [couleur, setCouleur] = useState('#900');
  const [urlImage, setUrlImage] = useState('');

  return (
    <div className="AjouterDossier">
      <Dialog open={ouvert} onClose={gererFermer} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Ajouter un dossier</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="nomNouveauDossier"
            label="Nom du dossier"
            type="text"
            fullWidth
            onChange={e => setNom(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="urlCouverture"
            label="Adresse image de couverture"
            type="text"
            fullWidth
            onChange={e => setUrlImage(e.target.value)}
          />
          <TwitterPicker triangle="hide" width="100%" onChangeComplete={(couleur) => setCouleur(couleur.hex)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={gererFermer} color="primary">
            Annuler
          </Button>
          <Button onClick={() => nom !== '' && gererAjout(nom, couleur, urlImage)} color="primary">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
