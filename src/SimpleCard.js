import {Button, Card} from "react-bootstrap";
import {useState} from "react";
import SimpleCardDetail from "./SimpleCardDetail";

export default ({starship, fetchAll}) => {
    const [open, setOpen] = useState(false)
    //const {deleteShip} = useContext(StarShipContext)


    return (
        <Card key={starship.id} className="Card">
            <Card.Img style={{height: 150, objectFit: 'cover'}} variant="top"
                      src={starship.image}/>
            <Card.Body>
                <Card.Title>{starship.name}</Card.Title>
                <Card.Text style={{minHeight: 50}}>
                    Manufacturer : {starship.manufacturer}
                </Card.Text>
                <div>
                    <Button variant="primary" onClick={() => setOpen(true)}>Details</Button>{' '}
                    <Button variant="danger" onClick={() => {}}> Delete </Button>
                </div>
            </Card.Body>
            <SimpleCardDetail starship={starship} handleClose={() => setOpen(false)} show={open}/>
        </Card>
    )
}