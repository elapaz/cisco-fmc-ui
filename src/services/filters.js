import isIp from 'is-ip';
import isCidr from 'is-cidr';
import {ip4ToInt, isIp4InCidr} from "./ip";

export const matchByName = (rule, match) => {
    return rule.name && (rule.name.toLowerCase().search(match) !== -1);
}

export const matchIPMask = (ipmask, match) => {
    if (isIp(match) && isCidr(ipmask) && isIp4InCidr(match)(ipmask)) {
        return true;
    }
    return false;
}

export const matchIPRange = (range, match) => {
    let range_chunks = range.split('-');
    if (isIp(match) && (range_chunks.length > 1) && isIp(range_chunks[1]) && isIp(range_chunks[0])) {
        return (ip4ToInt(range_chunks[0]) <= ip4ToInt(match)) && (ip4ToInt(match) <= ip4ToInt(range_chunks[1]));
    } else {
        return false;
    }
}

export const matchPortRange = (range, match) => {
    let range_chunks = range.split('-');
    if (!isNaN(parseFloat(match)) && isFinite(match) && (range_chunks.length > 1)) {
        return (parseInt(range_chunks[0]) <= parseInt(match)) && (parseInt(match) <= parseInt(range_chunks[-1]));
    } else {
        return (range && range.search(match) !== -1)
    }
}

export const matchByNetworkObject = ({name, value, type, objects, ...other}, match) => {
    switch (type) {
        case 'Host':
            return (name && name.toLowerCase().search(match) !== -1) || (value && value.search(match) !== -1);
        case 'Network':
            return (name && name.toLowerCase().search(match) !== -1) || (value && matchIPMask(value, match));
        case 'Range':
            return (name && name.toLowerCase().search(match) !== -1) || (value && matchIPRange(value, match));
        case 'NetworkGroup':
            return objects.some((obj) => matchByNetworkObject(obj, match));
        default:
            return true;
    }
}

export const matchByPortObject = ({name, value, port, type, objects, icmpType, ...other}, match) => {
    switch (type) {
        case 'ProtocolPortObject':
            return (name && name.toLowerCase().search(match) !== -1) || (port && matchPortRange(port, match));
        case 'PortObjectGroup':
            return objects.some((obj) => matchByPortObject(obj, match));
        case 'ICMPV4Object':
            return (name && name.toLowerCase().search(match) !== -1) || (icmpType && icmpType.search(match) !== -1);
        default:
            return true;
    }
}

export const matchByNetworkObjects = (objects, match) => {
    /*
        - network objects contains networkgroup which includes host or network that matches string
        - network objects contains host object that matches search string
        - network objects contains network object that matches search string
     */
    return objects.some(
        item => matchByNetworkObject(item, match));
}

export const matchByNetwork = (net, match) => {
    /*
        This function gives true if rule matches any of the following conditions:
        - No match string given
        - network is undefined (Rule is applied to ANY)
        - network literals contains host literal that matches search string (name or value)
        - network literals contains network literal that matches search string (name or value)
        - network objects contains networkgroup which includes host or network that matches string
        - network objects contains host object that matches search string
        - network objects contains network object that matches search string
        Otherwise it returns false
     */
    return (net && ((net.objects && matchByNetworkObjects(net.objects, match))
            || (net.literals && net.literals.some(
                item => item.value.toLowerCase().search(match) !== -1)))
    ) || !net;
};

export const matchByPortObjects = (objects, match) => {
    return objects.some(
        item => matchByPortObject(item, match));
};

export const searchInPortsLiterals = (literals, match) => {
    return literals.some(
        item => item.ports && item.ports.toLowerCase().search(match) !== -1);
};


export const matchByPort = (ports, match) => {
    return (ports && ((ports.objects && matchByPortObjects(ports.objects, match))
            || (ports.literals && searchInPortsLiterals(ports.literals, match)))
    ) || !ports;
};

export const matchByZone = (zone, match) => {
    return (zone && (zone.objects && matchByZoneObjects(zone.objects, match))
    ) || !zone;
};

export const matchByZoneObjects = (objects, match) => {
    return objects.some(
        item => matchByZoneObject(item, match));
};

export const matchByZoneObject = ({name, value, type, objects, ...other}, match) => {
    switch (type) {
        case 'SecurityZone':
            return (name && name.toLowerCase().search(match) !== -1) || (value && value.search(match) !== -1);
        default:
            return true;
    }
};

export const filterRules = (rules, nameFilter, sourceZone, sourceNetwork, destinationNetwork, sourcePort, destinationPort) => {
    let filteredRules = rules;

    if (nameFilter.length > 1) {
        filteredRules = filteredRules.filter((r) => matchByName(r, nameFilter.toLowerCase()));
    }
    if (sourceZone.length > 1) {
        filteredRules = filteredRules.filter((r) => matchByZone(r.sourceZones, sourceZone.toLowerCase()));
    }
    if (sourceNetwork.length > 1) {
        filteredRules = filteredRules.filter((r) => matchByNetwork(r.sourceNetworks, sourceNetwork.toLowerCase()));
    }
    if (destinationNetwork.length > 1) {
        filteredRules = filteredRules.filter((r) => matchByNetwork(r.destinationNetworks, destinationNetwork.toLowerCase()));
    }
    if (sourcePort.length > 1) {
        filteredRules = filteredRules.filter((r) => matchByPort(r.sourcePorts, sourcePort.toLowerCase()));
    }
    if (destinationPort.length > 1) {
        filteredRules = filteredRules.filter((r) => matchByPort(r.destinationPorts, destinationPort.toLowerCase()));
    }
    return filteredRules;
}