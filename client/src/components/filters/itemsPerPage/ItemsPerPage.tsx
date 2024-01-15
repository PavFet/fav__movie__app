import React from 'react'
import './itemsPerPage.scss'

interface ItemsPerPageProps {
  setValue: (value: string) => void
}

const ItemsPerPage: React.FC<ItemsPerPageProps> =  ({ setValue }) => {
  const [selectedValue, setSelectedValue] = React.useState('');

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    setValue(value);
  };

  return (
    <div>
      <form action="" className='form__items__per__page'>
        <select name="" id="" value={selectedValue} onChange={handleChange}>
          <option value='' disabled selected>Movies per page</option>
          <option value='3'>3</option>
          <option value='5'>5</option>
          <option value='10'>10</option>
        </select>
      </form>
    </div>
  )
}

export default ItemsPerPage