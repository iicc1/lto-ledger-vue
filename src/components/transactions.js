let Base58 = require("base-58");

longToByteArray = function(long) {
    const byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let index = 0; index < byteArray.length; index ++ ) {
        const byte = long & 0xff;
        byteArray [ index ] = byte;
        long = (long - byte) / 256 ;
    }
    return byteArray;
};

let sampleTransfer = {
    type: 4,
    version: 1,
    senderPublicKey: '6x8szHwCLYVjKR2N8u4Ux4XLkTUB7nobDNDX1tniH3mp',
    timestamp: 1563442673094,
    amount: 100000000,
    fee: 100000000,
    recipient: '3MyhVrN18vX7X77AeF8mzL8arJnkicY4GDc',
};

let sData;
if (sampleTransfer.type == 4) {
    let header = new Uint8Array([4,1,4]);
    // public key
    let senderPublicKey = Base58.decode(sampleTransfer.senderPublicKey);
    //timestamp
    let timestamp = longToByteArray(sampleTransfer.timestamp).reverse();
    //amount
    let amount = longToByteArray(sampleTransfer.amount).reverse();
    //fee
    let fee = longToByteArray(sampleTransfer.fee).reverse();
    //recipient
    let recipient = Base58.decode(sampleTransfer.recipient);
    // attach length (short)
    let attachmentLength = new Uint8Array([0,0]);

    // Build transaction
    sData = new Uint8Array(3 + senderPublicKey.length + 24 + recipient.length + 2);
    sData.set(header);
    sData.set(senderPublicKey, 3);
    sData.set(timestamp, senderPublicKey.length + 3);
    sData.set(amount, senderPublicKey.length + 3 + 8);
    sData.set(fee, senderPublicKey.length + 3 + 8 + 8);
    sData.set(recipient, senderPublicKey.length + 3 + 8 + 8 + 8);
    sData.set(attachmentLength, senderPublicKey.length + 3 + 8 + 8 + 8 + recipient.length)
}

