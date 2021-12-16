import { useParams } from "react-router";

function withParams(WrappedComponent) {
    return props => <WrappedComponent {...props} params={useParams()} />;
}

export default withParams;
