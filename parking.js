
function getSpace() {
    const space = parseInt(Math.random() * 1000);
    return space;
}

function payTicket(space, token) {
    const sum = 12.5; // TODO: Compute sum out of time factors
    const ret = pay(sum);
    if (ret.paid) {
        return token * ret.checkMulti;
    } else {
        throw ('Could not pay ticket');
    }
}

function registerSpace(space) {
    const register = space; // TODO: DB-Backend to store stuff
    return true;
}

function pay(sum) {
    const retObj = {// In production put credit-card API-call (async) here
        paid: Math.random() > 0.7 ? false : true, // 70% chance to pay ;-)
        checkMulti: 42
    };
    return retObj;
}

exports.getSpace = getSpace;
exports.payTicket = payTicket;
