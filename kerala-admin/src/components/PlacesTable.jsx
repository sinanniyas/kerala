import React from 'react';
import { samplePlaces } from '../data/sampleData';

const PlacesTable = () => {
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
              {samplePlaces.map((place, index) => (
                <tr key={place.id}>
                  <td>{index + 1}</td>
                  <td><strong>{place.name}</strong></td>
                  <td>{place.district}</td>
                  <td>
                    <span className="category-badge">{place.category}</span>
                  </td>
                  <td>{place.description}</td>
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
                    <button className="btn btn-sm btn-outline">Edit</button>
                    {' '}
                    <button className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PlacesTable;