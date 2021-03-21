import './Dossier.scss'; 
import { IconButton } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import MoreVertIcon from '@material-ui/icons/MoreVert';

export default function Dossier({id, nom, couleur, date_modif, image}) {
  const dateFormatee = formaterDate(date_modif);
  return (
    <article className="Dossier" style={{backgroundColor: couleur || '#900'}}>
      <div className="couverture">
        <IconButton className="deplacer" aria-label="déplacer" disableRipple={true}>
          <SortIcon />
        </IconButton>
        <img src={image} alt={nom}/>
      </div>
      <div className="info">
        <h2>{nom || 'Dossier sans nom'}</h2>
        <p>Modifié : {dateFormatee}</p>
      </div>
      <IconButton className="modifier" aria-label="modifier" size="small">
        <MoreVertIcon />
      </IconButton>
    </article>
  );
}

/**
 * Formate les dates Firestore en chaîne de caractères
 * @param {Object} d Objet date spécial à Firestore
 * @returns String une chaîne représentant la date en français
 */
function formaterDate(d) {
  const nomsMois = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'jullet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const dateJs = (d) ? new Date(d.seconds * 1000) : new Date();
  const mois = dateJs.getMonth(); // 0 (jan) à 11 (déc)
  return `${dateJs.getDate()} ${nomsMois[mois]} ${dateJs.getFullYear()}`;
}