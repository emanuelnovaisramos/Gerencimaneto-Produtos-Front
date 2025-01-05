"use client";
import React from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";
import { Button } from "primereact/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/types/product";

const productFormSchema = z.object({
  id: z
    .any()
    .optional()
    .transform((value) => (value ? Number(value) : undefined)),
  name: z
    .string()
    .min(3, { message: "O nome deve ter no mínimo 3 caracteres" }),
  price: z.number().min(0.01, { message: "O preço deve ser maior que 0" }),
  quantity: z
    .number()
    .int()
    .min(0, { message: "A quantidade deve ser positivo" }),
});

type ProductForm = z.infer<typeof productFormSchema>;

export const ProductForm = ({
  editProduct,
  onSubmit,
  isFetching,
}: {
  editProduct?: Product;
  onSubmit: (data: Product) => void;
  isFetching?: boolean;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      id: editProduct?.id || undefined,
      name: editProduct?.name || "",
      price: editProduct?.price || 0,
      quantity: editProduct?.quantity || 0,
    },
  });

  console.log(errors);

  return (
    <form
      className="flex flex-col p-4 bg-white w-full rounded-md gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input type="hidden" {...register("id")} />
      <div className="flex flex-col gap-1">
        <label htmlFor="name">Nome do Produto</label>
        <InputText id="name" placeholder="Nome" {...register("name")} />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="price">Preço</label>
        <InputNumber
          inputId="price"
          placeholder="Preço"
          mode="currency"
          currency="BRL"
          locale="pt-BR"
          value={watch("price")}
          className="min-w-full"
          onValueChange={(e) => setValue("price", e.value || 0)}
        />
        {errors.price && <p className="text-red-500">{errors.price.message}</p>}
      </div>
      <div className="flex flex-col gap-1">
        <label htmlFor="quantity">Quantidade</label>
        <InputNumber
          inputId="quantity"
          placeholder="Quantidade"
          value={watch("quantity")}
          className="min-w-full"
          onValueChange={(e) => setValue("quantity", e.value || 1)}
          mode="decimal"
          minFractionDigits={0}
          maxFractionDigits={0}
        />
        {errors.quantity && (
          <p className="text-red-500">{errors.quantity.message}</p>
        )}
      </div>
      <div className="flex gap-4 justify-end items-end">
        <Button
          size="small"
          className="text-white p-2 rounded-md bg-blue-500 w-max"
          label={isFetching ? "Salvando" : editProduct ? "Editar" : "Adicionar"}
          type="submit"
          disabled={isFetching}
        />
      </div>
    </form>
  );
};
