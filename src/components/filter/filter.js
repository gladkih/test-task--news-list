// @flow
import React from 'react';
import Radio, { RadioGroup } from 'material-ui/Radio';
import { FormControlLabel } from 'material-ui/Form';
import './filter.css';

type FilterItem = {
  id: string,
  title: string,
}

type Props = {
  title: string,
  type: Array<FilterItem>,
  value: ?string,
  onClick: Function,
};

type State = {
  value: ?string,
};

/**
 * Компонент фильтра
 */
class Filter extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: this.props.value ? this.props.value : this.props.type[0].id,
    };
  }

  componentWillUpdate(nextProps: Props) {
    if (nextProps.value !== this.state.value) {
      this.setState({ value: nextProps.value });
    }
  }

  handleChange = (event: Object) => {
    this.setState({ value: event.target.value });
    this.props.onClick(event.target.value);
  };

  renderFilterItems = array => (
    array.map(item => (
      <FormControlLabel key={item.id} value={item.id} control={<Radio />} label={item.title} className="filter--item" />
    ))
  );

  render() {
    const { title, type } = this.props;
    return (
      <section className="filter filter-wrapper">
        <header className="filter--title">Filter by {title}</header>
        <RadioGroup
          aria-label={title}
          name={title}
          value={this.state.value}
          onChange={this.handleChange}
          className="filter-items"
        >
          {this.renderFilterItems(type)}
        </RadioGroup>
      </section>
    );
  }
}

export default Filter;
