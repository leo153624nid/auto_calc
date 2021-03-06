/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
import React from 'react'
import s from './Carusel.module.css'
import ArrowNext from './ArrowNext/ArrowNext'
import ArrowPrev from './ArrowPrev/ArrowPrev'
import CarBlock from './CarBlock/CarBlock'
import AddCarBtn from '../common/AddCarBtn/AddCarBtn'

function Carusel({ carusel, changeCarusel }) {
    // массив карт машин
    const carBlockList = []

    // функция получает массив машин для карусели и наполняет массив карт 1...3 картами машин
    function caruselInit() {
        if (!carusel) {
            carBlockList.push(
                <div className={s.CarBlock} key="0">
                    <div className={s.noCar}>У вас пока нет машин</div>
                    <AddCarBtn />
                </div>
            )
        } else if (
            carusel[0] &&
            carusel[1] === undefined &&
            carusel[2] === undefined
        ) {
            carBlockList.push(
                <div
                    className={`${s.CarBlock} ${s.activeCarBlock}`}
                    key={carusel[0].carId}
                >
                    <CarBlock carData={carusel[0]} />
                </div>
            )
        } else if (carusel[0] && carusel[1] && carusel[2] === undefined) {
            carBlockList.push(
                <div
                    className={`${s.CarBlock} ${s.activeCarBlock}`}
                    key={carusel[0].carId}
                >
                    <CarBlock carData={carusel[0]} />
                </div>,

                <div className={s.CarBlock} key={carusel[1].carId}>
                    <CarBlock carData={carusel[1]} />
                </div>
            )
        } else if (carusel[0] && carusel[1] && carusel[2]) {
            carBlockList.push(
                <div className={s.CarBlock} key={carusel[0].carId}>
                    <CarBlock carData={carusel[0]} />
                </div>,

                <div
                    className={`${s.CarBlock} ${s.activeCarBlock}`}
                    key={carusel[1].carId}
                >
                    <CarBlock carData={carusel[1]} />
                </div>,

                <div className={s.CarBlock} key={carusel[2].carId}>
                    <CarBlock carData={carusel[2]} />
                </div>
            )
        }
    }

    caruselInit()

    return (
        <div className={s.content}>
            <div
                className={`${s.arrow} ${s.ArrowPrev}`}
                onClick={() => changeCarusel('left')}
            >
                <ArrowPrev />
            </div>

            {carBlockList}

            <div
                className={`${s.arrow} ${s.ArrowNext}`}
                onClick={() => changeCarusel('right')}
            >
                <ArrowNext />
            </div>
        </div>
    )
}

export default Carusel
