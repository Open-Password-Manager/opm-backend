/**
 * Generates a new secure password
 * @param length Length of password to be generated
 * @returns Newly generated secure password
 */
export function generatePassword(length: number): string{
    const characters = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ"; //TODO: Check for incompatible chars in MongoDB
    let generatedPassword = "";

    for(let i = 0; i < length; i++){
        let randomIndex = Math.floor(Math.random() * characters.length);
        generatedPassword += characters.substring(randomIndex, randomIndex+1);
    }

    return generatedPassword;
}