import React from 'react';

export default function List() {
  return (
    <div>
      <nav className="navbar navbar-default">
        <div className="container-fluid list-header">
          <div className="navbar-header">
            <button type="button" className="btn btn-default" aria-label="Left Align">
              <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
            </button>
          </div>
          <span className="list-title">Some title goes here</span>
          <div className="navbar-header pull-right">
            <button type="button" className="btn btn-default" aria-label="Left Align">
              <span className="dots-icon glyphicon glyphicon-option-horizontal" aria-hidden="true"></span>
            </button>
          </div>
        </div>
        <hr />
      </nav>

      <ul className="list-group">
        items go here
      </ul>
    </div>
  );
}
