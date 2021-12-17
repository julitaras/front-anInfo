import { useNavigate } from "react-router";

function withNavigate(WrappedComponent) {
    return props => <WrappedComponent {...props} history={useNavigate()} />;
}

export default withNavigate;