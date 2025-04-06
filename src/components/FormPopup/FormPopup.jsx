import './FormPopup.css'
import React from 'react'
import { useState } from 'react';
import { BASE_URL } from '../../constants/constants.js'
import { useNavigate } from 'react-router-dom';

function FormPopup({ setOpenForm }) {

    const [recipientName, setRecipientName] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [isSendForm, setIsSendForm] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/order-request/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    recipient_name: recipientName,
                    delivery_address: deliveryAddress,
                    phone_number: phoneNumber,
                }),
            });

            if (!response.ok) {
                if (response.status === 500) {
                    navigate('/error');
                } else {
                    const errorData = await response.json();
                    console.error('Ошибка при отправке данных:', response.status, errorData);
                    setError("Ошибка при отправке данных. Пожалуйста, попробуйте позже.");
                }
                return;
            }

            const resData = await response.json();
            setIsSendForm(true)
            setTimeout(() => {
                setOpenForm(false)
            }, 4000)
            console.log('Успешно отправлено:', resData);
            // Очищаем поля формы после успешной отправки
            setRecipientName('');
            setDeliveryAddress('');
            setPhoneNumber('');
            setError(''); // Сбрасываем сообщение об ошибке
        } catch (error) {
            console.error('Ошибка:', error);
            setError("Произошла ошибка при отправке данных. Пожалуйста, проверьте подключение к сети и попробуйте позже."); // Отображаем ошибку пользователю
        }
    };

    return (
        <section className="catalog-form">
            {!isSendForm ?
                <div className="catalog-form__content">
                    <button className='catalog-form__close' onClick={() => setOpenForm(false)}></button>
                    <h3 className="catalog-form__title">В настоящее время мы&nbsp;отправляем каталог нашим&nbsp;партнёрам и покупателям в бумажном виде.</h3>
                    <h4 className="catalog-form__subtitle"> Укажите адрес доставки, имя получателя и мы отправим его вам.</h4>
                    <form className="catalog-form__form" onSubmit={handleSubmit}>
                        <input className="catalog-form__input" type='text' placeholder="Имя получателя" required value={recipientName}
                            onChange={(e) => setRecipientName(e.target.value)} />
                        <input className="catalog-form__input" type='text' placeholder="Адрес доставки" required value={deliveryAddress}
                            onChange={(e) => setDeliveryAddress(e.target.value)}
                        />
                        <input className="catalog-form__input" type='number' placeholder="Контактный телефон *" value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)} />
                        <p className="catalog-form__caption">* Это поле не обязательно для заполнения, но если вы укажете свой
                            номер — мы свяжемся с вами для подтверждения данных.</p>
                        <button className="catalog-form__button" type='submit'>Отправить</button>
                        {error && <span style={{ color: 'red', paddingBottom: '30px' }}>{error}</span>}
                    </form>
                </div> :
                <div className="catalog-form__content catalog-form__content_open" style={{ opacity: !isSendForm ? '0' : '1' }}>
                    <p className="catalog-form__title catalog-form__send-form">Форма успешно отправлена</p>
                </div>}
        </section>
    )
}

export default FormPopup