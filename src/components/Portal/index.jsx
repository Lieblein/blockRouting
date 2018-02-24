import { createPortal } from 'react-dom';

export default (props) => {
    const node = document.getElementById('react-portal');
    return createPortal(props.children, node);
};
