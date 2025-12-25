import { useEffect, useState } from "react";
import "./accounts.css";
import { getAdminApi, updateAdminApi, deleteAdminApi } from "../../../api/admin.api";

const AdminPage = () => {
    const [dataSource, setDataSource] = useState([]);
    const [page, setPage] = useState(1);
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editAdmin, setEditAdmin] = useState(null);
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("name_asc");

    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    // ===== SHOW TOAST =====
    const showNotification = (type, title, message) => {
        const id = Date.now();
        const toast = { id, type, title, message };

        setNotifications(prev => [...prev, toast]);

        setTimeout(() => {
            setNotifications(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };
    //MoDal
    const openEditModal = (admin) => {
        setEditAdmin({ ...admin });
        setShowModal(true);
    };

    // Update
    const handleUpdateAdmin = async () => {
        try {
            await updateAdminApi(editAdmin._id, {
                fullName: editAdmin.fullName,
            });

            setDataSource(prev =>
                prev.map(a =>
                    a._id === editAdmin._id
                        ? { ...a, fullName: editAdmin.fullName }
                        : a
                )
            );

            setShowModal(false);

            showNotification(
                "success",
                "Thành công",
                "Cập nhật admin thành công"
            );
        } catch (error) {
            showNotification(
                "error",
                "Lỗi",
                "Không thể cập nhật admin"
            );
        }
    };

    //delete
    const handleDeleteAdmin = async (id) => {
        const ok = window.confirm("Bạn chắc chắn muốn xóa admin này?");
        if (!ok) return;

        try {
            await deleteAdminApi(id);

            setDataSource(prev => prev.filter(a => a._id !== id));

            showNotification(
                "success",
                "Thành công",
                "Xóa admin thành công"
            );
        } catch (error) {
            showNotification(
                "error",
                "Lỗi",
                "Không thể xóa admin"
            );
        }
    };

    // ===== FETCH ADMIN =====
    useEffect(() => {
        const fetchAdmin = async () => {
            setLoading(true);
            try {
                const res = await getAdminApi({
                    search,
                    sort,
                    page,
                    limit,
                });

                setDataSource(res.data.items);
                setTotalPages(res.data.totalPages);

            } catch (error) {
                showNotification("error", "Lỗi", "Không thể tải admin");
            } finally {
                setLoading(false);
            }
        };

        fetchAdmin();
    }, [search, sort, page]);

    //PAGINATION
    const renderPages = () => {
        const pages = [];
        const maxVisible = 5; // số nút hiển thị

        let start = Math.max(1, page - 1);
        let end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start < maxVisible - 1) {
            start = Math.max(1, end - maxVisible + 1);
        }

        if (start > 1) {
            pages.push(
                <button key={1} onClick={() => setPage(1)}>1</button>
            );
            if (start > 2) {
                pages.push(<span key="start-ellipsis" className="ellipsis">…</span>);
            }
        }

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

        if (end < totalPages) {
            if (end < totalPages - 1) {
                pages.push(<span key="end-ellipsis" className="ellipsis">…</span>);
            }
            pages.push(
                <button key={totalPages} onClick={() => setPage(totalPages)}>
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <>
            {/* ===== TOAST UI ===== */}
            <div className="toast-wrapper">
                {notifications.map(n => (
                    <div key={n.id} className={`toast-item ${n.type}`}>
                        <div className="toast-icon">
                            {n.type === "success" ? "✔" : "✖"}
                        </div>

                        <div className="toast-content">
                            <div className="toast-title">{n.title}</div>
                            <div className="toast-desc">{n.message}</div>
                        </div>

                        <div
                            className="toast-close"
                            onClick={() =>
                                setNotifications(prev => prev.filter(t => t.id !== n.id))
                            }
                        >
                            ✕
                        </div>
                    </div>
                ))}
            </div>

            {/* ===== PAGE CONTENT ===== */}
            <div className="admin-container">
                <h2>Admin Management</h2>

                <div className="admin-toolbar">

                    <select
                        className="sort-select"
                        value={sort}
                        onChange={(e) => {
                            setSort(e.target.value);
                            setPage(1);
                        }}
                    >
                        <option value="name_asc">Tên A → Z</option>
                        <option value="name_desc">Tên Z → A</option>
                        <option value="email_asc">Email A → Z</option>
                        <option value="email_desc">Email Z → A</option>
                    </select>
                    <input
                        className="search-input"
                        placeholder="Tìm theo tên hoặc email..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                    />
                </div>

                <table className="admin-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                                    Đang tải dữ liệu...
                                </td>
                            </tr>
                        ) : dataSource.length > 0 ? (
                            dataSource.map(item => (
                                <tr key={item._id}>
                                    <td>{item._id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.fullName}</td>
                                    <td>
                                        <span className="role-tag">{item.role}</span>
                                    </td>
                                    <td className="action-col">
                                        <button
                                            className="btn-edit"
                                            onClick={() => openEditModal(item)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDeleteAdmin(item._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
                                    Không có dữ liệu!
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>

                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ‹
                    </button>

                    {renderPages()}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(page + 1)}
                    >
                        ›
                    </button>
                </div>
            </div>

            {showModal && editAdmin && (
                <div className="modal-overlay">
                    <div className="modal modal-admin">
                        <h3 className="modal-title">Update Admin</h3>

                        <div className="form-group">
                            <label>Name</label>
                            <input
                                value={editAdmin.fullName || ""}
                                onChange={(e) =>
                                    setEditAdmin({
                                        ...editAdmin,
                                        fullName: e.target.value,
                                    })
                                }
                            />
                        </div>

                        <div className="modal-actions">
                            <button className="btn-cancel" onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button className="btn-save" onClick={handleUpdateAdmin}>
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AdminPage;
