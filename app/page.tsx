"use client";
import { useProducts } from "@/api/getProducts";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Product } from "@/types/product";
import { currency } from "@/utils/currency";
import { useDeleteProduct } from "@/api/deleteProduct";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import {
  ConfirmDialog,
  confirmDialog,
  ConfirmDialogProps,
} from "primereact/confirmdialog";
import Link from "next/link";

interface ExtendedConfirmDialogProps extends ConfirmDialogProps {
  footerClassName?: string;
}

export default function Home() {
  const toast = useRef<Toast>(null);
  const { data, isLoading, error } = useProducts();
  const [products, setProducts] = useState<Array<Product>>([]);
  const { mutateAsync: deleteProduct } = useDeleteProduct();

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleEditProduct = (product: Product) => {
    console.log("Edit product", product);
  };

  const handleDeleteProduct = async (id: string) => {
    await deleteProduct(id)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== id)
        );
        toast.current?.show({
          severity: "success",
          detail: "Produto deletado com sucesso",
        });
      })
      .catch((error) => {
        toast?.current?.show({
          severity: "error",
          detail: error.message || "Erro ao deletar produto",
        });
      });
  };

  const confirmDeleteProduct = (product: Product) => {
    confirmDialog({
      message: `Você tem certeza que deseja excluir o produto "${product.name}"?`,
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDeleteProduct(product.id),
      acceptClassName: "bg-blue-500 p-2 text-white",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      className: "max-w-[500px] text-center",
      footerClassName: "flex justify-end items-center gap-4",
    } as ExtendedConfirmDialogProps);
  };

  const actionBodyTemplate = (rowData: Product) => {
    return (
      <div className="flex h-full gap-4 items-center">
        <Button
          icon="pi pi-pencil"
          size="small"
          rounded
          raised
          outlined
          className="text-blue-500"
        />
        <Button
          icon="pi pi-trash"
          size="small"
          rounded
          raised
          outlined
          className="text-red-500"
          onClick={() => confirmDeleteProduct(rowData)}
        />
      </div>
    );
  };

  return (
    <div className="flex w-full justify-center items-center pt-48">
      <Toast ref={toast} />
      <ConfirmDialog />
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && !error && (
        <div className="flex flex-col gap-4 ">
          <Link href="/produto/novo">
            <Button
              icon="pi pi-plus"
              size="small"
              className="text-white p-2 rounded-md bg-blue-500 w-max"
              label="Novo Produto"
            />
          </Link>
          <div className="flex flex-col bg-white rounded-md relative overflow-hidden">
            <DataTable
              value={products}
              size="small"
              tableStyle={{ minWidth: "70rem" }}
              emptyMessage=" "
            >
              <Column
                field="id"
                header="Codigo"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="name"
                header="Nome"
                sortable
                className="capitalize"
                style={{ width: "50%" }}
              ></Column>
              <Column
                field="price"
                header="Preço"
                sortable
                body={(rowData: Product) => currency(rowData.price)}
                style={{ width: "25%" }}
              ></Column>
              <Column
                field="quantity"
                header="Quantidade"
                sortable
                style={{ width: "25%" }}
              ></Column>
              <Column
                body={actionBodyTemplate}
                style={{ width: "25%" }}
              ></Column>
            </DataTable>
            {products.length === 0 && (
              <div className="flex flex-col opacity-80 gap-2 justify-center items-center bg-white h-40">
                <i
                  className="pi pi-inbox"
                  style={{ fontSize: "1.75rem", color: "gray" }}
                ></i>
                <p className="text-gray-500 text-base">
                  Nenhum produto cadastrado
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
