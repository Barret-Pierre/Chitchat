const State = ({ value }) => {

    const isActif = value ? 'Actif' : 'Inactif'
        
    return (
        <p className="state">{isActif}</p>
    );
};

export default State;