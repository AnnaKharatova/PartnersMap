import './NothingFound.css'
import React from 'react' 

function NothingFound({ handleDisableRadios }) {
    return (
        <div className='empty'>
            <h4 className='empty__title'>Ничего не нашлось</h4>
            <p className='empty__subtitle'>Попробуйте изменить или очистить фильтры</p>
            <button className='empty__button' onClick={handleDisableRadios}>Очистить фильтры</button>
        </div>
    )
}

export default NothingFound