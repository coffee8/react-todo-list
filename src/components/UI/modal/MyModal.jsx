import React from 'react';
import style from './MyModal.module.css';

const MyModal = ({children, visible, setVisible}) => {

    const rootClass = [style.myModal];

    if (visible) {
        rootClass.push(style.active);
    }

    return (
        <div className={rootClass.join(' ')} onClick={() => setVisible(false)}>
            <div className={style.myModalContent} onClick={event => event.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default MyModal;