import { useState, useRef, useEffect } from 'react';
import Text from '../../Atoms/Text/Text';
import Icon from '../../Atoms/Icon/Icon';
import Button from 'react-bootstrap/Button';
import Overlay from 'react-bootstrap/Overlay';
import './Tooltip.css';

function Tooltip() {
  const [show, setShow] = useState(false);
  const target = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (target.current && !target.current.contains(event.target)) {
        setShow(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="tooltip-container" >
      <Button ref={target} onClick={() => setShow(!show)}>
        <Icon value='MoreVertIcon' />
      </Button>
      <Overlay target={target.current} show={show} placement="right">
        <div className='tooltip'>
          <Text text="Supprimer" type="small" propriety="red" />
          <Icon value='DeleteIcon' />
        </div>
      </Overlay>
    </div>
  );
}

export default Tooltip;
