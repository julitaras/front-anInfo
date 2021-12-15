import React, {Component} from "react"
import withParams from "../../hocs/withParams";

class TicketPage extends Component {

    constructor(props) {
        super(props);
        console.log(props);
        console.log(props.params.id);
    }

    render() {
        return (
            <div>
                Hola ticket
            </div>
        );
    }
}

export default withParams(TicketPage);
