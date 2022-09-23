export default {
  name: 'repeat', 
  helperFn: function (n, content) {
    const acc = [];
    const renderedContent = content.fn();
    acc.length = n;
    return acc.fill(content).join('');
  },
};