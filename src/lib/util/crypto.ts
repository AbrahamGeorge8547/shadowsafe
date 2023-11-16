

// This function takes a base64 encoded public key and plaintext, and returns encrypted text


async function encryptWithPublicKey(publicKeyEncoded, plaintext) {
    // Decode the base64 encoded public key to an ArrayBuffer
    const binaryDerString = atob(publicKeyEncoded);
    const binaryDer = new Uint8Array(binaryDerString.length);
    for (let i = 0; i < binaryDerString.length; i++) {
        binaryDer[i] = binaryDerString.charCodeAt(i);
    }

    // Import the public key into the Web Crypto API
    const publicKey = await window.crypto.subtle.importKey(
        'spki', // assuming the publicKeyEncoded is in 'SubjectPublicKeyInfo' format
        binaryDer.buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256" // make sure to use the hash that was used to generate the keys
        },
        false,
        ["encrypt"]
    );

    // Encrypt the plaintext
    const encrypted = await window.crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        publicKey,
        new TextEncoder().encode(plaintext) // convert plaintext to an ArrayBuffer
    );

    // Return the encrypted data as a base64 encoded string
    return btoa(String.fromCharCode.apply(null, new Uint8Array(encrypted)));
}


export async function encryptCredential(payload, users) {
    // Placeholder for the results
    const credentialList = [];

    // Iterate over each credential in the payload
    for (const credential of payload) {
        const credentialUsers = [];

        // Find the matching user for each credential
        for (const user of users) {
            // Iterate over each field that needs to be encrypted
            const encryptedFields = [];
            for (const field of credential.encryptedFields) {
                const encryptedValue = await encryptWithPublicKey(user.publicKey, field.fieldValue);
                encryptedFields.push({
                    fieldName: field.fieldName,
                    fieldValue: encryptedValue // The encrypted value
                });
            }

            // Assuming accessType is a property of the user that needs to be included
            credentialUsers.push({
                userId: user.id,
                fields: encryptedFields,
                accessType: user.accessType || 'default' // Default access type if not specified
            });

        }

        // Construct the final structure for the current credential
        credentialList.push({
            credentialId: credential.id,
            users: credentialUsers
        });
    }

    // Return the final result
    return { credentialList };
}
