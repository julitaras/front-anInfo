import React, {useEffect} from "react";
import HoursTable from "../table/HoursTable"
import HoursService from "../../service/HoursService";
import Header from "../Header";
import {compose} from "redux";
import withParams from "../../hoc/withParams";
import withLocation from "../../hoc/withLocation"
import Breadcrumbs from "../Breadcrumbs";
import moment from "moment";

function HoursPage(props){
    const [date, setDate] = React.useState(new Date());
    const [hours, sethours] = React.useState([])
    useEffect(() => {
        const hoursService = new HoursService();
        hoursService.getHours(102090, moment(date).format("YYYY-MM-DD")).then(response =>
        sethours(response))
    },[date])
    return(
        <div>
            <Header {...props} />
            <Breadcrumbs {...props} />
            <HoursTable hours={hours} setDate={setDate} date={date} sethours={sethours}/>
        </div>)
}
export default compose(withParams,withLocation) (HoursPage);