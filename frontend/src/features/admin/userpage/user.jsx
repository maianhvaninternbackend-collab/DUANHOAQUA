import { useEffect, useState } from "react";
import "./user.css";
import {
    getUsersByAdminApi,
    deleteUserByAdminApi
} from "../../../api/admin.api";

const UserPage = () => {
    // ===== STATE =====
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);

    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("name_asc");

    const [notifications, setNotifications] = useState([]);

    // ===== TOAST =====
    const showNotification = (title, message) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { id, title, message }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(t => t.id !== id));
        }, 3000);
    };

    // ===== FETCH USERS =====
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await getUsersByAdminApi({
                page,
                limit,
                search,
                sort
            });

            const data = res.data;

            if (data.EC !== 0) throw new Error(data.EM);

            setUsers(data.DT);
            setTotalPages(data.meta.totalPages);
        } catch (error) {
            showNotification("Error", error.message || "Fetch user failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [page, search, sort]);

    //Pages
    const renderPages = () => {
        const pages = [];
        const maxVisible = 5;

        // Nếu tổng page <= 5 → show hết
        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
            return pages;
        }

        // Luôn có trang 1
        pages.push(1);

        // Page hiện tại nằm giữa
        let start = Math.max(2, page - 1);
        let end = Math.min(totalPages - 1, page + 1);

        if (start > 2) pages.push("...");

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (end < totalPages - 1) pages.push("...");

        // Luôn có trang cuối
        pages.push(totalPages);

        return pages;
    };

    // ===== DELETE =====
    const handleDeleteUser = async (id) => {
        if (!window.confirm("Bạn chắc chắn muốn xóa user này?")) return;

        try {
            const res = await deleteUserByAdminApi(id);
            const data = res.data;

            if (data.EC !== 0) throw new Error(data.EM);

            showNotification("Success", "Xóa user thành công");
            fetchUsers();
        } catch (error) {
            showNotification("Error", error.message || "Xóa thất bại");
        }
    };

    return (
        <>
            {/* ===== TOAST ===== */}
            <div className="toast-wrapper">
                {notifications.map(n => (
                    <div key={n.id} className="toast-item">
                        <div className="toast-title">{n.title}</div>
                        <div className="toast-desc">{n.message}</div>
                    </div>
                ))}
            </div>

            {/* ===== PAGE ===== */}
            <div className="user-container">
                <h2>User Management</h2>

                {/* ===== TOOLBAR ===== */}
                <div className="user-toolbar">
                    {/* SORT – LEFT */}
                    <select
                        className="sort-select"
                        value={sort}
                        onChange={(e) => {
                            setPage(1);
                            setSort(e.target.value);
                        }}
                    >
                        <option value="name_asc">Tên A → Z</option>
                        <option value="name_desc">Tên Z → A</option>
                    </select>

                    {/* SEARCH – RIGHT */}
                    <input
                        className="search-input"
                        type="text"
                        placeholder="Tìm theo tên hoặc email..."
                        value={search}
                        onChange={(e) => {
                            setPage(1);
                            setSearch(e.target.value);
                        }}
                    />
                </div>


                {/* ===== TABLE ===== */}
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    Loading...
                                </td>
                            </tr>
                        ) : users.length > 0 ? (
                            users.map(u => (
                                <tr key={u._id}>
                                    <td>{u._id}</td>
                                    <td>{u.email}</td>
                                    <td>{u.name}</td>
                                    <td>
                                        <span className="role-tag">{u.role}</span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn-delete"
                                            onClick={() => handleDeleteUser(u._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" style={{ textAlign: "center" }}>
                                    Không có dữ liệu
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* ===== PAGINATION ===== */}
                <div className="pagination">
                    <button
                        disabled={page === 1}
                        onClick={() => setPage(prev => prev - 1)}
                    >
                        ‹
                    </button>

                    {renderPages().map((p, index) =>
                        p === "..." ? (
                            <span key={`dots-${index}`} className="dots">…</span>
                        ) : (
                            <button
                                key={p}
                                className={page === p ? "active" : ""}
                                disabled={page === p}
                                onClick={() => setPage(p)}
                            >
                                {p}
                            </button>
                        )
                    )}

                    <button
                        disabled={page === totalPages}
                        onClick={() => setPage(prev => prev + 1)}
                    >
                        ›
                    </button>
                </div>
            </div>
        </>
    );
};

export default UserPage;
