import { useEffect, useState } from "react";
import "./productManagement.css";
import { getProductApi } from "../../../api/admin.api";

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name_asc");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProductApi({
          search,
          sort,
          page,
          limit
        });

        const data = res.data;

        if (data.EC !== 0) return;

        setProducts(data.DT);
        setTotalPages(data.meta.totalPages);

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [search, sort, page]);

  /* ================= PAGINATION ================= */
  const renderPages = () => {
    const pages = [];
    const max = 5;

    let start = Math.max(1, page - 1);
    let end = Math.min(totalPages, start + max - 1);

    if (start > 1) pages.push(<span key="s">…</span>);

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          className={page === i ? "active" : ""}
          onClick={() => setPage(i)}
        >
          {i}
        </button>
      );
    }

    if (end < totalPages) pages.push(<span key="e">…</span>);

    return pages;
  };

  return (
    <div className="product-container">
      <h2>Product Management</h2>

      {/* ===== TOOLBAR ===== */}
      <div className="product-toolbar">
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="name_asc">Name A → Z</option>
          <option value="name_desc">Name Z → A</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
        </select>

        <input
          placeholder="Search product..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <button className="btn-primary">+ Add Product</button>
      </div>

      {/* ===== TABLE ===== */}
      <table className="product-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td colSpan="5">Loading...</td></tr>
          ) : products.length ? (
            products.map(p => (
              <tr key={p._id}>
                <td>{p._id}</td>
                <td>{p.name}</td>
                <td>{p.category}</td>
                <td>${p.price}</td>
                <td className="action-col">
                  <button className="btn-edit">Update</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="5">No products found</td></tr>
          )}
        </tbody>
      </table>

      {/* ===== PAGINATION ===== */}
      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>
        {renderPages()}
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>›</button>
      </div>
    </div>
  );
};

export default ProductManagement;
