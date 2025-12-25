import { useEffect, useState } from "react";
import "./categoryManagement.css";
import { getCategoryApi } from "../../../api/admin.api";

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("name_asc");

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getCategoryApi({
          search,
          sort,
          page,
          limit
        });

        const data = res.data;

        if (data.EC !== 0) return;

        setCategories(data.DT);
        setTotalPages(data.meta.totalPages);

      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [search, sort, page]);

  return (
    <div className="category-container">
      <h2>Category Management</h2>

      <div className="category-toolbar">
        <select
          value={sort}
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
        >
          <option value="name_asc">Name A → Z</option>
          <option value="name_desc">Name Z → A</option>
        </select>

        <input
          placeholder="Search category..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <button className="btn-primary">+ Add Category</button>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr><td colSpan="3">Loading...</td></tr>
          ) : categories.length ? (
            categories.map(c => (
              <tr key={c._id}>
                <td>{c._id}</td>
                <td>{c.name}</td>
                <td className="action-col">
                  <button className="btn-edit">Update</button>
                  <button className="btn-delete">Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="3">No categories found</td></tr>
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>‹</button>
        <button className="active">{page}</button>
        <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>›</button>
      </div>
    </div>
  );
};

export default CategoryManagement;
