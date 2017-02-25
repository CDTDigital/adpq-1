import React from 'react';
import {shallow} from 'enzyme'
import Item from 'components/Item/Item'
import * as RemoteDataStates from 'constants/RemoteDataStates'

const item = {
  id: 0,
  name: ' Dell Optiplex 3040 MT',
  manufacturer: 'DELL',
  sku: '210-AFXL',
  list_price: 10000,
  image: '/images/products/everyday-computing-dell-desktop.jpg',
  description: "4GB 1DIMM 1600MHz DDR3L, Windows 7 Pro (32/64 bit), integrated Intel HD Graphics, DVD+/- RW, 500GB SATA 7200rpm, USB Optical Wheel Mouse, USB Keyboard, 3-Year Next Business Day On-Site Warranty",
}

it('renders item information', () => {
  const props = {
    item
  }
  const rendered = shallow(<Item {...props} />)
  expect(rendered.text()).toContain('DELL')
  expect(rendered.text()).toContain('$100')
  expect(rendered.text()).toContain('4GB 1DIMM')
  expect(rendered.text()).not.toContain('DDR3L, Windows') // make sure we're splitting our description
})