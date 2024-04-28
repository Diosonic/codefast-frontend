import { Table } from "antd";

export default function TabelaAdmin({ data, columns, loading }) {
  return <Table columns={columns} loading={loading} dataSource={data} />;
}
