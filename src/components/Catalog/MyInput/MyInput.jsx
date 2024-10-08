import './MyInput.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function MyInput({ setOpenInput }) {
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState('');

    function onSubmit() {
        sessionStorage.setItem('inputValue', inputValue)
        navigate('/catalog')
    };

    function closeInput() {
        setOpenInput(false)
        sessionStorage.clear()
    }

    return (
        <div className='my-input'>
            <div className='input__input-group'>
                <input className='input__input'
                    placeholder='Поиск по названию или артикулу'
                    type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)} />
                <button className='input__input-button' onClick={() => { setInputValue('') }}></button>
            </div>
            <button className='input__submit' onClick={onSubmit}>Найти</button>
            <button className='input__close' onClick={closeInput}>Закрыть</button>
        </div>
    )
}

export default MyInput