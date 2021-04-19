import * as actionTypes from './action';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    items: 0,
    price: 4
}

const INGREDIENT_PRICE = {
    salad: 0.3,
    bacon: 1.0,
    cheese: 0.5,
    meat: 1
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                price: state.price + INGREDIENT_PRICE[action.ingredientName],
                items: state.items + 1
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENT_PRICE[action.ingredientName],
                items: state.items - 1
            }
        default:
            return state;
    }
}

export default reducer;