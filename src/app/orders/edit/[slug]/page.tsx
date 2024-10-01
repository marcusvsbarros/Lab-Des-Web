"use client";

import EditTemplate from "@/components/templates/orders/EditTemplate";

interface ProductEditProps {
  params: { slug: string };
}

const ProductEdit: React.FC<ProductEditProps> = ({ params }) => {
  return <EditTemplate />;
};

export default ProductEdit;
