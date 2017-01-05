import {ActionType} from './action-type';

export const setNumber = (number) => {
    return {
        type: ActionType.Set,
        data: number
    };
};

export const nextNumber = () => {
    return {
        type: ActionType.Next
    };
}
