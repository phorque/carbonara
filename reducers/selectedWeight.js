export default function (state = null, action) {
    switch (action.type) {
    case "SET_SELECTED_WEIGHT":
      return action.payload;
    case "REMOVE_WEIGHT":
    case "UPDATE_ROUTE":
      return null;
    default:
      return state;
    }
}
