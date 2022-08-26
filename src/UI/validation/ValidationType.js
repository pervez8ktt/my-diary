import { decimalOnly, numberOnly, regNegPosNum, required } from "./ValidationDefination";

const validationType = {
    vNum: numberOnly,
    required: required,
    vDec: decimalOnly,
    regNegPosNum:regNegPosNum
}

const ValidationType = (_type) =>{
    return validationType[_type];

}

export default ValidationType;