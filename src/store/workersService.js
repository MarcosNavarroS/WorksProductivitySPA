import api from "./oauth"

const getWorkers = () => {
  return api.get("/workers")
}

export default {
  getWorkers
};
