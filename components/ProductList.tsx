import { Product } from "@/types/product";
import { currency } from "@/utils/currency";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";

export const ProductList = ({
  products,
  handleDeleteProduct,
  handleEditProduct,
}: {
  products: Array<Product>;
  handleDeleteProduct: (product: Product) => void;
  handleEditProduct: (product: Product) => void;
}) => {
  const actionBodyTemplate = (rowData: Product) => {
    return (
      <div className="flex w-max h-full gap-4 items-center">
        <Button
          icon="pi pi-pencil"
          size="small"
          rounded
          raised
          outlined
          className="text-blue-500"
          onClick={() => handleEditProduct(rowData)}
        />
        <Button
          icon="pi pi-trash"
          size="small"
          rounded
          raised
          outlined
          className="text-red-500"
          onClick={() => handleDeleteProduct(rowData)}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col bg-white w-full rounded-md relative">
      <DataTable
        value={products}
        size="small"
        resizableColumns
        showGridlines
        tableStyle={{ minWidth: "600px" }}
        emptyMessage=" "
        scrollable
        scrollHeight="60vh"
      >
        <Column
          field="name"
          header="Nome"
          frozen
          sortable
          className="capitalize"
          style={{
            width: "25rem",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        ></Column>
        <Column
          field="price"
          header="Preço"
          sortable
          body={(rowData: Product) => currency(rowData.price)}
          style={{
            width: "25rem",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        ></Column>
        <Column
          field="quantity"
          header="Quantidade"
          sortable
          style={{
            width: "15rem",
            wordWrap: "break-word",
            whiteSpace: "normal",
          }}
        ></Column>
        <Column body={actionBodyTemplate}></Column>
      </DataTable>
      {products.length === 0 && (
        <div className="flex flex-col opacity-80 gap-2 justify-center items-center bg-white h-40">
          <i
            className="pi pi-inbox"
            style={{ fontSize: "1.75rem", color: "gray" }}
          ></i>
          <p className="text-gray-500 text-base">Nenhum produto cadastrado</p>
        </div>
      )}
    </div>
  );
};
