const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={{ marginTop: "20px", textAlign: "center" }}>
      {/* Previous Button */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        style={{ marginRight: "10px" }}
      >
        ← Prev
      </button>

      {/* Page Numbers */}
      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onPageChange(p)}
          style={{
            margin: "0 5px",
            fontWeight: p === page ? "bold" : "normal",
            textDecoration: p === page ? "underline" : "none",
          }}
        >
          {p}
        </button>
      ))}

      {/* Next Button */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        style={{ marginLeft: "10px" }}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;
