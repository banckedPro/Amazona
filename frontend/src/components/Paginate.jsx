import React from 'react';
import { Pagination } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Paginate = ({ pages, page, isAdmin = false }) => {
  const navigate = useNavigate();
  const redirector = (x) => {
    const target = !isAdmin ? `/page/${x + 1}` : `/admin/productlist/${x + 1}`;
    navigate(target);
  };
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <Pagination.Item
            active={x + 1 === page}
            key={x + 1}
            as={Link}
            onClick={() => {
              redirector(x);
            }}
          >
            {x + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
