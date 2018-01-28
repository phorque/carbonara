export function addWeight(payload) {
  return { type: "ADD_WEIGHT", payload };
}

export function removeWeight(payload) {
  return { type: "REMOVE_WEIGHT", payload };
}

export function setSelectedWeight(payload) {
  return { type: "SET_SELECTED_WEIGHT", payload };
}
