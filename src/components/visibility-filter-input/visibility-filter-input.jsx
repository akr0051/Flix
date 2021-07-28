import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';
import { FaSearch } from 'react-icons/fa';
import './visibility-filterinput.scss';

function VisibilityFilterInput(props) {
  return (
    <div className="search-bar-box">
      <div className="search-icon">
        <FaSearch className="search-icon" color="white"/>
      </div>
    
      <input className="searchbar" type="search"
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Search..."
      />
    </div>
  
  )
}

export default connect(
  null,
  { setFilter }
)(VisibilityFilterInput);