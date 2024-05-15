import { Button, Table } from "antd";

export default function TabelaAdmin({
  data,
  columns,
  loading,
  linkAdicionarItem,
  botaoAdicionarLabel,
  pagination = true,
}) {
  return (
    <>
      {botaoAdicionarLabel && (
        <Button href={linkAdicionarItem}>{botaoAdicionarLabel}</Button>
      )}

      <Table
        pagination={pagination}
        columns={columns}
        loading={loading}
        dataSource={data}
      />
    </>
  );
}
