import React, { useState } from 'react';

import { axiosWithAuth } from '../utils/axiosWithAuth';

const initialColorValues = {
  color: '',
  code: {
    hex: ''
  }
};

const ColorListForm = ({ updateColors }) => {

  const [colorValues, setColorValues] = useState(initialColorValues);

  const handleChanges = e => {
    if (e.target.name === 'color') {
      setColorValues({
        ...colorValues,
        color: e.target.value
      });
    } else {
      setColorValues({
        ...colorValues,
        code: {
          hex: e.target.value
        }
      });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    axiosWithAuth()
      .post('/api/colors', colorValues)
      .then(res => updateColors(res.data))
      .catch(err => console.log(err));
    setColorValues(initialColorValues);
  };

  return (
    <div className='ColorListForm'>
      <form onSubmit={handleSubmit}>
        <legend>add color</legend>
        <label>
          color name:
            <input
            name='color'
            value={colorValues.color}
            onChange={handleChanges}
          />
        </label>
        <label>
          hex code:
            <input
            name='code'
            value={colorValues.code.hex}
            onChange={handleChanges}
          />
        </label>
        <div className="button-row">
          <button type="submit">save</button>
        </div>
      </form>
    </div>
  );
};

export default ColorListForm;