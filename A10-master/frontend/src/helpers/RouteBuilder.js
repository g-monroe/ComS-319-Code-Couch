export default {
    route: endpoint => `http://${process.env.REACT_APP_EXPRESS_HOST}:${process.env.REACT_APP_EXPRESS_PORT}${endpoint}`
};
