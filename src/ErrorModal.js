import {Modal} from 'react-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import {discardError} from './store/actions'

export default () => {
    const {error, message} = useSelector(state => ({error: state.error.error, message: state.error.message}))
    const dispatch = useDispatch()

    const dismiss = () => dispatch(discardError())

    return(
        <>
            <Modal centered show={error} onHide={dismiss}>
                <Modal.Header closeButton>
                    <Modal.Title> There's an error!!</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{display:'flex', justifyContent:'center', alignItems: 'center', flexDirection: 'column'}}>
                    <p><b>{message}</b> </p>
                </Modal.Body>
            </Modal>
        </>
    )
}
