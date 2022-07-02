import { createReducer } from '@reduxjs/toolkit'
import { setUser } from './authReducer'
import { userDataAPI } from '../api/api'
// import userData from '../database/CurrentUser.json'

const initialState = null

const SET_USER_DATA = 'SET_USER_DATA'
const INIT_FUEL_ARRAY = 'INIT_FUEL_ARRAY'
const INIT_ETC_ARRAY = 'INIT_ETC_ARRAY'
const CHANGE_CARUSEL = 'CHANGE_CARUSEL'
const ADD_USER_CAR = 'ADD_USER_CAR'
const ADD_FUEL_CAR = 'ADD_FUEL_CAR'
const ADD_ETC_CAR = 'ADD_ETC_CAR'
const DELETE_YOUR_CAR = 'DELETE_YOUR_CAR'
const DELETE_YOUR_FUEL = 'DELETE_YOUR_FUEL'
const DELETE_YOUR_ETC = 'DELETE_YOUR_ETC'
const SET_CAR_DATA = 'SET_CAR_DATA'

const userDataReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(SET_USER_DATA, (state, action) => ({
            ...action.userData,
            carusel: [
                action.userData.userCars[0],
                action.userData.userCars[1],
                action.userData.userCars[2],
            ],
        }))
        .addCase(INIT_FUEL_ARRAY, (state, action) => {
            // Весь массив id машин пользователя
            const carsIds = state.userCars.map((item) => item.carId)
            const caruselCarsIds = state.carusel.map((item) => item.carId)

            const goodIndex = carsIds.indexOf(action.carId)
            const caruselGoodIndex = caruselCarsIds.indexOf(action.carId)

            if (goodIndex !== -1) {
                const newCar = { ...state.userCars[goodIndex], fuelings: [] }
                state.userCars.splice(goodIndex, 1, newCar)
            }
            if (caruselGoodIndex !== -1) {
                const newCar = {
                    ...state.carusel[caruselGoodIndex],
                    fuelings: [],
                }
                state.carusel.splice(caruselGoodIndex, 1, newCar)
            }
        })
        .addCase(INIT_ETC_ARRAY, (state, action) => {
            // Весь массив id машин пользователя
            const carsIds = state.userCars.map((item) => item.carId)
            const caruselCarsIds = state.carusel.map((item) => item.carId)

            const goodIndex = carsIds.indexOf(action.carId)
            const caruselGoodIndex = caruselCarsIds.indexOf(action.carId)

            if (goodIndex !== -1) {
                const newCar = { ...state.userCars[goodIndex], etc: [] }
                state.userCars.splice(goodIndex, 1, newCar)
            }
            if (caruselGoodIndex !== -1) {
                const newCar = {
                    ...state.carusel[caruselGoodIndex],
                    etc: [],
                }
                state.carusel.splice(caruselGoodIndex, 1, newCar)
            }
        })
        .addCase(CHANGE_CARUSEL, (state, action) => {
            // Весь массив машин пользователя
            const cars = state.userCars

            // Номер Id машины для последней карты в карусели машин
            const lastCarId = cars.findIndex(
                (item) => item.carId === state.carusel.at(-1).carId
            )
            // Номер Id машины для первой карты в карусели машин
            const firstCarId = cars.findIndex(
                (item) => item.carId === state.carusel[0].carId
            )

            switch (action.direction) {
                case 'left':
                    state.carusel.shift()
                    if (lastCarId !== cars.length - 1) {
                        state.carusel.push(cars[lastCarId + 1])
                    } else {
                        state.carusel.push(cars[0])
                    }
                    break
                case 'right':
                    state.carusel.pop()
                    if (firstCarId !== 0) {
                        state.carusel.unshift(cars[firstCarId - 1])
                    } else {
                        state.carusel.unshift(cars.at(-1))
                    }
                    break
                default:
                    break
            }
        })
        .addCase(ADD_USER_CAR, (state, action) => {
            // Весь массив id машин пользователя
            const carsIds = state.userCars.map((item) => item.carId)
            const caruselCarsIds = state.carusel.map((item) => item.carId)

            const goodIndex = carsIds.indexOf(action.car.carId)
            const caruselGoodIndex = caruselCarsIds.indexOf(action.car.carId)

            if (goodIndex !== -1) {
                state.userCars.splice(goodIndex, 1, action.car)
            } else {
                state.userCars.push(action.car)
            }
            if (caruselGoodIndex !== -1) {
                state.carusel.splice(caruselGoodIndex, 1, action.car)
            } else if (caruselCarsIds.length < 3) {
                state.carusel.push(action.car)
            }
        })
        .addCase(DELETE_YOUR_CAR, (state, action) => {
            // Весь массив id машин пользователя
            const carsIds = state.userCars.map((item) => item.carId)

            const goodIndex = carsIds.indexOf(action.carId)

            if (goodIndex !== -1) {
                state.userCars.splice(goodIndex, 1)
            }

            state.carusel.splice(0, state.carusel.length)
            state.carusel.push(...state.userCars)
            if (carsIds.length > 3) {
                state.carusel.splice(3, state.carusel.length)
            }
        })
        .addCase(ADD_FUEL_CAR, (state, action) => {
            // Весь массив id машин пользователя
            const carsIds = state.userCars.map((item) => item.carId)
            const caruselCarsIds = state.carusel.map((item) => item.carId)

            const goodIndexCar = carsIds.indexOf(action.fuel.carId)
            const caruselGoodIndexCar = caruselCarsIds.indexOf(
                action.fuel.carId
            )

            const goodIndexFuel = state.userCars[goodIndexCar].fuelings
                .map((item) => item.fuelingId)
                .indexOf(action.fuel.fuelingId)
            const caruselGoodIndexFuel = state.carusel[
                caruselGoodIndexCar
            ].fuelings
                .map((item) => item.fuelingId)
                .indexOf(action.fuel.fuelingId)

            if (goodIndexFuel !== -1) {
                state.userCars[goodIndexCar].fuelings.splice(
                    goodIndexFuel,
                    1,
                    action.fuel
                )
            } else {
                state.userCars[goodIndexCar].fuelings.push(action.fuel)
            }
            if (caruselGoodIndexFuel !== -1) {
                state.carusel[caruselGoodIndexCar].fuelings.splice(
                    caruselGoodIndexFuel,
                    1,
                    action.fuel
                )
            } else {
                state.carusel[caruselGoodIndexCar].fuelings.push(action.fuel)
            }
        })
        .addCase(DELETE_YOUR_FUEL, (state, action) => {
            // Весь массив id машин пользователя
            const carsIds = state.userCars.map((item) => item.carId)
            const caruselCarsIds = state.carusel.map((item) => item.carId)

            const goodIndexCar = carsIds.indexOf(action.carId)
            const caruselGoodIndexCar = caruselCarsIds.indexOf(action.carId)

            const goodIndexFuel = state.userCars[goodIndexCar].fuelings
                .map((item) => item.fuelingId)
                .indexOf(action.fuelingId)
            const caruselGoodIndexFuel = state.carusel[
                caruselGoodIndexCar
            ].fuelings
                .map((item) => item.fuelingId)
                .indexOf(action.fuelingId)

            if (goodIndexFuel !== -1) {
                state.userCars[goodIndexCar].fuelings.splice(goodIndexFuel, 1)
            }

            if (caruselGoodIndexFuel !== -1) {
                state.carusel[caruselGoodIndexCar].fuelings.splice(
                    caruselGoodIndexFuel,
                    1
                )
            }
        })
        .addCase(ADD_ETC_CAR, (state, action) => {
            // Весь массив id машин пользователя
            const carsIds = state.userCars.map((item) => item.carId)
            const caruselCarsIds = state.carusel.map((item) => item.carId)

            const goodIndexCar = carsIds.indexOf(action.etc.carId)
            const caruselGoodIndexCar = caruselCarsIds.indexOf(action.etc.carId)

            const goodIndexFuel = state.userCars[goodIndexCar].etc
                .map((item) => item.etcId)
                .indexOf(action.etc.etcId)
            const caruselGoodIndexFuel = state.carusel[caruselGoodIndexCar].etc
                .map((item) => item.etcId)
                .indexOf(action.etc.etcId)

            if (goodIndexFuel !== -1) {
                state.userCars[goodIndexCar].etc.splice(
                    goodIndexFuel,
                    1,
                    action.etc
                )
            } else {
                state.userCars[goodIndexCar].etc.push(action.etc)
            }
            if (caruselGoodIndexFuel !== -1) {
                state.carusel[caruselGoodIndexCar].etc.splice(
                    caruselGoodIndexFuel,
                    1,
                    action.etc
                )
            } else {
                state.carusel[caruselGoodIndexCar].etc.push(action.etc)
            }
        })
        .addCase(DELETE_YOUR_ETC, (state, action) => {
            // Весь массив id машин пользователя
            const carsIds = state.userCars.map((item) => item.carId)
            const caruselCarsIds = state.carusel.map((item) => item.carId)

            const goodIndexCar = carsIds.indexOf(action.carId)
            const caruselGoodIndexCar = caruselCarsIds.indexOf(action.carId)

            const goodIndexFuel = state.userCars[goodIndexCar].etc
                .map((item) => item.etcId)
                .indexOf(action.etcId)
            const caruselGoodIndexFuel = state.carusel[caruselGoodIndexCar].etc
                .map((item) => item.etcId)
                .indexOf(action.etcId)

            if (goodIndexFuel !== -1) {
                state.userCars[goodIndexCar].etc.splice(goodIndexFuel, 1)
            }
            if (caruselGoodIndexFuel !== -1) {
                state.carusel[caruselGoodIndexCar].etc.splice(
                    caruselGoodIndexFuel,
                    1
                )
            }
        })
        .addCase(SET_CAR_DATA, (state, action) => {
            // Весь массив id машин пользователя
            const carsIds = state.userCars.map((item) => item.carId)
            const caruselCarsIds = state.carusel.map((item) => item.carId)

            const goodIndex = carsIds.indexOf(action.car.carId)
            const caruselGoodIndex = caruselCarsIds.indexOf(action.car.carId)

            if (goodIndex !== -1) {
                state.userCars.splice(goodIndex, 1, action.car)
            }
            if (caruselGoodIndex !== -1) {
                state.carusel.splice(caruselGoodIndex, 1, action.car)
            }
        })
        .addDefaultCase((state) => state)
})

