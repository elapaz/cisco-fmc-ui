import {combineReducers} from 'redux';
import {authentication} from './reducers/authReducer';
import {audit} from "./reducers/auditReducer";
import {hosts} from "./reducers/hostsReducer";
import {networks} from "./reducers/networksReducer";
import {portobjectgroups} from "./reducers/portobjectgroupsReducer";
import {protocolportobjects} from "./reducers/protocolportobjectsReducer";
import {networkgroups} from "./reducers/networkgroupsReducer";
import {accessrules} from "./reducers/accessrulesReducer";
import {ranges} from "./reducers/rangesReducer";

const rootReducer = combineReducers({
    authentication,
    audit,
    hosts,
    ranges,
    networks,
    accessrules,
    networkgroups,
    portobjectgroups,
    protocolportobjects,
});

export default rootReducer;
