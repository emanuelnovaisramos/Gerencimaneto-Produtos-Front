"use client";
import { useProducts } from "@/api/product/getProducts";
import { Button } from "primereact/button";
import { Product } from "@/types/product";
import { useDeleteProduct } from "@/api/product/deleteProduct";
import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import {
  ConfirmDialog,
  confirmDialog,
  ConfirmDialogProps,
} from "primereact/confirmdialog";
import { ProductList } from "@/components/ProductList";
import { Dialog } from "primereact/dialog";
import { ProductForm } from "@/components/ProductForm";
import { useEditProduct } from "@/api/product/editProduct";
import { useCreateProduct } from "@/api/product/createProduct";
import { Loading } from "@/components/Loading";
import { ErrorMessage } from "@/components/ErrorMessage";

interface ExtendedConfirmDialogProps extends ConfirmDialogProps {
  footerClassName?: string;
}

export default function Home() {
  const toast = useRef<Toast>(null);
  const { data, isLoading, error } = useProducts();
  const [products, setProducts] = useState<Array<Product>>([]);
  const { mutateAsync: deleteProduct } = useDeleteProduct();
  const { mutateAsync: editProduct, isPending: isPedingEdit } =
    useEditProduct();
  const { mutateAsync: createProduct, isPending: isPendingCreate } =
    useCreateProduct();
  const [openDialogForm, setOpenDialogForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(
    undefined
  );

  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data]);

  const handleCreateProduct = async (newProduct: Product) => {
    await createProduct(newProduct)
      .then((product) => {
        setProducts((prevProducts) => [product, ...prevProducts]);
        toast.current?.show({
          severity: "success",
          detail: "Produto criado com sucesso",
        });
      })
      .catch(() => {
        toast?.current?.show({
          severity: "error",
          detail: "Erro ao criar produto. Tente novamente.",
        });
      })
      .finally(() => {
        setOpenDialogForm(false);
        setSelectedProduct(undefined);
      });
  };

  const handleClickEditProduct = (product: Product) => {
    setOpenDialogForm(true);
    setSelectedProduct(product);
  };

  const handleClickCreateProduct = () => {
    setOpenDialogForm(true);
    setSelectedProduct(undefined);
  };

  const handleEditProduct = async (updatedProduct: Product) => {
    await editProduct(updatedProduct)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );
        toast.current?.show({
          severity: "success",
          detail: "Produto editado com sucesso",
        });
      })
      .catch(() => {
        toast?.current?.show({
          severity: "error",
          detail: "Erro ao editar produto. Tente novamente.",
        });
      })
      .finally(() => {
        setOpenDialogForm(false);
        setSelectedProduct(undefined);
      });
  };

  const handleDeleteProduct = async (id: number) => {
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
      accept: () => handleDeleteProduct(product.id as number),
      acceptClassName: "bg-blue-500 p-2 text-white",
      acceptLabel: "Sim",
      rejectLabel: "Não",
      className: "max-w-[500px] text-center",
      footerClassName: "flex justify-end items-center gap-4",
    } as ExtendedConfirmDialogProps);
  };

  return (
    <div className="flex w-full justify-center px-4 max-w-full pt-20">
      <Toast ref={toast} />
      <ConfirmDialog />
      <Dialog
        header={
          selectedProduct
            ? `Editar produto ${selectedProduct.name}`
            : "Novo Produto"
        }
        className="w-full mx-4 max-w-[500px]"
        onHide={() => setOpenDialogForm(false)}
        visible={openDialogForm}
      >
        <ProductForm
          editProduct={selectedProduct}
          onSubmit={selectedProduct ? handleEditProduct : handleCreateProduct}
          isFetching={isPendingCreate || isPedingEdit}
        />
      </Dialog>
      {isLoading && <Loading />}
      {error && <ErrorMessage />}
      {data && !error && (
        <div className="flex w-full max-w-[70rem] justify-center items-center flex-col gap-4">
          <div className="w-full justify-start items-start">
            <Button
              icon="pi pi-plus"
              size="small"
              className="text-white p-2 rounded-md bg-blue-500 w-max"
              label="Novo Produto"
              onClick={handleClickCreateProduct}
            />
          </div>
          <ProductList
            products={products}
            handleDeleteProduct={confirmDeleteProduct}
            handleEditProduct={handleClickEditProduct}
          />
        </div>
      )}
    </div>
  );
}
