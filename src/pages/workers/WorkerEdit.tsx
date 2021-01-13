import React, {FormEvent} from "react";
import {IWorker} from "./IWorker";
import WorkerFormHandler from "./WorkerFormHandler";

interface IState {
  worker: IWorker,
  submitted: boolean
}

class WorkerEdit extends WorkerFormHandler {
  handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    this.setState((prevState: IState) => ({
      worker: {                   // object that we want to update
        ...prevState.worker,    // keep all other key-value pairs
        workerId: "1"       // update the value of specific key
      },
      submitted: true
    }))
  }
}

export default WorkerEdit
