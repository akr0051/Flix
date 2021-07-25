import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';

function VisibilityFilterInput(props) {
  return <form
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="Search..."
  />;
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);