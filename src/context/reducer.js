const initialState = {
    filmCategories: [],
    tvCategories: [],
    message: '',
    movieCategory: '',
    movieCategoryName: '',
    tvCategory: '',
    tvCategoryName: '',
    favoriteRefresh: [],
    language: "",
    country: ""
}

export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_FILM_CATEGORIES":
            return { ...state, filmCategories: action.payload }

        case "GET_TV_CATEGORIES":
            return { ...state, tvCategories: action.payload }

        case "CATEGORIES_ERROR":
            return { ...state, message: action.payload }

        case "movie_CATEGORY_SELECT":
            return {
                ...state,
                movieCategoryName: action.payload.name, movieCategory: action.payload.id
            }

        case "tv_CATEGORY_SELECT":
            return {
                ...state,
                tvCategoryName: action.payload.name, tvCategory: action.payload.id
            }

        case "FAVORITE_REFRESH":
            return {
                ...state,
                favoriteRefresh: action.payload
            }

        case "COUNTRY_SET":
            return {
                ...state,
                country: action.payload
            }

        case "LANGUAGE_SET":
            return {
                ...state,
                language: action.payload
            }

        default:
            return state;
    }
};

