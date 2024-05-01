import { Button, Table } from "antd";

export default function TabelaAdmin({
  data,
  columns,
  loading,
  linkAdicionarItem,
  botaoAdicionarLabel,
}) {
  return (
    <>
      <Button href={linkAdicionarItem}>{botaoAdicionarLabel}</Button>

      <Table columns={columns} loading={loading} dataSource={data} />
    </>
  );
}
