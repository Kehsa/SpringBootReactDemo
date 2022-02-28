import { Modal } from "bootstrap";
import React from "react";
import {getById} from "../util";

interface PropsModLo { }
interface StateModLo { }
export default class ModalLogin extends React.Component<PropsModLo, StateModLo> {
    private static ml = 'modalogin'

    componentDidMount() {
        new Modal(getById(ModalLogin.ml))
    }

    static showMe() {
        Modal.getInstance(getById(ModalLogin.ml)).show()
    }

    close() {
        Modal.getInstance(getById(ModalLogin.ml)).hide()
    }

    render() {
        return <div id={ModalLogin.ml} className="modal" tabIndex={-1} data-bs-backdrop="static">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Session expired</h5>
                        <button onClick={this.close} type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <p>Время сеанса истекло</p>
                    </div>
                    <div className="modal-footer">
                        <a className="btn btn-primary" href='/login' target='_blank'>Login</a>
                        <button onClick={this.close} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    }
}