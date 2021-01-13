import api from "./oauth"

const getWorkers = () => {
  return api.get("/workers")
}

const createWorkers = (worker) => {
  return api.post("/workers", worker)
}

export default {
  getWorkers,
  createWorkers
};
