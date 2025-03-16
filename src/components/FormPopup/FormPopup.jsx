import './FormPopup.css'
import { useState } from 'react';

function FormPopup({setOpenForm}) {

    const [recipientName, setRecipientName] = useState('');
    const [deliveryAddress, setDeliveryAddress] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    function handleSubmit(e) {
        e.preventDefault()
        console.log(recipientName, deliveryAddress, phoneNumber)
        setOpenForm(false)
    }

    return (
        <section className="catalog-form">
            <div className="catalog-form__content">
                <button className='catalog-form__close' onClick={()=>setOpenForm(false)}></button>
                <h3 className="catalog-form__title">В настоящее время мы отправляем каталог нашим&nbsp;партнёрам и покупателям в бумажном виде.</h3>
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
                </form>
            </div>
        </section>
    )
}

export default FormPopup