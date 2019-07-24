let Base58 = require("base-58");

export let longToByteArray = function(long) {
    const byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
    for (let index = 0; index < byteArray.length; index ++ ) {
        const byte = long & 0xff;
        byteArray [ index ] = byte;
        long = (long - byte) / 256 ;
    }
    return byteArray;
};

export function prepareBytes(tx) {
    let sData;
    if (tx.type == 4) {
        // type + version + whatever
        let header = new Uint8Array([4,1,4]);
        // public key
        let senderPublicKey = Base58.decode(tx.senderPublicKey);
        //timestamp
        let timestamp = longToByteArray(tx.timestamp).reverse();
        //amount
        let amount = longToByteArray(tx.amount).reverse();
        //fee
        let fee = longToByteArray(tx.fee).reverse();
        //recipient
        let recipient = Base58.decode(tx.recipient);
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
    } else if (tx.type == 8) {

    } else if (tx.type == 9) {

    }

    return sData;
}

