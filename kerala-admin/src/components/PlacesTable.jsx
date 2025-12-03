import React, { useEffect, useState } from "react";

const PlacesTable = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // items per page
  const [totalPages, setTotalPages] = useState(1);

  // Fetch paginated places
  const fetchPlaces = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/api/places?page=${page}&limit=${limit}`);
      const data = await res.json();

      setPlaces(data.places);
      setTotalPages(data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Failed to load places:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlaces();
  }, [page]);

  // Delete place
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this place?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/places/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Place deleted successfully!");
        fetchPlaces(); // refresh list
      } else {
        alert("Failed to delete place.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting place.");
    }
  };

  if (loading) return <p>Loading places...</p>;

  return (
    <div>
      <div className="page-header">
        <h2 className="page-title">Tourist Places</h2>
        <button className="btn btn-primary">Export Data</button>
      </div>

      <div className="card">
        <div className="table-wrapper">
          <table className="places-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>District</th>
                <th>Category</th>
                <th>Description</th>
                <th>Map Link</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {places.map((place, index) => (
                <tr key={place._id}>
                  <td>{(page - 1) * limit + index + 1}</td>
                  <td><strong>{place.name}</strong></td>
                  <td>{place.district}</td>
                  <td>
                    <span className="category-badge">{place.category}</span>
                  </td>
                  <td>{place.shortDescription}</td>
                  <td>
                    <a
                      href={place.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="map-link"
                    >
                      View Map
                    </a>
                  </td>

                  <td>
                    <button className="btn btn-sm btn-outline">Edit</button>{" "}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(place._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}

              {places.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center p-3">
                    No places added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination-container">
        <button
          className="btn btn-sm"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ◀ Previous
        </button>

        <span className="page-info">
          Page {page} of {totalPages}
        </span>

        <button
          className="btn btn-sm"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
};

export default PlacesTable;
