"use client";

import CustomTable from "@/components/UI/organisms/CustomTable";
import Layout from "@/components/UI/organisms/Layout";
import { env } from "@/config/env";
import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const Orders = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${env.apiBaseUrl}/orders`);

      const orders = response.data.pedidos.map((order: any) => {
        const date = new Date(order.data);
        const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
        return {
          id: order.id,
          date: formattedDate,
          cpf: order.cpf,
          paymentMethod: order.forma_pagamento,
          itemCount: order.quantidade_itens,
          totalValue: order.valor_total,
        };
      });

      setRows(orders);
    };

    fetchOrders();
  }, []);

  const headCells = [
    {
      id: "cpf",
      numeric: false,
      disablePadding: false,
      label: "CPF",
    },
    {
      id: "paymentMethod",
      numeric: false,
      disablePadding: false,
      label: "Método de Pagamento",
    },
    {
      id: "itemCount",
      numeric: true,
      disablePadding: false,
      label: "Quantidade de itens",
    },
    {
      id: "totalValue",
      numeric: true,
      disablePadding: false,
      label: "Valor total",
    },
    {
      id: "date",
      numeric: false,
      disablePadding: false,
      label: "Data",
    },
  ];

  return (
    <Layout>
      <Box> Lista de Pedidos </Box>
      <CustomTable rows={rows} headCells={headCells} />
    </Layout>
  );
};

export default Orders;
