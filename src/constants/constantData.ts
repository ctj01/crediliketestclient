export const identificationTypes = [
    {
        value: 'pasaporte',
        label: 'Pasaporte'
    },
    {
        value: 'cedula',
        label: 'Cédula'
    },
    {
        value: 'CedulaExtranjeria',
        label: 'Cédula de Extranjería'
    }
];
export const gender = [
    {
        value: 'M',
        label: 'Masculino'
    },
    {
        value: 'F',
        label: 'Femenino'
    }
]
export const covidVaccine = [
    {
        value: 'false',
        label: 'No'
    },
    {
        value: 'true',
        label: 'Si'
    }
]
export const SET_USERS = 'SET_USERS';

export interface IUser {
    id: number,
    name: string,
    identificationType: string,
    identificationNumber: string,
    identificationId : number,
    gender: string,
    dateOfBirth: Date,
    salary: number,
    covidVaccine: boolean,
}
export interface IUserReducer {
    users: Array<IUser>
}
export interface IUserState {
    users : IUserReducer
}