import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updatedAtText = "Carregando...";

  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let dbStatusText = "Carregando dados do banco de dados...";

  if (!isLoading && data) {
    dbStatusText = data;
    const { version, max_connections, opened_connections } =
      dbStatusText.dependencies.database;

    dbStatusText = (
      <>
        <div>Versão: {version}</div>
        <div>Máximo de conexões: {max_connections}</div>
        <div>Conexões abertas: {opened_connections}</div>
      </>
    );
  }

  return (
    <>
      <h3>Banco de dados</h3>
      <div>{dbStatusText}</div>
    </>
  );
}
