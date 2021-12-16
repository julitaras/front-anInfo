import { useLocation } from "react-router";

function withLocation(WrappedComponent) {
    return props => <WrappedComponent {...props} location={useLocation()} />;
}

export default withLocation;
