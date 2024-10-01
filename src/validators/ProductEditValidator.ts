import { validatorMessage } from "@/constants/validatorMessage";
import * as Yup from "yup";

export const ProductEditValidator = () => {
  return Yup.object().shape({
    description: Yup.string()
      .required(validatorMessage.requiredField)
      .min(3, validatorMessage.numericField)
      .max(100, validatorMessage.maxValue),
    brand: Yup.string()
      .required(validatorMessage.requiredField)
      .max(80, validatorMessage.maxValue),
    value: Yup.number()
      .min(0.01, validatorMessage.minValue)
      .typeError(validatorMessage.numericField)
      .required(validatorMessage.requiredField),
    weight: Yup.number()
      .min(0.01, validatorMessage.numericField),
    flavor: Yup.string(),
  });
};
