import { validatorMessage } from "@/constants/validatorMessage";
import * as Yup from "yup";

export const OrderEditValidator = () => {
  const{maxValue,minLength,maxlength,minValue,requiredField,numericField,length} = validatorMessage
  return Yup.object().shape({
    date: Yup.date().required(requiredField),
    cpf: Yup.string()
      .required(requiredField)
      .length(11, length),
    paymentMethod: Yup.string().required(requiredField),
    itemCount: Yup.number()
      .required(requiredField)
      .min(1, minValue),
    totalValue: Yup.number()
      .required(requiredField)
      .typeError(requiredField)
      .min(0.01, minValue),
    
  });
};
