import ReactDOM from 'react-dom';

const ModalRef = (props) => {

    const _modal = document.getElementById("modal-root");

    const _ele = <>
        {props.children}
    </>

    return ReactDOM.createPortal(_ele,_modal);

}

export default ModalRef;