export default {
  name: 'case', 
  helperFn: function(value, options) {
    if (value == this.switch_value) {
      return options.fn(this);
    }
  },
};