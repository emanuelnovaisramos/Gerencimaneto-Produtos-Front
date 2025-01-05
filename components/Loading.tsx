export const Loading = () => {
  return (
    <div className="flex flex-col opacity-80 gap-2 justify-center items-center h-40">
      <div className="animate-spin w-max h-max">
        <i
          className="pi pi-spin pi-spinner"
          style={{ fontSize: "2rem", color: "gray" }}
        ></i>
      </div>
      <p className="text-gray-500 text-base">Carregando informações</p>
    </div>
  );
};
