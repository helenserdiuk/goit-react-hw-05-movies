import { Wrapper, Input } from './SearchBox.styled';
import { useState } from 'react';

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

export default SearchBox;
