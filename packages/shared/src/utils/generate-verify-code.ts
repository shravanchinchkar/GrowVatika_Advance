
export function generateVerifyCode(){
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    return verifyCode;
}