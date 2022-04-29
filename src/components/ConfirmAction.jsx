import React from 'react'
import '../styles/Confirm.scss';
import Button from './UI/button/Button';


const ConfirmAction = ({action, text}) => {
    const chooseAction = (choice) => {
        action(choice);
	}

    return (
        <div className='confirm'>
            <p>{text}</p>

            <div className="actions">
                <Button mode='fill' onClick={() => chooseAction(true)}>Да</Button>
                <Button mode='outline' onClick={() => chooseAction(false)}>Отмена</Button>
            </div>
        </div>
	);
}

export default ConfirmAction;
