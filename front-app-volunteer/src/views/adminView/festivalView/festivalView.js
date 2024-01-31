import React, { useEffect, useState } from 'react';
import { db, auth } from '../../../firebase';

import './festivalView.css';

export default function FestivalView(props) {
  useEffect(() => {
    setErreur('');
  }, []);

  const listPoste = props.listPoste;
  const setListPoste = props.setListPoste;
  const listUser = props.listUser;

  const [erreur, setErreur] = useState('');

  // Utilisez listPoste comme état initial pour inputLines
  const [inputLines, setInputLines] = useState(listPoste);

  let ajd = new Date();

  const create_festival = async () => {
    // ... Votre code de création de festival ici ...
  };

  const [formData, setFormData] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    create_festival();
  };

  const ajouterLigne = () => {
    setInputLines([...inputLines, { id: inputLines.length, data: { intitule: '', capacite: 1, desc: '', referent: '' } }]);
  };

  const supprimerLigne = (index) => {
    const nouvellesLignes = [...inputLines];
    nouvellesLignes.splice(index, 1);
    setInputLines(nouvellesLignes);
  };

  const handleInputChange = (value, index, champ) => {
    const nouvellesLignes = [...inputLines];
    const ligneModifiee = { ...nouvellesLignes[index], data: { ...nouvellesLignes[index].data, [champ]: value } };
    nouvellesLignes[index] = ligneModifiee;
    setInputLines(nouvellesLignes);
  };

  console.log(listUser)

  return (
    <div className='festivalView'>
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <label>Date de début :</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className='row'>
          <label>Date de fin :</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>
        <h3>Postes</h3>
        <div>
          {inputLines.map((ligne, index) => (
            <div className='newposte'>
            <div className='row' key={index}>
              <label> Intitulé du poste : </label>
              <input
                type="text"
                name='intitule'
                value={ligne.data.intitule}
                required
                onChange={(e) => handleInputChange(e.target.value, index, 'intitule')}
              />

                <label> Capacité : </label>
                <input
                type="number"
                name="capacite"
                max={20}
                min={1}
                pattern="\d{1,3}"
                value={ligne.data.capacite}
                required
                onKeyDown={(e) => e.preventDefault()}
                onChange={(e) => handleInputChange(e.target.value, index, 'capacite')}
                />

                <label> Référent : <select type="text" name="referent" value={ligne.data.referent} onChange={(e) => handleInputChange(e.target.value, index, 'referent')}>
                                <option value="">Sélectionner</option>
                                {listUser.map((row) => (
                                    <option key={row.id}  value={row.id}>{row.data.prenom} {row.data.nom}</option>
                                ))}
                            </select></label> 

              

              

              <button onClick={() => supprimerLigne(index)}>-</button>
            </div>
            <div className='row'>
            <label> Description : </label>
            <input
              type="text"
              name='desc'
              value={ligne.data.desc}
              required
              onChange={(e) => handleInputChange(e.target.value, index, 'desc')}
            />
            </div>
            </div>
          ))}

          <button onClick={ajouterLigne}>+</button>
        </div>
        <button type="submit">Soumettre</button>
        <p className='error'>{erreur}</p>
      </form>
    </div>
  );
}
