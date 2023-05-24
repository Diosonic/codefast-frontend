import { Table } from "antd";

export default function AdminTable({ data, columns, loading }) {
  return <Table columns={columns} loading={loading} dataSource={data} />;
}
