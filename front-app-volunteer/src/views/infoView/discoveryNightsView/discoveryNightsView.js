import React, { useEffect, useState } from "react"
import { collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from '../../../firebase'

import './discoveryNightsView.css';

export default function DiscoveryNightsView(props){

    const [soirees, setSoirees] = useState([]);
    const [isAddingNight, setIsAddingNight] = useState(false);
    const [editSoiree, setEditSoiree] = useState(null);
    const [formData, setFormData] = useState({ intitule: '', date: '', lieu: '', referent: ''});
    const [textBtnAdd, setTextBtnAdd] = useState('Ajouter');

    useEffect(() => {
        const getAllDiscoveryNights = async () => {
            const querySnapshot = await getDocs(collection(db, "discoveryNights"));
            var listSoiree = [];
            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());
                listSoiree.push({id: doc.id, data: doc.data()})
            });
            setSoirees(listSoiree);
        }
        getAllDiscoveryNights();
    }, [])

    const addDiscoveryNight = async () => {
        if (textBtnAdd === 'Ajouter') {
            setIsAddingNight(true);
            setTextBtnAdd('Annuler');
        }
        else {
            setIsAddingNight(false);
            setTextBtnAdd('Ajouter');
        }
        setEditSoiree(null);
        setFormData({
            intitule: '',
            date: '',
            lieu: '',
            referent: ''
        });
    };

    const editDiscoveryNight = (soiree) => {
        setIsAddingNight(false);
        setEditSoiree(soiree);
        setFormData({
            intitule: soiree.data.intitule,
            date: soiree.data.date,
            lieu: soiree.data.lieu,
            referent: soiree.data.referent
        });
    };

    const handleSubmitForm = async (e, soireeId) => {
        e.preventDefault();
        // console.log("formData : ",formData);
        // console.log("soirees : ",soirees);
        try {
            if (soireeId !== null) {
                await updateDoc(doc(db, "discoveryNights", soireeId), formData);
                setSoirees(prevSoirees =>
                    prevSoirees.map(soiree =>
                        soiree.id === soireeId ? { id: soiree.id, data: formData } : soiree
                    )
                );
            } else {
                // Vous êtes en train d'ajouter une nouvelle soirée
                const docRef = await addDoc(collection(db, "discoveryNights"), formData);
                setSoirees(prevSoirees => [...prevSoirees, { id: docRef.id, data: formData }]);
                setTextBtnAdd('Ajouter');
            }
        }
        catch (error) {
            console.error('Error adding discovery night:', error);
        }
        setIsAddingNight(false);
        setEditSoiree(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const deleteDiscoveryNight = async (soireeId) => {
        try {
            await deleteDoc(doc(db, "discoveryNights", soireeId));
            setSoirees(prevSoirees => prevSoirees.filter(soiree => soiree.id !== soireeId));
        } 
        catch (error) {
            console.error('Error deleting discovery night:', error);
        }
    };

    
    return (
        <div className="discoveryNightsView">
            {props.actualUser.data().role !== 'benevole' && (            
                <div className="btnAdd btn">
                    <button type="button" onClick={addDiscoveryNight}>{textBtnAdd}</button>
                </div>
            )}
            <div className="box">
                {soirees.length !== 0 ? (
                    soirees.map((soiree, index) => (
                        <div className="soiree" key={index}>
                            {editSoiree && editSoiree.id === soiree.id ? (
                                <div className="nightForm">
                                    <form onSubmit={(e) => handleSubmitForm(e, soiree.id)}>
                                        <div className="form-group">
                                            <label>Intitulé :</label> 
                                            <input type="text" required name="intitule" maxLength='45' value={formData.intitule} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Date :</label>
                                            <input type="date" required name="date" value={formData.date} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Lieu :</label>
                                            <input type="text" required name="lieu" maxLength='45' value={formData.lieu} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label>Référent :</label>
                                            <select name="referent" value={formData.referent} onChange={handleInputChange}>
                                                {props.users.map((user) => (
                                                    <option key={user.id} value={user.data.nom}>
                                                        {user.data.nom}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <button className='otherBtn' type="submit">Modifier</button>
                                    </form>
                                </div>
                            ) : (
                                <div className="data">
                                    <p>Intitulé : {soiree.data.intitule}</p>
                                    <p>Date : {soiree.data.date}</p>
                                    <p>Lieu : {soiree.data.lieu}</p>
                                    <p>Réferent : {soiree.data.referent}</p>
                                    <div className="btnModify btn">
                                        <button onClick={() => editDiscoveryNight(soiree)}>Modifier</button>
                                        <button onClick={() => deleteDiscoveryNight(soiree.id)}>Supprimer</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ):( 
                    <div>
                        <p>Aucune soirée disponible</p>
                    </div>
                )}
                {isAddingNight === true && (
                    <div className="soiree">
                        <div className="nightForm">
                            <form onSubmit={(e) => handleSubmitForm(e, null)}>
                                <div className="form-group">
                                    <label>Intitulé :</label> 
                                    <input type="text" required name="intitule" maxLength='45' value={formData.intitule} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Date :</label>
                                    <input type="date" required name="date" value={formData.date} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Lieu :</label>
                                    <input type="text" required name="lieu" maxLength='45' value={formData.lieu} onChange={handleInputChange} />
                                </div>
                                <div className="form-group">
                                    <label>Référent :</label>
                                    <select name="referent" value={formData.referent} onChange={handleInputChange}>
                                        {props.users.map((user) => (
                                            <option key={user.id} value={user.data.nom}>
                                                {user.data.nom}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <button className='otherBtn' type="submit">Ajouter</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
