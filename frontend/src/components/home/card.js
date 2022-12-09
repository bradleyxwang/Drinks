import React from "react";
import { Link } from "react-router-dom";

const Card = ({ headerLink, headerText, body, footer }) => {

  return (
      <div className="card bg-secondary">
        <div className="card-header bg-dark">
          <Link to={headerLink} className="card-link">
            <h5 className="mb-0">{headerText}</h5>
          </Link>
        </div>
        <div className="card-body text-center">
          <div className="d-block">{body}</div>
        </div>
        <div className="card-footer bg-transparent text-center">
          <h6 className="mb-0">{footer}</h6>
        </div>
      </div>
  );
};

export default Card;
