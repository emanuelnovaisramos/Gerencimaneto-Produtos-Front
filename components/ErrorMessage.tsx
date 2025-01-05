export const ErrorMessage = () => {
  return (
    <div className="flex flex-col opacity-80 gap-2 justify-center items-center h-40">
      <i
        className="pi pi-exclamation-triangle"
        style={{ fontSize: "2rem", color: "red" }}
      ></i>
      <p className="text-red-500 text-base">Erro ao carregar informações</p>
    </div>
  );
};
