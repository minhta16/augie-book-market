import React, { Component } from "react";
import Autosuggest, { defaultProps } from "@plan-three/material-ui-autosuggest";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  autosuggest: {
    /* your styles */
  }
};

class AutoCompleteField extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    var {
      helperText, // 'Enter your country (name or abbreviation)'
      label, // 'Country'
      labelKey, // 'label'
      fullWidth, // true
      error, // false
      renderSuggestionProps, // [object Object]
      selectClosestMatch, // false
      suggestionLimit, // 5
      suggestions,
      fuzzyKeys,
      classes
    } = this.props;
    return (
      <Autosuggest
        helperText={helperText}
        label={label}
        labelKey={labelKey}
        fullWidth={fullWidth}
        error={error}
        renderSuggestionProps={renderSuggestionProps}
        selectClosestMatch={selectClosestMatch}
        suggestionLimit={suggestionLimit}
        suggestions={suggestions}
        fuzzySearchOpts={{
          ...defaultProps.fuzzySearchOpts,
          keys: fuzzyKeys
        }}
        className={classes.autosuggest}
        {...this.props}
      />
    );
  }
}

AutoCompleteField.propTypes = {
  /* your proptypes */
};

export default withStyles(styles)(AutoCompleteField);