// ActionCreators
// Установка данных пользователя
export const setUserData = (userData) => ({
    type: SET_USER_DATA,
    userData,
})

// Инициализация пустых массивов FUELINGS, которые не приходят с firebase
export const initFuelArray = (carId) => ({
    type: INIT_FUEL_ARRAY,
    carId,
})

// Инициализация пустых массивов ETC, которые не приходят с firebase
export const initEtcArray = (carId) => ({
    type: INIT_ETC_ARRAY,
    carId,
})

// Вращение карусели карт машин влево или вправо
export const changeCarusel = (direction) => ({
    type: CHANGE_CARUSEL,
    direction,
})

// Добавление или редактирование машины
export const addUserCar = (car) => ({
    type: ADD_USER_CAR,
    car,
})

// Удаление машины
export const delUserCar = (carId) => ({
    type: DELETE_YOUR_CAR,
    carId,
})

// Добавление или редактирование заправки машины
export const addFuelCar = (fuel) => ({
    type: ADD_FUEL_CAR,
    fuel,
})

// Удаление заправки машины
export const delFuelCar = (carId, fuelingId) => ({
    type: DELETE_YOUR_FUEL,
    carId,
    fuelingId,
})

// Добавление или редактирование прочих расходов машины
export const addEtcCar = (etc) => ({
    type: ADD_ETC_CAR,
    etc,
})

