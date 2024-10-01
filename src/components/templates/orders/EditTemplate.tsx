"use client";

import Layout from "@/components/UI/organisms/Layout";
import { IOrder } from "@/interfaces/IOrders";
import { OrderEditValidator } from "@/validators/OrderEditValidator";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik, validateYupSchema } from "formik";

const EditTemplate: React.FC = () => {
const formik = useFormik<IOrder>({
    initialValues: {
        date: new Date(),
        cpf: "",
        paymentMethod: "",
        itemCount: 0,
        totalValue: 0,
    },
    validationSchema: OrderEditValidator,
    onSubmit: (values) => {
        console.log(values);
    },
});

  const { handleSubmit, values, handleChange, setFieldValue, errors } = formik;

  // <div>{params.slug}</div>

  // "descricao": "Bolacha",
  // "marca": "Trakinas",
  // "valor": 1.99,
  // "peso_gramas": 100,
  // "sabor": "morango"

  return (
    <Layout>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          name="cpf"
          label="CPF"
          fullWidth
          value={values.cpf}
          onChange={handleChange}
          error={!!errors.cpf}
          helperText={errors.cpf}
        />
        <TextField
          name="itemCount"
          label="Quantidade de itens"
          fullWidth
          value={values.itemCount}
          onChange={handleChange}
          error={!!errors.itemCount}
          helperText={errors.itemCount}
        />
        <TextField
          name="totalValue"
          label="Valor total"
          fullWidth
          value={values.totalValue}
          onChange={handleChange}
          error={!!errors.totalValue}
          helperText={errors.totalValue}
        />
        <TextField
            name="date"
            label="Data"
            type="date"
            fullWidth
            value={values.date.toISOString().split('T')[0]}
            onChange={(e) => setFieldValue("date", new Date(e.target.value))}
            error={!!errors.date}
            InputLabelProps={{
            shrink: true,
          }}
        />
        <Select
          name="paymentMethod"
          label="Metodo de pagamento"
          fullWidth
          value={values.paymentMethod}
          onChange={(e) => setFieldValue("paymentMethod", e.target.value)}
          error={!!errors.paymentMethod}
        >
          <MenuItem value="">-- Não Informado --</MenuItem>
          <MenuItem value="aVista">A vista</MenuItem>
          <MenuItem value="credito">Credito</MenuItem>
          <MenuItem value="pix">Pix</MenuItem>
        </Select>
        <Button variant="outlined" color="secondary">
          Cancelar
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Atualizar
        </Button>
      </Box>
    </Layout>
  );
};

export default EditTemplate;
