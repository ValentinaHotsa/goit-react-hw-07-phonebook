import css from './Filter.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateFilter } from '../../redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);
  const changeFilter = e => {
    dispatch(updateFilter(e.target.value.toLowerCase()));
  };

  return (
    <label className={css.titleFilter}>
      Find contacts by name
      <input
        className={css.inputFilter}
        type="text"
        value={filter}
        onChange={changeFilter}
      />
    </label>
  );
};
export default Filter;
