export const arrayToObject = (array) =>
    array.reduce((obj, item) => {
        obj[item.id] = item
        return obj
    }, {});

export const arrayToObjectIds = (array) => {
    return array.map((obj) => obj.id);
};

export default class RuleExpander {

    constructor({accessrules, accessRulesById, hostsById, networksById, networkgroupsById, portobjectgroupsById, protocolportobjectsById, rangesById}) {
        this.accessRules = accessrules.map((id) => accessRulesById[id]);
        this.accessRulesById = accessRulesById;
        this.hostsById = hostsById;
        this.rangesById = rangesById;
        this.networksById = networksById;
        this.networkgroupsById = networkgroupsById;
        this.portobjectgroupsById = portobjectgroupsById;
        this.protocolportobjectById = protocolportobjectsById;
    }


    getTypeInstanceById = (type, id) => {
        switch (type) {
            case 'Host':
                return this.hostsById[id];
            case 'Network':
                return this.networksById[id];
            case 'Range':
                return this.rangesById[id];
            case 'PortObjectGroup':
                return this.portobjectgroupsById[id];
            case 'ProtocolPortObject':
                return this.protocolportobjectById[id];
            case 'NetworkGroup':
                return this.networkgroupsById[id];
            default:
                return null;
        }
    }

    expandNetworkObjects = (objects) => {
        return objects.map(({id, type, ...other}) => {
            if (type === 'NetworkGroup') {
                let expandedObj = this.getTypeInstanceById(type, id) || ({id, type, ...other});
                if (expandedObj.objects) {
                    expandedObj.objects = this.expandNetworkObjects(expandedObj.objects);
                }
                return expandedObj;
            }
            return this.getTypeInstanceById(type, id) || ({id, type, ...other});
        })
    }

    expandPortObjects = (objects) => {
        return objects.map(({id, type, ...other}) => {
            if (type === 'PortObjectGroup') {
                let expandedObj = this.getTypeInstanceById(type, id) || ({id, type, ...other});
                if (expandedObj.objects) {
                    expandedObj.objects = this.expandPortObjects(expandedObj.objects);
                }
                return expandedObj;
            }
            return this.getTypeInstanceById(type, id) || ({id, type, ...other});
        })
    }

    expandNetworks = ({objects, literals, ...other}) => {
        let {newObjects, newLiterals} = {objects, literals};
        if (objects) {
            newObjects = this.expandNetworkObjects(objects);
        }
        if (literals) {
            newLiterals = literals.map(({id, type, ...other}) => this.getTypeInstanceById(type, id) || ({
                id,
                type, ...other
            }));
        }
        return {...other, objects: newObjects, literals: newLiterals};

    }

    expandPorts = ({objects, literals, ...other}) => {
        let {newObjects, newLiterals} = {objects, literals};
        if (objects) {
            newObjects = this.expandPortObjects(objects);
        }
        if (literals) {
            newLiterals = literals.map(({id, type, ...other}) => this.getTypeInstanceById(type, id) || ({
                id,
                type, ...other
            }));
        }
        return {...other, objects: newObjects, literals: newLiterals};

    }

    expandAccessRule = ({sourceNetworks, destinationNetworks, sourcePorts, destinationPorts, ...data}) => {
        let retAccessRule = {sourceNetworks, destinationNetworks, sourcePorts, destinationPorts, ...data};
        if (sourceNetworks) {
            retAccessRule = {...retAccessRule, sourceNetworks: this.expandNetworks({...sourceNetworks})};
        }
        if (destinationNetworks) {
            retAccessRule = {...retAccessRule, destinationNetworks: this.expandNetworks({...destinationNetworks})};
        }
        if (sourcePorts) {
            retAccessRule = {...retAccessRule, sourcePorts: this.expandPorts({...sourcePorts})};
        }
        if (destinationPorts) {
            retAccessRule = {...retAccessRule, destinationPorts: this.expandPorts({...destinationPorts})};
        }
        return retAccessRule;

    }


    getExpandedAccessRules = () => {
        return this.accessRules.map((rule) => this.expandAccessRule(rule))
    }

}