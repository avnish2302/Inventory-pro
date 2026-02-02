import { useEffect, useState } from "react";
import api from "../services/api";
import Table from "../components/Table";

export default function Sales() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    api.get("/sales").then(res => setSales(res.data));
  }, []);

  return (
    <Table
      headers={["Product", "Qty", "Total"]}
      rows={sales.map(s => [
        s.product?.name,
        s.quantity,
        s.total
      ])}
    />
  );
}
