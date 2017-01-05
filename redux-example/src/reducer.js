import {ActionType} from './action-type';

var initialState = {
    number: 'Two'
};

const REDUX_INTERNAL_INIT = "@@redux/INIT";
const ignore = () => {};

export default function(state = initialState, action) {
    let newState = state;

    switch (action.type) {
        case ActionType.Set:
            newState = {
                ...state,
                number: action.data
            };
            break;
        case ActionType.Next:
            let nextNumber = undefined;
            switch (state.number) {
                case 'One': nextNumber = 'Two'; break;
                case 'Two': nextNumber = 'Three'; break;
                case 'Three': nextNumber = 'One'; break;
                default: nextNumber = 'One'; break;
            }
            newState = {
                ...state,
                number: nextNumber
            };
            break;
        case REDUX_INTERNAL_INIT:
            ignore();
            break;
        default:
            console.warn("Unknown action in reducer: ", action);
            break;
    }

    return newState;
}
