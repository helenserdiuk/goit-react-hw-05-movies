import { Wrapper, Input } from './SearchBox.styled';
import { useState } from 'react';
import PropTypes from 'prop-types';

const SearchBox = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  const handleChange = ({ currentTarget }) => {
    setSearchQuery(currentTarget.value.toLowerCase());
  };

  return (
    <Wrapper onSubmit={handleSubmit}>
      <Input
        onChange={handleChange}
        value={searchQuery}
        type="text"
        autoComplete="off"
        placeholder="Search movie..."
        autoFocus
      />
    </Wrapper>
  );
};

SearchBox.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBox;
