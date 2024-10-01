"use client";

import Layout from "@/components/UI/organisms/Layout";
import { IProduct } from "@/interfaces/IProduct";
import { ProductEditValidator } from "@/validators/ProductEditValidator";
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
  const formik = useFormik<IProduct>({
    initialValues: {
      brand: "",
      description: "",
      flavor: "",
      value: 0,
      weight: 0,
    },
    validationSchema: ProductEditValidator,
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
          name="description"
          label="Descrição"
          fullWidth
          value={values.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
        />
        <TextField
          name="brand"
          label="Marca"
          fullWidth
          value={values.brand}
          onChange={handleChange}
          error={!!errors.brand}
          helperText={errors.brand}
        />
        <TextField
          name="value"
          label="Valor"
          fullWidth
          value={values.value}
          onChange={handleChange}
          error={!!errors.value}
          helperText={errors.value}
        />
        <TextField
          name="weight"
          label="Peso (gr.)"
          fullWidth
          value={values.weight}
          onChange={handleChange}
          error={!!errors.weight}
          helperText={errors.weight}
        />
        <Select
          name="flavor"
          label="Sabor"
          fullWidth
          value={values.flavor}
          onChange={(e) => setFieldValue("flavor", e.target.value)}
          error={!!errors.flavor}
        >
          <MenuItem value="">-- Não Informado --</MenuItem>
          <MenuItem value="morango">Morango</MenuItem>
          <MenuItem value="chocolate">Chocolate</MenuItem>
          <MenuItem value="abacaxi">Abacaxi</MenuItem>
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
