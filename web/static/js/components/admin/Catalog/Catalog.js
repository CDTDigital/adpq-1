import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import map from 'lodash/fp/map';
import * as RemoteDataStates from '../../../constants/RemoteDataStates';
import { sortBy } from '../../../lib/sorts';
import AlertsContainer from '../../Alerts/AlertsContainer';


export default class Catalog extends Component {

  static propTypes = {
    fetchCatalog: PropTypes.func.isRequired,
    catalog: PropTypes.shape({
      remoteDataState: PropTypes.string.isRequired,
      items: PropTypes.array.isRequired,
    })
  };

  state = {
    sort: ['updated_at', 'desc']
  }

  componentDidMount() {
    this.props.fetchCatalog();
  }

  changeSort = (field) => {
    const [currentField, currentDir] = this.state.sort;
    let newState;
    if (currentField === field) {
      newState = [currentField, toggleDirection(currentDir)];
    } else {
      newState = [field, 'asc'];
    }
    this.setState({ sort: newState });
  }

  sortedData = () => {
    const items = this.props.catalog.items;
    return sortBy([this.state.sort], items);
  }

  renderTableHeader = () => (
    <tr key="header">
      <th>
        <button onClick={() => this.changeSort('clin')} className="usa-button-unstyled">CLIN</button>
      </th>
      <th>
        <button onClick={() => this.changeSort('updated_at')} className="usa-button-unstyled">Date Added</button>
      </th>
      <th>
        <button onClick={() => this.changeSort('name')} className="usa-button-unstyled">Item Name</button>
      </th>
      <th>
        <button onClick={() => this.changeSort('manufacturer')} className="usa-button-unstyled">Manufacturer</button>
      </th>
      <th>
        <button onClick={() => this.changeSort('sku')} className="usa-button-unstyled">SKU</button>
      </th>
      <th>
        <button onClick={() => this.changeSort('contract_unit_price')} className="usa-button-unstyled">Contract Price</button>
      </th>
      <th>
        <button onClick={() => this.changeSort('top_level_category')} className="usa-button-unstyled">Top Level</button>
      </th>
      <th>
        <button onClick={() => this.changeSort('simple_category')} className="usa-button-unstyled">Sub-Category</button>
      </th>
    </tr>
  )

  renderTableRow = item => (
    <tr key={item.id}>
      <td>{item.clin}</td>
      <td>{new Date(item.updated_at * 1000).toLocaleString()}</td>
      <td><Link to={`/item/${item.id}`}>{item.name}</Link></td>
      <td>{item.manufacturer}</td>
      <td>{item.sku}</td>
      <td>{item.contract_unit_price}</td>
      <td>{item.top_level_category}</td>
      <td>{item.simple_category}</td>
    </tr>
  )

  render() {
    if (this.props.catalog.remoteDataState === RemoteDataStates.LOADED) {
      const data = this.sortedData(this.props.catalog.items);
      const tableRows = map(item => this.renderTableRow(item), data);
      return (
        <div>
          <AlertsContainer />
          <table>
            <thead>
              {this.renderTableHeader()}
            </thead>
            <tbody>
              {tableRows}
            </tbody>
          </table>
        </div>
      );
    }
    return <div>Loading..</div>;
  }
}

const toggleDirection = direction => (direction === 'asc' ? 'desc' : 'asc');