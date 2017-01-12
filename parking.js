function getSpace() {
    const space = parseInt(Math.random() * 1000);
    return space;
}

function payTicket(token) {
    const paid = true; // Put credit-card API-call (async) here
    
}

exports.getSpace = getSpace;
exports.pyTicket = payTicket;
