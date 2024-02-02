import css from './Filter.module.css';
import PropTypes from 'prop-types';
import { FaSearch } from 'react-icons/fa'; // Import FontAwesome icons

export const Filter = ({ filter, setFilter }) => {
  //filter name based on the the search keyword
  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  return (
    <div className={css.divFilter}>
      <p>Find Contacts by Name</p>
          <div className={css.inputContainer}>
              <FaSearch className={css.icon} />
              <input
              type="text"
              name="filter"
              placeholder="Search by name"
              value={filter}
              onChange={handleFilterChange}
            />
          </div>
    </div>
  );
};

Filter.propTypes = {
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
};