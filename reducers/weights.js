
export default function (state = [], action) {
    switch (action.type) {
    case "ADD_WEIGHT":
      return ([ ...state, { uuid: new Date().getTime().toString(), date: new Date(), ...action.payload } ]);
    case "REMOVE_WEIGHT":
      return (
        state.reduce((newState, weight) => {
          if (weight.uuid != action.payload) {
            newState.push(weight);
          }
          return (newState);
        }, [])
      );
    default:
      return state;
    }
}