// Удаление прочих расходов машины
export const delEtcCar = (carId, etcId) => ({
    type: DELETE_YOUR_ETC,
    carId,
    etcId,
})

// Устанвока пересчитанных значений расходов машины
export const setCarData = (car) => ({
    type: SET_CAR_DATA,
    car,
})

// Thunks
// Получение данных пользователя
export const getUserDataThunkCreator = (userId) => (dispatch) => {
    userDataAPI.getUserData(userId).then((data) => {
        dispatch(setUserData(data))
        dispatch(setUser(data.userId, data.login, data.email, data.userName))
    })
}

// Добавление или редактирование машины
export const patchUserCarThunkCreator = (userId, car, index) => (dispatch) => {
    userDataAPI.patchUserCar(userId, car, index).then((response) => {
        if (response.statusText === 'OK') {
            dispatch(addUserCar(car))
        }
    })
}

// Удаление машины
export const deleteUserCarThunkCreator =
    (userId, index, carId) => (dispatch) => {
        userDataAPI.deleteUserCar(userId, index).then((response) => {
            if (response.statusText === 'OK') {
                dispatch(delUserCar(carId))
            }
        })
    }

// Добавление или редактирование заправки
export const patchUserFuelThunkCreator =
    (userId, fuel, carIndex, fuelIndex) => (dispatch) => {
        userDataAPI
            .patchUserFuel(userId, fuel, carIndex, fuelIndex)
            .then((response) => {
                if (response.statusText === 'OK') {
                    dispatch(addFuelCar(fuel))
                }
            })
    }

// Удаление заправки
export const deleteUserFuelThunkCreator =
    (userId, carIndex, fuelIndex, carId, fuelingId) => (dispatch) => {
        userDataAPI
            .deleteUserFuel(userId, carIndex, fuelIndex)
            .then((response) => {
                if (response.statusText === 'OK') {
                    dispatch(delFuelCar(carId, fuelingId))
                }
            })
    }

// Добавление или редактирование прочих расходов
export const patchUserEtcThunkCreator =
    (userId, etc, carIndex, etcIndex) => (dispatch) => {
        userDataAPI
            .patchUserEtc(userId, etc, carIndex, etcIndex)
            .then((response) => {
                if (response.statusText === 'OK') {
                    dispatch(addEtcCar(etc))
                }
            })
    }

// Удаление прочих расходов
export const deleteUserEtcThunkCreator =
    (userId, carIndex, etcIndex, carId, etcId) => (dispatch) => {
        userDataAPI
            .deleteUserEtc(userId, carIndex, etcIndex)
            .then((response) => {
                if (response.statusText === 'OK') {
                    dispatch(delEtcCar(carId, etcId))
                }
            })
    }

export default userDataReducer
