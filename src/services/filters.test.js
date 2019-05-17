import {matchByNetwork, matchByPort, matchIPMask, matchPortRange} from "./filters";
import {isIp4InCidr} from "./ip";

it('Pruebo ip dentro de mascara', () => {
    expect(isIp4InCidr('1.2.1.23')('1.2.0.0/16')).toBe(true);
});

it('Pruebo ip fuera del cidr', () => {
    expect(isIp4InCidr('1.2.1.23')('1.3.0.0/16')).toBe(false);
});

it('No matchea cidr', () => {
    expect(matchIPMask('1.3.0.0/16', '1.2.1.23')).toBe(false);
});

it('Pruebo ip que no matchee en el sourceNetwork', () => {
    expect(matchByNetwork({
        "objects": [{
            "links": {"self": "https://1.2.3.4/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/networkgroups/005D73DB-3806-0ed3-0000-098784273321"},
            "type": "NetworkGroup",
            "objects": [{
                "links": {
                    "self": "https://1.2.3.4/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/networks/005D73DB-3806-0ed3-0000-098784263562",
                    "parent": "https://1.2.3.4/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/networkaddresses"
                },
                "type": "Network",
                "value": "1.3.0.0/16",
                "overridable": false,
                "description": " ",
                "name": "1.3.0.0-16",
                "id": "005D73DB-3806-0ed3-0000-098784263562",
                "metadata": {
                    "timestamp": 1523888712500,
                    "lastUser": {"name": "test"},
                    "domain": {"name": "Global", "id": "e276abec-e0f2-11e3-8169-6d9ed49b625f"},
                    "ipType": "V_4",
                    "parentType": "NetworkAddress"
                }
            }, {
                "links": {
                    "self": "https://1.2.3.4/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/networks/005D73DB-3806-0ed3-0000-098784255940",
                    "parent": "https://1.2.3.4/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/networkaddresses"
                },
                "type": "Network",
                "value": "1.5.0.0/16",
                "overridable": false,
                "description": " ",
                "name": "1.5.0.0-16",
                "id": "005D73DB-3806-0ed3-0000-098784255940",
                "metadata": {
                    "timestamp": 1523898492150,
                    "lastUser": {"name": "test"},
                    "domain": {"name": "Global", "id": "e276abec-e0f2-11e3-8169-6d9ed49b625f"},
                    "ipType": "V_4",
                    "parentType": "NetworkAddress"
                }
            }, {
                "links": {
                    "self": "https://1.2.3.4/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/networks/005D73DB-3806-0ed3-0000-098784265534",
                    "parent": "https://1.2.3.4/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/networkaddresses"
                },
                "type": "Network",
                "value": "1.4.0.0/16",
                "overridable": false,
                "description": " ",
                "name": "Red.Test-16",
                "id": "005D73DB-3806-0ed3-0000-098784265534",
                "metadata": {
                    "timestamp": 1525285086970,
                    "lastUser": {"name": "test"},
                    "domain": {"name": "Global", "id": "e276abec-e0f2-11e3-8169-6d9ed49b625f"},
                    "ipType": "V_4",
                    "parentType": "NetworkAddress"
                }
            }],
            "overridable": false,
            "description": " ",
            "name": "MANAGERS",
            "id": "005D73DB-3806-0ed3-0000-098784273321",
            "metadata": {
                "timestamp": 1523898613753,
                "lastUser": {"name": "admin"},
                "domain": {"name": "Global", "id": "e276abec-e0f2-11e3-8169-6d9ed49b625f"}
            }

        }]
    }, '1.2.1.72')).toBe(false);
});

it('Pruebo que no matche icmp con numeros', () => {
    expect(matchByPort({
        "objects": [{
            "metadata": {
                "timestamp": 1523654838410,
                "lastUser": {"name": "admin"},
                "domain": {"name": "Global", "id": "e276abec-e0f2-11e3-8169-6d9ed49b625f"},
                "parentType": "Port"
            },
            "links": {
                "self": "https://1.2.3.4/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/portobjectgroups/005D73DB-3806-0ed3-0000-098784260533",
                "parent": "https://1.2.3.4/api/fmc_config/v1/domain/e276abec-e0f2-11e3-8169-6d9ed49b625f/object/ports"
            },
            "type": "PortObjectGroup",
            "objects": [{
                "type": "ICMPV4Object",
                "icmpType": "8",
                "name": "echo",
                "id": "005D73DB-3806-0ed3-0000-098784260461"
            }, {
                "type": "ICMPV4Object",
                "icmpType": "0",
                "name": "echo-reply",
                "id": "005D73DB-3806-0ed3-0000-098784260479"
            }, {
                "type": "ICMPV4Object",
                "icmpType": "11",
                "name": "time-exceeded",
                "id": "005D73DB-3806-0ed3-0000-098784260497"
            }, {
                "type": "ICMPV4Object",
                "icmpType": "3",
                "name": "unreachable",
                "id": "005D73DB-3806-0ed3-0000-098784260515"
            }],
            "overridable": false,
            "description": " ",
            "name": "PING-TRACERT",
            "id": "005D73DB-3806-0ed3-0000-098784260533"
        }]
    }, '5423')).toBe(false);
});


it('Match port range con solo un puerto', () => {
    expect(matchPortRange('636', '636')).toBe(true);
});

